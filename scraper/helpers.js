const cheerio = require('./cheerio/lib/cheerio'); // ./cheerio/lib/cheerio
//const moment = require('moment');

function getWeightTitleCond(row) {
	//console.log("row");
	//console.log(row);
	return row.children().eq(1).children().last().attr('title');
}

function getWeightName(row) {
	return row.children().eq(1).children().last().text().trim();
}

function getWeightWeight(row) {
	return row.children().eq(2).text().trim();
}

function getSSBWorldCharURL(row) {
	return "https://ssbworld.com" + row.attr('href');//.toString();
}

//extractDataFromHTML(html, characterData, '.wikitable tbody tr', '.collapsed', [getWeightTitleCond, getWeightTitleCond, getWeightName, getWeightWeight], []);

function extractWeightFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  //console.log(characterRows);
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

/*
    html is the html document from axios that we want to scrape
	array is an input array that we want to add to
	rowsDefinition is optional. If you want to iterate over regular elements, put in class and tag names for the elements
	rowsNotDefition requires rowsDefinition, and is optional. Use if you want to preclude elements from iteration.
	
	elementSelectors are functions that define what elements you want to select from the HTML. 
	    If you want to iterate, they will be applied to each iteration. Else, they will be applied to the document holistically.
		They should be objects, with a name value and a function for selecting. The function should use Cheerio
		
    elementConditionals is optional, and matches with the first X number of elementSelectors. elementConditionals 
	    will be tested against the elements selected - elements selected must == the conditions to be included. Else,
		they will be skipped. Elements with conditionals are not included in the return. 
		
	Output depends on iteration. If iterating, output is an array of objects, with each object containing key:value pairs
	If you aren't using some optional values, input null!
*/
function extractDataFromHTML (html, array, rowsDefinition, rowsNotDefinition, elementSelectors, elementConditionals) {
	console.log("extracting data from html. These are the arguments:");
	console.log(html);
	console.log("the array:");
	console.log(array);
	console.log(rowsDefinition);
	console.log(rowsNotDefinition);
	console.log("element selectors");
	console.log(elementSelectors);
	console.log("element conditionals");
	console.log(elementConditionals);
	const $ = cheerio.load(html);
	var rows;
	var iterating = false;
	if(rowsDefinition != null) {
		console.log("iterating");
		iterating = true;
		if(rowsNotDefinition != null) {
			console.log("row exclusion found");
			rows = $(rowsDefinition).not(rowsNotDefinition);
		}
		else {
			console.log("no row exclusion found");
			rows = $(rowsDefinition);
		}
		console.log("the rows:");
		console.log(rows);
	}
	else {
		rows = null;
		console.log("rows = null");
	}
	if(iterating) {
		console.log('starting iteration');
		rows.each((i, el) => {
			console.log("iterate");
			//console.log(i);
			//console.log(el);
			let selected = [];
			elementSelectors.forEach((sel, i) => {
				//console.log('sel');
				//console.log(sel);
				//console.log(el);
				selected.push({name: sel.name, prop: sel.fn($(el))});
			});
			if(elementConditionals != null && elementConditionals != 'undefined') {
				console.log("element conditionals detected");
				let success = true;
				elementConditionals.forEach((con) => {
					let thing = selected.shift();
					//console.log(thing);
					thing = thing.prop;
					//console.log(thing);
					switch(con.type) {
						case "typeof":
						    if(typeof thing != con.value) {success = false;}
							//console.log(success);
							break;
						case "notTypeof":
						    if(typeof thing == con.value) {success = false;}
							//console.log(success);
							break;
						case "equal":
						    if(thing != con.value) {success = false;}
							//console.log(success);
							break;
						case "notEqual":
						    if(thing == con.value) {success = false;}
							//console.log(success);
							break;
						case "contains":
						    if(success == false) break;
						    if(!thing.toString().includes(con.value)) {success = false;}
							//console.log(success);
							break;
						default: success = false;
					}
			    });
				console.log("after condition testing");
			    console.log(success);
				if(!success) {return;}
			}	
			let object = {};
			selected.forEach((prop) => {
				console.log(prop);
				object[prop.name] = prop.prop;
			});
			console.log(object);
			array.push(object);
		});
	}
	else { // TODO: edit this to match above
		let selected = [];
		elementSelectors.forEach((i, sel) => {
			selected.push({name: sel.name, prop: sel.fn(el)});
		});
		if(elementConditionals != null) {
			let success = true;
			elementConditionals.forEach((i, con) => {
			    switch(con.type) {
						case "typeof":
						    if(typeof selected.shift() != con.value) {success = false;}
							break;
						case "notTypeof":
						    if(typeof selected.shift() == con.value) {success = false;}
							break;
						case "equal":
						    if(selected.shift() != con.value) {success = false;}
							break;
						case "notEqual":
						    if(selected.shift() == con.value) {success = false;}
							break;
						default: success = false;
					}
		    });
			console.log("after condition testing");
			console.log(success);
			if(!success) {return array;} // object isn't good, so return the array.
		}	
		let object = {};
		selected.forEach((i, prop) => {
			object[prop.name] = prop.prop;
		});
		array.push(object);
	}
	console.log("the array");
	console.log(array);
	return array;
}

module.exports = {
  getWeightTitleCond,
  getWeightName,
  getWeightWeight,
  getSSBWorldCharURL,
  extractWeightFromHTML,
  extractDashFromHTML,
  extractSpotdodgeFromHTML,
  extractTractionFromHTML,
  extractDataFromHTML
};