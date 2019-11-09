'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');

AWS.config.update({
	region: "us-east-2",
	//endpoint: ""
});

//const dynamo = new AWS.DynamoDB.DocumentClient();
const {extractWeightFromHTML} = require('./helpers');
const {extractDashFromHTML} = require('./helpers');
const {extractTractionFromHTML} = require('./helpers');
const {extractSpotdodgeFromHTML} = require('./helpers');
const {extractDataFromHTML} = require('./helpers');
// function chains
const {getWeightTitleCond} = require('./helpers');
const {getWeightName} = require('./helpers');
const {getWeightWeight} = require('./helpers');


var characterData = [];

module.exports.scrapeSSBWiki = (event, context, callback) => {
  const characterWeight = [];
  const characterDash = [];
  const characterSpotdodge = [];
  const characterTraction = [];
  var jobs; // dummy variable to hold temp results
  // for the promises to synch calls
  var promiseWeight = get('https://www.ssbwiki.com/Weight');
  var promiseDash = get('https://www.ssbwiki.com/Dash');
  var promiseSpotdodge = get('https://www.ssbwiki.com/Spotdodge');
  var promiseTraction = get('https://www.ssbwiki.com/Traction');
  //var promiseDynamoGet = dynamo.scan({TableName: 'SSBracketScrape'}).promise();
  //var promiseDynamoDelete;
  //var promiseDynamoPut;

  Promise.all([promiseWeight, promiseDash, promiseSpotdodge, promiseTraction]).then(function(data1) {
	  console.log("promise.log");
	  extractDataFromHTML(data1[0].data, characterData, '.wikitable tbody tr', '.collapsed', [{name: "wtitle", fn: getWeightTitleCond}, {name: "wtitle2", fn: getWeightTitleCond}, {name: "wname", fn: getWeightName}, {name: "wweight", fn: getWeightWeight}], [{type: "notTypeof", value: "undefined"}, {type: "contains", value: 'SSBU'}]);
	  console.log('extracted');
	  jobs = extractWeightFromHTML(data1[0].data, characterWeight);
	  jobs = extractDashFromHTML(data1[1].data, characterDash);
	  jobs = extractSpotdodgeFromHTML(data1[2].data, characterSpotdodge);
	  jobs = extractTractionFromHTML(data1[3].data, characterTraction);
	  characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction);
	//console.log(characterData);
	//console.log(JSON.stringify(characterData));
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
function combine(weight, dash, spotdodge, traction) {
	var combined = [];
	let x;
	for(x = 0; x < weight.length; x++) {
		let name = weight[x].name;
		let tweight = weight[x].weight;
		let tdash;
		let tspotdodge;
		let ttraction;
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
		combined.push({name, tweight, tdash, tspotdodge, ttraction});
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
