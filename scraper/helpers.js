const cheerio = require('cheerio');
//const moment = require('moment');

function extractWeightFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  //const charTables = $('.wikitable').not('collapsed').last();
  const characterRows = $('.wikitable tbody tr').not('.collapsed');//charTables.filter('tbody tr');////.eq(7)

  //const characters = [];
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    //let debug = $(el).text().trim();
	//console.log($(el).children().eq(1).children().last().text().trim());
	//console.log($(el).children().eq(1).children().last().attr('title'));
	//let debug = $(el).children().eq(1).children().last().attr('title');
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
  
  characterRows.each((i, el) => {
	//console.log(el);
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
	//console.log($(el).children().eq(3).text().trim());
    let name = $(el).children().eq(1).children().last().text().trim();
    let dash = $(el).children().eq(3).text().trim();
    var j = 0;
	//console.log("about to start loop");
	for(j = 0; j < characterData.length; j++) {
		//console.log(characterData[j]);
		if(characterData[j].name === name) {
			//console.log("match");
			characterData[j].dash = dash;
			break;
		}
	}
  });

  return characterData;
}



function extractSpotdodgeFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');//charTables.filter('tbody tr');////.eq(7)

  //const characters = [];
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    //let debug = $(el).text().trim();
	//console.log($(el).children().eq(1).children().last().text().trim());
	//console.log($(el).children().eq(1).children().last().attr('title'));
	//let debug = $(el).children().eq(1).children().last().attr('title');
    // Extract information from each row of the jobs table
    let name = $(el).children().eq(1).children().last().text().trim();
    let weight = $(el).children().eq(2).text().trim();

    characterData.push({name, weight});
  });

  return characterData;
}

function extractTractionFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  //const charTables = $('.wikitable').not('collapsed').last();
  const characterRows = $('.wikitable tbody tr').not('.collapsed');//charTables.filter('tbody tr');////.eq(7)

  //const characters = [];
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    //let debug = $(el).text().trim();
	//console.log($(el).children().eq(1).children().last().text().trim());
	//console.log($(el).children().eq(1).children().last().attr('title'));
	//let debug = $(el).children().eq(1).children().last().attr('title');
    // Extract information from each row of the jobs table
    let name = $(el).children().eq(1).children().last().text().trim();
    let weight = $(el).children().eq(2).text().trim();

    characterData.push({name, weight});
  });

  return characterData;
}

module.exports = {
  extractWeightFromHTML,
  extractDashFromHTML,
  extractSpotdodgeFromHTML,
  extractTractionFromHTML
};