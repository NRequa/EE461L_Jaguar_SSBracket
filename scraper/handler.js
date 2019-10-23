'use strict';

const get = require('axios');
const AWS = require('aws-sdk');

AWS.config.update({
	region: "us-east-2",
	endpoint: ""
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const {extractWeightFromHTML} = require('./helpers');
const {extractDashFromHTML} = require('./helpers');
const {extractTractionFromHTML} = require('./helpers');
const {extractSpotdodgeFromHTML} = require('./helpers');

module.exports.scrapeSSBWiki = (event, context, callback) => {
  var characterData = [];
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
  var promiseDynamoGet = dynamo.scan({TableName: 'SSBracketScrape'}).promise();
  var promiseDynamoDelete;
  var promiseDynamoPut;
  var promiseScrape = Promise.all([promiseWeight, promiseDash, promiseSpotdodge, promiseTraction]).then(function(data1) {
	  jobs = extractWeightFromHTML(data1[0].data, characterWeight);
	  jobs = extractDashFromHTML(data1[1].data, characterDash);
	  jobs = extractSpotdodgeFromHTML(data1[2].data, characterSpotdodge);
	  jobs = extractTractionFromHTML(data1[3].data, characterTraction);
	  characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction);
	console.log(characterData);
	return Promise.resolve();
  });
  promiseDynamoDelete = Promise.all([promiseScrape, promiseDynamoGet]).then(function(data) {
	  let response = data[1].response;
	  const toDelete = response.Items[0] ? response.Items[0].date : null;
	  
	  // delete the old jobs
	  if(toDelete) {
		  return dynamo.delete({
			  TableName: 'SSBracketScrape',
			  Key: {
				  date: toDelete
			  }
	      }).promise();
	  } else return Promise.resolve(42); // so we can make sure that either way, a promise is resolved
  });
  promiseDynamoPut = Promise.all([promiseDynamoDelete]).then(function() {
	  return dynamo.put({
		  TableName: 'SSBracketScrape',
		  Item: {
			  date: new Date().toString(),
			  data: characterData
		  }
	  }).promise();
  });
  Promise.all([promiseDynamoPut]).then(function() {
	  callback(null, {characterData});
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
