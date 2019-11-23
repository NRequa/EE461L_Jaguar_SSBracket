'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');
const sel = require('./proStatsSelectors');

AWS.config.update({
	region: "us-east-2",
});

const {extractDataFromHTML} = require('./helpers');
const {parseGames} = require('./helpers');

// Run locally with: node -e "require('./handlerpros').scrapeProData(null, {}, console.log)"

module.exports.scrapeProData = (event, context, callback) => {
  const proStats = [];

  // for the promises to synch calls
  var promiseProsPage = get('https://liquipedia.net/smash/PGRU');

  promiseProsPage.then(function(data1) {
	  //console.log(data1.data);
	  extractDataFromHTML(data1.data, proStats, 'tr', null, 
          sel.getProSelectors()
		  );
	  
      return Promise.resolve(proStats);
  })
  //.then(function(data) {
//	  return putIntoS3('www.ssbracket.xyz'/*process.env.bucketname*/, 'scrape/prodata', JSON.stringify(data))
  //})
  .then(function(data) {
	  callback(null, {data})
  })
  .catch(callback);
};

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