'use strict';

const request = require('axios');
const {extractWeightFromHTML} = require('./helpers');

module.exports.scrapeSSBWiki = (event, context, callback) => {
  const characterData = [];
  request('https://www.ssbwiki.com/Weight')
    .then(({data}) => {
      var jobs = extractWeightFromHTML(data, characterData);
	  console.log(jobs);
	  // now to add dashing
	  request('https://www.ssbwiki.com/Traction')
        .then(({data}) => {
        jobs = extractWeightFromHTML(data, characterData);
	    console.log(jobs);
		// then add traction
        callback(null, {jobs});
      })
      .catch(callback);
        callback(null, {jobs});
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
