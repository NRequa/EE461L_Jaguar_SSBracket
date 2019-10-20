'use strict';

const request = require('axios');
const {extractWeightFromHTML} = require('./helpers');
const {extractDashFromHTML} = require('./helpers');
const {extractTractionFromHTML} = require('./helpers');
const {extractSpotdodgeFromHTML} = require('./helpers');

module.exports.scrapeSSBWiki = (event, context, callback) => {
  const characterData = [];
  var jobs;
  request('https://www.ssbwiki.com/Weight')
    .then(({data}) => {
      jobs = extractWeightFromHTML(data, characterData);
	  //console.log(jobs);
	  // now to add dashing
	  
    //callback(null, {jobs});
    })
	.then(function() {
		//console.log("dash");
		request('https://www.ssbwiki.com/Dash')
        .then(({data}) => {
        jobs = extractDashFromHTML(data, characterData);
		//console.log("after dash");
	    //console.log(jobs);
        callback(null, {jobs});
        })
        .catch(callback);
	})
    .catch(callback);
};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
