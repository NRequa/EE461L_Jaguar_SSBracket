'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');
const sel = require('./charStatsSelectors');
//const extParams = require('/extractDataParameters');

AWS.config.update({
	region: "us-east-2",
});

// Run locally with: node -e "require('./handler').scrapeSSBWiki(null, {}, console.log)"

const {extractDataFromHTML} = require('./helpers');
const {extractStringFromHTML} = require('./helpers');
const {parseGames} = require('./helpers');
const {parseURL} = require('./helpers');

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

  // for the promises to synch calls
  var promiseWeight = get('https://www.ssbwiki.com/Weight');
  var promiseDash = get('https://www.ssbwiki.com/Dash');
  var promiseSpotdodge = get('https://www.ssbwiki.com/Spotdodge');
  var promiseTraction = get('https://www.ssbwiki.com/Traction');
  var promiseSSBWorldChars = get('https://ssbworld.com/characters/');

  Promise.all([promiseWeight, promiseDash, promiseSpotdodge, promiseTraction, promiseSSBWorldChars]).then(function(data1) {
	  extractDataFromHTML(data1[0].data, characterWeight, '.wikitable tbody tr', '.collapsed', sel.getWeightSelectors());
	  extractDataFromHTML(data1[1].data, characterDash, '.wikitable tbody tr', '.collapsed', sel.getDashSelectors());
	  extractDataFromHTML(data1[2].data, characterSpotdodge, '.wikitable tbody tr', '.collapsed', sel.getSpotdodgeSelectors());
	  extractDataFromHTML(data1[3].data, characterTraction, '.wikitable tbody tr', '.collapsed', sel.getTractionSelectors());
	  extractDataFromHTML(data1[4].data, characterSSBWorldURLs, '.players-list div a', null, sel.getSSBWorldSelectors(), null);
	  characterSSBWorldURLs.forEach(function(el) {
		  characterSSBWorldPages.push(get(el.url));
		  characterSSBWorldNames.push(parseURL(el.url));
	  });
	  //console.log(characterWeight);
	  //console.log(characterDash);
	  //console.log(characterSpotdodge);
	  //console.log(characterTraction);
	return Promise.all(characterSSBWorldPages);
  })
  .then(function(data) {
	  data.forEach(function(el, i) {
		  let winloss = extractStringFromHTML(el, "SSB World Game Record:", 6, "<").trim();
		  let games = parseGames(winloss);
		  games.name = characterSSBWorldNames[i];
		  characterGames.push(games);
	  });
      return Promise.resolve(characterGames);
  })
  .then(function(data) {
      characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction, characterGames);
      return Promise.resolve(characterData);
  })
  //.then(function(data) {
	  //return putIntoS3('www.ssbracket.xyz'/*process.env.bucketname*/, 'scrape/data', JSON.stringify(data))
  //})
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
		// Error handling due to differing naming conventions across sites
		switch(name) {
			case "Charizard":
			case "Ivysaur":
			case "Squirtle":
			    for(j = 0; j < games.length; j++) {
	                if(games[j].name === "Pokemon Trainer") {
	    	            ttotalGames = games[j].total;
				        twins = games[j].wins;
				        tlosses = games[j].losses;
						break;
					}
	            }
				break;
		    case "Dr. Mario":
			    for(j = 0; j < dash.length; j++) {
	                if(dash[j].name === "Mario") {
	    	            tdash = dash[j].dash;
	    	            break;
	                }
				}
				break;
			case "Rosalina":
			    for(j = 0; j < dash.length; j++) {
	                if(dash[j].name === "Rosalina & Luma") {
	    	            tdash = dash[j].dash;
	    	            break;
	                }
				}
				break;
			case "Bayonetta":
			    tspotdodge = tspotdodge.substr(0, 4);
			default: // no error!
			    break;
		}
		// If all else fails
	    if(typeof tweight === "undefined") tweight = "No data";
		if(typeof tdash === "undefined") tdash = "No data";
		if(typeof tspotdodge === "undefined") tspotdodge = "No data";
		if(typeof ttraction === "undefined") ttraction = "No data";
		if(typeof ttotalGames === "undefined") ttotalGames = "No data";
		if(typeof twins === "undefined") twins = "No data";
		if(typeof tlosses === "undefined") tlosses = "No data";
		combined.push({name, tweight, tdash, tspotdodge, ttraction, ttotalGames, twins, tlosses});
	}
	return combined;
}

function putIntoS3(bucket, key, data) {
	var s3 = new AWS.S3();
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