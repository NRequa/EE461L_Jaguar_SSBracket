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
  const proSSBWorldURLs = [];
  const proSSBWorldNames = [];
  const proSSBWorldPages = [];
  const proStats = [];

  // for the promises to synch calls
  var promiseSSBWorldPros = get('https://ssbworld.com/players/panda-global-rankings/');

  promiseSSBWorldPros.then(function(data1) {
	  extractDataFromHTML(data1.data, proSSBWorldURLs, '.player-meta a', null, [{name: "url", fn: getSSBWorldCharURL}, {name: "name", fn: getProPlayerName}], null);
	  var i = 0; // there are only 50 players, so ignore other scraped links!
	  //console.log(proSSBWorldURLs);
	  proSSBWorldURLs.forEach(function(el) {
		  if(i === 49) return;
		  console.log(el);
		  i++;
		  proSSBWorldPages.push(get(el.url));
		  proSSBWorldNames.push(el.name);
	  });
	return Promise.all(proSSBWorldPages);
  })
  .then(function(data) {
	  data.forEach(function(el, i) {
		  let proStats = [];
	      extractDataFromHTML(el.data, proStats, '.col-3', '.players-list', [{name: "charName", fn: getProCharName}, {name: "charPercent", fn: getProCharPercent}]);
		  let winloss = extractStringFromHTML(el, "SSB World Set Record:", 6, "<").trim();
		  let games = parseGames(winloss);
		  games.name = proSSBWorldNames[i];
		  console.log(proStats);
		  console.log(games);
		  //characterGames.push(games);
	  });
      return Promise.resolve(42);
  })
  .then(function(data) {
      //characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction, characterGames);
      return Promise.resolve(42);
  })
  //.then(function(data) {
	  //return putIntoS3('www.ssbracket.xyz'/*process.env.bucketname*/, 'scrape/prodata', JSON.stringify(data))
  //})
  .then(function(data) {
	  callback(null, {data})
  })
  .catch(callback);
};

function getProPlayerName(row) { // TODO: edit so it doesn't have the number!
	return row.text();
}

function getProCharName(row) {
	return row.children().eq(0).children().eq(0).attr('href');
}

function getProCharPercent(row) {
	return row.children().eq(1).text();
}

function parseProURL(url) { //https://ssbworld.com/players/
	url = url.substr(29).trim();
	let i = 0;
	while(url.charAt(i) != "/") {i++;} // get us to the actual name!
	i++;
	return url.substr(i);
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