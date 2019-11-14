const cheerio = require('./cheerio/lib/cheerio'); // ./cheerio/lib/cheerio


// Weight functions
function getWeightTitleCond(row) {
	return row.children().eq(1).children().last().attr('title');
}

function getWeightName(row) {
	return row.children().eq(1).children().last().text().trim();
}

function getWeightWeight(row) {
	return row.children().eq(2).text().trim();
}

// Dash Functions
function getDashTitleCond(row) {
	return row.children().eq(1).children().last().attr('title');
}

function getDashName(row) {
	return row.children().eq(1).children().last().text().trim();
}

function getDashDash(row) {
	return row.children().eq(3).text().trim();
}

// Spotdodge Functions
function getSpotdodgeTitleCond(row) {
	return row.children().eq(0).children().last().attr('title');
}

function getSpotdodgeName(row) {
	return row.children().eq(0).children().last().text().trim();
}

function getSpotdodgeSpotdodge(row) {
	return row.children().eq(1).text().trim();
}

// Traction Functions
function getTractionTitleCond(row) {
	return row.children().eq(1).children().last().attr('title');
}

function getTractionName(row) {
	return row.children().eq(1).children().last().text().trim();
}

function getTractionTraction(row) {
	return row.children().eq(2).text().trim();
}

// SSBWorld Functions

function getSSBWorldCharURL(row) {
	return "https://ssbworld.com" + row.attr('href');//.toString();
}

function getSSBWorldWinLose(row) {
	//return row.root().children().eq(1).children().eq(3).children().eq(1).children().eq(4).children().eq(5).children().eq(0).text();//.text();
	return row.root().children().eq(0).children().eq(1).children().eq(1).children().eq(2).children().eq(5).children().eq(0).attr('class');
}

//extractDataFromHTML(html, characterData, '.wikitable tbody tr', '.collapsed', [getWeightTitleCond, getWeightTitleCond, getWeightName, getWeightWeight], []);

function extractWeightFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
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
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    let name = $(el).children().eq(1).children().last().text().trim();
    let dash = $(el).children().eq(3).text().trim();
	characterData.push({name, dash});
  });

  return characterData;
}

function extractSpotdodgeFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(0).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(0).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    let name = $(el).children().eq(0).children().last().text().trim();
    let spotdodge = $(el).children().eq(1).text().trim();
	characterData.push({name, spotdodge});
  });

  return characterData;
}

function extractTractionFromHTML (html, characterData) {
  const $ = cheerio.load(html);
  const characterRows = $('.wikitable tbody tr').not('.collapsed');
  characterRows.each((i, el) => {
	if(typeof $(el).children().eq(1).children().last().attr('title') === "undefined") {return;}
	if($(el).children().eq(1).children().last().attr('title').toString().includes('SSBU') === false) {return;}
    let name = $(el).children().eq(1).children().last().text().trim();
    let traction = $(el).children().eq(2).text().trim();
	characterData.push({name, traction});
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
	//console.log("extracting data from html. These are the arguments:");
	//console.log(html);
	//console.log("the array:");
	//console.log(array);
	//console.log(rowsDefinition);
	//console.log(rowsNotDefinition);
	//console.log("element selectors");
	//console.log(elementSelectors);
	//console.log("element conditionals");
	//console.log(elementConditionals);
	const $ = cheerio.load(html);
	var rows;
	var iterating = false;
	if(rowsDefinition != null) {
		//console.log("iterating");
		iterating = true;
		if(rowsNotDefinition != null) {
			//console.log("row exclusion found");
			rows = $(rowsDefinition).not(rowsNotDefinition);
		}
		else {
			//console.log("no row exclusion found");
			rows = $(rowsDefinition);
		}
		//console.log("the rows:");
		//console.log(rows);
	}
	else {
		rows = null;
		//console.log("rows = null");
	}
	if(iterating) {
		//console.log('starting iteration');
		rows.each((i, el) => {
			//console.log("iterate");
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
				//console.log("element conditionals detected");
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
				//console.log("after condition testing");
			    //console.log(success);
				if(!success) {return;}
			}	
			let object = {};
			selected.forEach((prop) => {
				//console.log(prop);
				object[prop.name] = prop.prop;
			});
			//console.log(object);
			array.push(object);
		});
	}
	/*else { // TODO: edit this to match above
	    console.log("not iterating");
		let selected = [];
		elementSelectors.forEach((sel) => {
			//let fn = sel.fn;
			//let elem = $(fn);
			//let thingToPush = {name: sel.name, prop: sel.fn($)};
			//console.log(cheerio.html($(thingToPush.prop)));
			selected.push({name: sel.name, prop: sel.fn($)});
			
		});
		console.log('the selected elements');
		//console.log(selected[0]);
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
			if(!success) {return array;} // object isn't good, so return the array.
		}	
		let object = {};
		selected.forEach((prop) => {
			console.log(prop);
			object[prop.name] = prop.prop;
		});
		console.log(object);
		array.push(object);
	}*/
	//console.log("the array");
	//console.log(array);
	return array;
}

/*
    html is the html from axios
	keyPhrase is what you want to search for
	skip is number of characters you want to skip
	end is the character you want to stop at
*/
function extractStringFromHTML(html, keyPhrase, skip, end) {
	let htmlString = util.inspect(html);
	let index = htmlString.indexOf(keyPhrase) + keyPhrase.length + skip;
	let output = "";
	let reading = index;
	while(!(htmlString.charAt(reading) === end)) {
		output = output.concat(htmlString.charAt(reading));
		reading++;
		if(reading > index + 25) {
			console.log('reading too long');
			console.log(output);
			break;
		}
	}
	return output;
}

function parseGames(winloss) {
	let wins = "";
	let reading = 0;
	while(!(winloss.charAt(reading) === " ")) {
		if(!isNaN(winloss.charAt(reading))) {wins = wins.concat(winloss.charAt(reading));}
		reading++;
		if(reading > 25) {
			console.log('reading too long');
			console.log(wins);
			break;
		}
	}
	reading = reading + 3;
	let losses = winloss.substr(reading);
	wins = parseInt(wins);
	losses = parseInt(losses);
	let total = wins + losses;
	return {total, wins, losses};
}

function parseURL(url) {
	console.log("parseUrl: ".concat(url));
	let trimmed = url.substr(32).trim(); // remove the https://ssbworld.com/characters/ part
	console.log("trimmed: ".concat(trimmed));
	let output = "";
	let letters = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
	let prevChar = " ";
	for(let i = 0; i < trimmed.length; i++) {
		console.log(output.charCodeAt(i));
		if(trimmed.charCodeAt(i) === 45) { 
		    console.log("DASH DETECTED");
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
	console.log("output: ".concat(output));
	return output;
}

module.exports = {
  getWeightTitleCond,
  getWeightName,
  getWeightWeight,
  getDashTitleCond,
  getDashName,
  getDashDash,
  getSpotdodgeTitleCond,
  getSpotdodgeName,
  getSpotdodgeSpotdodge,
  getTractionTitleCond,
  getTractionName,
  getTractionTraction,
  getSSBWorldCharURL,
  getSSBWorldWinLose,
  extractWeightFromHTML,
  extractDashFromHTML,
  extractSpotdodgeFromHTML,
  extractTractionFromHTML,
  extractDataFromHTML,
  extractStringFromHTML,
  parseGames,
  parseURL
};