'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');
const cheerio = require('./cheerio/lib/cheerio'); // ./cheerio/lib/cheerio
const util = require('util');

AWS.config.update({
	region: "us-east-2",
});

const {getSSBWorldCharURL} = require('./helpers');
const {getSSBWorldWinLose} = require('./helpers');
const {extractDataFromHTML} = require('./helpers');
const {extractStringFromHTML} = require('./helpers');
const {parseGames} = require('./helpers');

// Run locally with: node -e "require('./handlerpros').scrapeSSBWorldPros(null, {}, console.log)"

module.exports.scrapeSSBWorldPros = (event, context, callback) => {
  const proStats = [];

  // for the promises to synch calls
  var promiseProsPage = get('https://liquipedia.net/smash/PGRU');

  promiseProsPage.then(function(data1) {
	  //console.log(data1.data);
	  extractDataFromHTML(data1.data, proStats, 'tr', null, 
          [{name: "style", fn: getProPlayerRowStyle}, 
		   {name: "name", fn: getProPlayerName}, 
		   {name: "rank", fn: getProRank},
		   {name: "nationality", fn: getProPlayerNationality},
		   {name: "char1", fn: getProPlayerFirstChar},
		   {name: "char2", fn: getProPlayerSecondChar},
		   {name: "char3", fn: getProPlayerThirdChar},
		   {name: "char4", fn: getProPlayerFourthChar},
		   {name: "score", fn: getProPlayerScore},
		   {name: "xfactor", fn: getProPlayerXFactor}],
		   [{type: "equal", value: 'text-align:right;'}]
		   );
	  
      return Promise.resolve(proStats);
  })
  //.then(function(data) {
	  //return putIntoS3('www.ssbracket.xyz'/*process.env.bucketname*/, 'scrape/prodata', JSON.stringify(data))
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


function parseProURL(url) {
	let trimmed = url.substr(32).trim(); // remove the https://ssbworld.com/characters/ part
	let output = "";
	let prevChar = " ";
	for(let i = 0; i < trimmed.length; i++) {
		if(trimmed.charCodeAt(i) === 45) { 
		    output = output.concat(" ");
			prevChar = " ";
		}
		else if(prevChar === " ") {
			prevChar = trimmed.charAt(i).toUpperCase();
			output = output.concat(prevChar);
		}
		else {
			prevChar = trimmed.charAt(i);
			output = output.concat(prevChar);
		}
	}
	// Some conversions to SSBWiki naming conventions
	if(output === "King K Rool") output = "King K. Rool";
	else if(output === "Bowser Jr") output = "Bowser Jr.";
	else if(output === "Dr Mario") output = "Dr. Mario";
	else if(output === "Mr Game And Watch") output = "Mr. Game & Watch";
	else if(output === "Rob") output = "R.O.B.";
	else if(output === "Banjo And Kazooie") output = "Banjo & Kazooie";
	else if(output === "Pac Man") output = "Pac-Man";
	else if(output === "Rosalina And Luma") output = "Rosalina";
	return output;
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