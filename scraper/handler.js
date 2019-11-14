'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');

AWS.config.update({
	region: "us-east-2",
	//endpoint: ""
});

// Run locally with: node -e "require('./handler').scrapeSSBWiki(null, {}, console.log)"

const {extractWeightFromHTML} = require('./helpers');
const {extractDashFromHTML} = require('./helpers');
const {extractTractionFromHTML} = require('./helpers');
const {extractSpotdodgeFromHTML} = require('./helpers');
const {extractDataFromHTML} = require('./helpers');
const {extractStringFromHTML} = require('./helpers');
const {parseGames} = require('./helpers');
const {parseURL} = require('./helpers');
// function chains
const {getWeightTitleCond} = require('./helpers');
const {getWeightName} = require('./helpers');
const {getWeightWeight} = require('./helpers');
const {getDashTitleCond} = require('./helpers');
const {getDashName} = require('./helpers');
const {getDashDash} = require('./helpers');
const {getSpotdodgeTitleCond} = require('./helpers');
const {getSpotdodgeName} = require('./helpers');
const {getSpotdodgeSpotdodge} = require('./helpers');
const {getTractionTitleCond} = require('./helpers');
const {getTractionName} = require('./helpers');
const {getTractionTraction} = require('./helpers');
const {getSSBWorldCharURL} = require('./helpers');
const {getSSBWorldWinLose} = require('./helpers');



var characterData = [];

module.exports.scrapeSSBWiki = (event, context, callback) => {
  const characterWeight = [];
  const characterDash = [];
  const characterSpotdodge = [];
  const characterTraction = [];
  const characterSSBWorldURLs = [];
  const characterSSBWorldNames = [];
  const characterSSBWorldPages = [];
  const characterGames = [];
  //var jobs; // dummy variable to hold temp results
  // for the promises to synch calls
  var promiseWeight = get('https://www.ssbwiki.com/Weight');
  var promiseDash = get('https://www.ssbwiki.com/Dash');
  var promiseSpotdodge = get('https://www.ssbwiki.com/Spotdodge');
  var promiseTraction = get('https://www.ssbwiki.com/Traction');
  var promiseSSBWorldChars = get('https://ssbworld.com/characters/');

  Promise.all([promiseWeight, promiseDash, promiseSpotdodge, promiseTraction, promiseSSBWorldChars]).then(function(data1) {
	  //console.log("promise.log");
	  extractDataFromHTML(data1[0].data, characterWeight, '.wikitable tbody tr', '.collapsed', [{name: "wtitle", fn: getWeightTitleCond}, {name: "wtitle2", fn: getWeightTitleCond}, {name: "name", fn: getWeightName}, {name: "weight", fn: getWeightWeight}], [{type: "notTypeof", value: "undefined"}, {type: "contains", value: 'SSBU'}]);
	  extractDataFromHTML(data1[1].data, characterDash, '.wikitable tbody tr', '.collapsed', [{name: "wtitle", fn: getDashTitleCond}, {name: "wtitle2", fn: getDashTitleCond}, {name: "name", fn: getDashName}, {name: "dash", fn: getDashDash}], [{type: "notTypeof", value: "undefined"}, {type: "contains", value: 'SSBU'}]);
	  extractDataFromHTML(data1[2].data, characterSpotdodge, '.wikitable tbody tr', '.collapsed', [{name: "wtitle", fn: getSpotdodgeTitleCond}, {name: "wtitle2", fn: getSpotdodgeTitleCond}, {name: "name", fn: getSpotdodgeName}, {name: "spotdodge", fn: getSpotdodgeSpotdodge}], [{type: "notTypeof", value: "undefined"}, {type: "contains", value: 'SSBU'}]);
	  extractDataFromHTML(data1[3].data, characterTraction, '.wikitable tbody tr', '.collapsed', [{name: "wtitle", fn: getTractionTitleCond}, {name: "wtitle2", fn: getTractionTitleCond}, {name: "name", fn: getTractionName}, {name: "traction", fn: getTractionTraction}], [{type: "notTypeof", value: "undefined"}, {type: "contains", value: 'SSBU'}]);
	  //console.log('extracted');
	  //jobs = extractWeightFromHTML(data1[0].data, characterWeight);
	  //jobs = extractDashFromHTML(data1[1].data, characterDash);
	  //jobs = extractSpotdodgeFromHTML(data1[2].data, characterSpotdodge);
	  //jobs = extractTractionFromHTML(data1[3].data, characterTraction);
	  extractDataFromHTML(data1[4].data, characterSSBWorldURLs, '.players-list div a', null, [{name: "url", fn: getSSBWorldCharURL}], null);
	  //characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction);
	  characterSSBWorldURLs.forEach(function(el) {
		  characterSSBWorldPages.push(get(el.url));
		  characterSSBWorldNames.push(parseURL(el.url));
		  console.log(el);
	  });
	//console.log(characterData);
	console.log(characterSSBWorldNames);
	//console.log(JSON.stringify(characterData));
	return Promise.all(characterSSBWorldPages); // maybe replace this with a promise all for the ssbworld pages
  })
  .then(function(data) {
	  data.forEach(function(el, i) {
		  let winloss = extractStringFromHTML(el, "SSB World Game Record:", 6, "<").trim();
		  //let name = extractStringFromHTML(el, "<h1 class=\\\"bio\\\">", 0, "<").trim();// TODO
		  console.log("returned");
		  console.log(winloss);
		  let games = parseGames(winloss);
		  games.name = characterSSBWorldNames[i];
		  characterGames.push(games);
	  });
	  console.log(characterGames);
      return Promise.resolve(characterGames); // replace later with something leading to combining the data into one JSON
  })
  .then(function(data) {
      characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction, characterGames);
      return Promise.resolve(characterData);
  })
//  .then(function(data) {
//	  return putIntoS3('www.ssbracket.xyz'/*process.env.bucketname*/, 'scrape/data', JSON.stringify(data))
//	  })
  .then(function(data) {
	  callback(null, {data})
  })
  .catch(callback);
};

// Assumes that each array is the same length to make a well-formed result
function combine(weight, dash, spotdodge, traction, games) {
	var combined = [];
	let x;
	for(x = 0; x < weight.length; x++) {
		let name = weight[x].name;
		let tweight = weight[x].weight;
		let tdash;
		let tspotdodge;
		let ttraction;
		let ttotalGames;
		let twins;
		let tlosses;
		var j;

		for(j = 0; j < dash.length; j++) {
	        if(dash[j].name === name) {
	    	    tdash = dash[j].dash;
	    	    break;
	        }
		}
		for(j = 0; j < spotdodge.length; j++) {
	        if(spotdodge[j].name === name) {
	    	    tspotdodge = spotdodge[j].spotdodge;
	    	    break;
	        }
		}

		for(j = 0; j < traction.length; j++) {
	        if(traction[j].name === name) {
	    	    ttraction = traction[j].traction;
	    	    break;
	        }
		}
		for(j = 0; j < games.length; j++) {
	        if(games[j].name === name) {
	    	    ttotalGames = games[j].total;
				twins = games[j].wins;
				tlosses = games[j].losses;
	    	    break;
	        }
		}
		combined.push({name, tweight, tdash, tspotdodge, ttraction, ttotalGames, twins, tlosses});
		}
	return combined;
}

function putIntoS3(bucket, key, data) {
	var s3 = new AWS.S3();
	//console.log('s31');
	//console.log(data);
	//console.log('s32');
	
	var old;
	/*var getParams = {
		Bucket: bucket,
		Key: key
	};
	s3.deleteObject(getParams, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
        else     {
			console.log(data);           // successful response
		}
	});*/
    var params = {
        Bucket : bucket,
        Key : key,
        Body : data,
	    ContentType: 'application/json'
    }
    s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
	return Promise.resolve(data);
}
