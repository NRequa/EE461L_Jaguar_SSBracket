'use strict';

const request = require('axios');
const get = require('axios');
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
  var jobs;
  var promiseWeight = get('https://www.ssbwiki.com/Weight');
  var promiseDash = get('https://www.ssbwiki.com/Dash');
  var promiseSpotdodge = get('https://www.ssbwiki.com/Spotdodge');
  var promiseTraction = get('https://www.ssbwiki.com/Traction');
  Promise.all([promiseWeight, promiseDash, promiseSpotdodge, promiseTraction]).then(function(data1) {
	  //console.log(promiseWeight);
	  //console.log(promiseDash);
	  //console.log(promiseSpotdodge);
	  //console.log(promiseTraction);
	  jobs = extractWeightFromHTML(data1[0].data, characterWeight);
	  //console.log(jobs);
	  //console.log(data1[1]);
	  //console.log(JSON.stringify(data1[0]));
	  jobs = extractDashFromHTML(data1[1].data, characterDash);
	  jobs = extractSpotdodgeFromHTML(data1[2].data, characterSpotdodge);
	  jobs = extractTractionFromHTML(data1[3].data, characterTraction);
	  //console.log(characterWeight.length);
      //console.log(characterDash.length);
      //console.log(characterSpotdodge.length);
      //console.log(characterTraction.length);
	  characterData = combine(characterWeight, characterDash, characterSpotdodge, characterTraction);
	console.log(characterData);
	callback(null, {characterData});
  });
};

async function getWeights() {
	var jobs;
	request('https://www.ssbwiki.com/Weight')
    .then(({data}) => {
	  console.log("weight");
      jobs = extractWeightFromHTML(data, characterWeight);
	  //console.log(jobs);
	  // now to add dashing
    })
}

// Assumes that each array is the same length to make a well-formed result
function combine(weight, dash, spotdodge, traction) {
	var combined = [];
	//console.log("finally");
	//console.log(weight.length);
	//console.log(dash.length);
	//console.log(spotdodge.length);
	//console.log(traction.length);
	let x;
	for(x = 0; x < weight.length; x++) {
		let name = weight[x].name;
		let tweight = weight[x].weight;
		let tdash;
		let tspotdodge;
		let ttraction;
		var j;
		//console.log('about to start dash loop');
		for(j = 0; j < dash.length; j++) {
			//console.log('dash loop');
	        //console.log(characterData[j]);
	        if(dash[j].name === name) {
	    	    tdash = dash[j].dash;
	    	    break;
	        }
		}
		//console.log('about to start dodge loop');
		for(j = 0; j < spotdodge.length; j++) {
			//console.log('dodge loop');
	        //console.log(characterData[j]);
	        if(spotdodge[j].name === name) {
	    	    tspotdodge = spotdodge[j].spotdodge;
	    	    break;
	        }
		}
		//console.log('about to start traction loop');
		for(j = 0; j < traction.length; j++) {
			//console.log('traction loop');
	        //console.log(characterData[j]);
	        if(traction[j].name === name) {
	    	    ttraction = traction[j].traction;
	    	    break;
	        }
		}
		combined.push({name, tweight, tdash, tspotdodge, ttraction});
		}
	return combined;
}

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
