'use strict';

const request = require('axios');
const {extractWeightFromHTML} = require('./helpers');
const {extractDashFromHTML} = require('./helpers');
const {extractTractionFromHTML} = require('./helpers');
const {extractSpotdodgeFromHTML} = require('./helpers');

module.exports.scrapeSSBWiki = (event, context, callback) => {
  const characterData = [];
  const characterWeight = [];
  const characterDash = [];
  const characterSpotdodge = [];
  const characterTraction = [];
  var jobs;
  request('https://www.ssbwiki.com/Weight')
    .then(({data}) => {
	  console.log("weight");
      jobs = extractWeightFromHTML(data, characterWeight);
	  //console.log(jobs);
	  // now to add dashing
	  
    //callback(null, {jobs});
    })
	.then(function() {
		console.log("dash");
		request('https://www.ssbwiki.com/Dash')
        .then(({data}) => {
        jobs = extractDashFromHTML(data, characterDash);
		//console.log("after dash");
	    //console.log(jobs);
        //callback(null, {jobs});
        })
        .catch(callback);
		console.log("dash2");
	})
	.then(function() {
		console.log("spotdodge");
		request('https://www.ssbwiki.com/Spotdodge')
        .then(({data}) => {
        jobs = extractSpotdodgeFromHTML(data, characterSpotdodge);
		//console.log("after dash");
	    //console.log(jobs);
        //callback(null, {jobs});
        })
        .catch(callback);
		console.log("spotdodge2");
	})
	.then(function() {
		console.log("traction");
		request('https://www.ssbwiki.com/Traction')
        .then(({data}) => {
        jobs = extractTractionFromHTML(data, characterTraction);
		//console.log("after dash");
	    //console.log(jobs);
        //callback(null, {jobs});
        })
        .catch(callback);
		console.log("traction2");
	})
    .catch(callback)
	.finally(function() {
		console.log("finally");
		console.log(characterDash.length);
		console.log(characterSpotdodge.length);
		console.log(characterTraction.length);
		var x;
		for(x = 0; x < characterWeight.length; x++) {
			let name = characterWeight[x].name;
			let weight = characterWeight[x].weight;
			let dash;
			let spotdodge;
			let traction;
			var j;
			//console.log('about to start dash loop');
			for(j = 0; j < characterDash.length; j++) {
				console.log('dash loop');
		        //console.log(characterData[j]);
		        if(characterDash[j].name === name) {
		    	    dash = characterDash[j].dash;
		    	    break;
		        }
			}
			//console.log('about to start dodge loop');
			for(j = 0; j < characterSpotdodge.length; j++) {
				console.log('dodge loop');
		        //console.log(characterData[j]);
		        if(characterSpotdodge[j].name === name) {
		    	    spotdodge = characterSpotdodge[j].spotdodge;
		    	    break;
		        }
			}
			//console.log('about to start traction loop');
			for(j = 0; j < characterTraction.length; j++) {
				console.log('traction loop');
		        //console.log(characterData[j]);
		        if(characterTraction[j].name === name) {
		    	    traction = characterTraction[j].traction;
		    	    break;
		        }
			}
			characterData.push({name, weight, dash, spotdodge, traction});
		}
		console.log(jobs);
		callback(null, {jobs});
	});
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
