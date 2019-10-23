const cheerio = require('cheerio');
//const moment = require('moment');

function extractWeightFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  
  const characterRows = $('.wikitable tbody tr').not('.collapsed');

  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    
    // Extract information from each row of the jobs table
    let name = $(el).children().eq(1).children().last().text().trim();
    let weight = $(el).children().eq(2).text().trim();

    characterData.push({name, weight});
  });

  return characterData;
}



function extractDashFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  
  //console.log('dash call');
  characterRows.each((i, el) => {
	//console.log(el);
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
	//console.log($(el).children().eq(3).text().trim());
    let name = $(el).children().eq(1).children().last().text().trim();
    let dash = $(el).children().eq(3).text().trim();
	characterData.push({name, dash});
    //var j = 0;
	//console.log("about to start loop");
  });

  return characterData;
}



function extractSpotdodgeFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  characterRows.each((i, el) => {
	//console.log(el);
	if(typeof $(el).children().eq(0).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(0).children().last().attr('title').toString().includes('SSBU') === false) {return;}
	//console.log($(el).children().eq(3).text().trim());
    let name = $(el).children().eq(0).children().last().text().trim();
    let spotdodge = $(el).children().eq(1).text().trim();
	characterData.push({name, spotdodge});
    //var j = 0;
	//console.log("about to start loop");
  });

  return characterData;
}

function extractTractionFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  characterRows.each((i, el) => {
	//console.log(el);
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
	//console.log($(el).children().eq(3).text().trim());
    let name = $(el).children().eq(1).children().last().text().trim();
    let traction = $(el).children().eq(2).text().trim();
	characterData.push({name, traction});
    //var j = 0;
	//console.log("about to start loop");
  });

  return characterData;
}

module.exports = {
  extractWeightFromHTML,
  extractDashFromHTML,
  extractSpotdodgeFromHTML,
  extractTractionFromHTML
};