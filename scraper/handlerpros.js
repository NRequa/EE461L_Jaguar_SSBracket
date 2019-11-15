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
		  let characterStats = [];
		  let playerObject = {};
		  playerObject.pandaGlobalRanking = i;
		  playerObject.name = proSSBWorldNames[i];
	      extractDataFromHTML(el.data, characterStats, '.col-3', '.players-list', [{name: "charName", fn: getProCharName}, {name: "charPercent", fn: getProCharPercent}]);
		  characterStats.forEach(function(character, j) {
			  if(j > 2) return; // just want top 3 characters
			  switch(j) {
				  case 0:
				      playerObject.firstCharName = character.charName;
					  playerObject.firstCharPercent = character.charPercent;
					  break;
				  case 1:
				      playerObject.secondCharName = character.charName;
					  playerObject.secondCharPercent = character.charPercent;
					  break;
				  case 2:
				      playerObject.thirdCharName = character.charName;
					  playerObject.thirdCharPercent = character.charPercent;
					  break;
				  default: // do nothing
			  }
		  });
		  let winloss = extractStringFromHTML(el, "SSB World Set Record:", 6, "<").trim();
		  let games = parseGames(winloss);
		  playerObject.totalGames = games.total;
		  playerObject.wins = games.wins;
		  playerObject.losses = games.losses;

		  console.log(characterStats);
		  console.log(playerObject);
		  proStats.push(playerObject);
	  });
      return Promise.resolve(proStats);
  })
  .then(function(data) {
      //characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction, characterGames);
      return Promise.resolve(data);
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

function getProCharName(row) { // TODO: edit so it doesn't have the number!
	return row.children().eq(0).children().eq(0).attr('href');
}

function getProCharPercent(row) { // TODO: edit so it doesn't have the number!
	return row.children().eq(1).text();
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