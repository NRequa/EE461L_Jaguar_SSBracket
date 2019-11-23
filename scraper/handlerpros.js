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

function getProPlayerRowStyle(row) {
	return row.children().eq(0).attr('style');
}

function getProRank(row) {
	return row.children().eq(0).text();
}

function getProPlayerName(row) { // TODO: edit so it doesn't have the number!
	return row.children().eq(2).children().eq(0).text();
}

function getProPlayerNationality(row) {
	return row.children().eq(1).children().eq(0).children().eq(0).attr('title');
}

function getProPlayerFirstChar(row) {
	return row.children().eq(3).children().eq(0).attr('alt');
}

function getProPlayerSecondChar(row) {
	let charvar = row.children().eq(3).children().eq(1).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerThirdChar(row) {
	let charvar = row.children().eq(3).children().eq(2).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerFourthChar(row) {
	let charvar = row.children().eq(3).children().eq(3).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerScore(row) {
	return row.children().eq(4).text();
}

function getProPlayerXFactor(row) {
	let xfac = row.children().eq(5).text();
	if(typeof xfac === "string") xfac = xfac.trim();
	return xfac;
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