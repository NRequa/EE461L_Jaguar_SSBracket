'use strict';

const get = require('./axios/lib/axios');// ./axios/axios
const AWS = require('aws-sdk');
const sel = require('./charStatsSelectors');

AWS.config.update({
	region: "us-east-2",
});

// Run locally with: node -e "require('./handler').scrapeSSBWiki(null, {}, console.log)"

const {extractDataFromHTML} = require('./helpers');
const {extractStringFromHTML} = require('./helpers');
const {parseGames} = require('./helpers');
const {parseURL} = require('./helpers');
const {putIntoS3} = require('./helpers');

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
	for(let x = 0; x < weight.length; x++) {
		let name = weight[x].name;
		let tweight = weight[x].weight;
		let tdash;
		let tspotdodge;
		let ttraction;
		let ttotalGames;
		let twins;
		let tlosses;
		var j;
        
		tdash = searchArray(dash, name, "dash");
		tspotdodge = searchArray(spotdodge, name, "spotdodge");
		ttraction = searchArray(traction, name, "traction");
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
			    tdash = searchArray(dash, "Mario", "dash");
				break;
			case "Rosalina":
			    tdash = searchArray(dash, "Rosalina & Luma", "dash");
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

function searchArray(array, name, property) {
	for(let j = 0; j < array.length; j++) {
	        if(array[j].name === name) {
	    	    return array[j][property];
	        }
	}
}

