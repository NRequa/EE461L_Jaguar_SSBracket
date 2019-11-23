const cheerio = require('./cheerio/lib/cheerio'); 
const util = require('util');

// The class for element selector objects
class elemSelector {
	constructor(property, selector, checker) {
		this._property = property;
		this._selector = selector;
		this._checker = checker;
	}
	
	// very basic validation function
	validate() {
		if(this._property == null || this._property == undefined) return false;
		if(this._selector == null || this._selector == undefined) return false;
		return true;
	}
	
	set property(prop) {
		this._property = prop;
	}
	
	set sel(sel) {
		this._selector = sel;
	}
	
	set checker(ch) {
		this._checker = ch;
	}
	
	get property() {
		return this._property;
	}
	
	get selector() {
		return this._selector;
	}
	
	get checker() {
		return this._checker;
	}
	
	applySelector(row) {
		let property = this._selector(row);
		if(this._checker == null || this._checker == undefined) return property;
		if(this._checker(property)) {
			return true;
		}
		return false;
	}
}

/*
    html is the html document from axios that we want to scrape
	array is an input array that we want to add to
	rowsDefinition is to iterate over regular elements; put in class and tag names for the elements
	rowsNotDefition requires rowsDefinition, and is optional. Use if you want to preclude elements from iteration.
	
	elementSelectors are elemSelector objects that define what elements you want to select from the HTML. 
	    If you want to iterate, they will be applied to each iteration. Else, they will be applied to the document holistically.
		
    elementConditionals is optional, and matches with the first X number of elementSelectors. elementConditionals 
	    will be tested against the elements selected - elements selected must == the conditions to be included. Else,
		they will be skipped. Elements with conditionals are not included in the return. 
		
	Output is an array of objects, with each object containing key:value pairs
	If you aren't using some optional values, input null!
*/
function extractDataFromHTML (html, array, rowsDefinition, rowsNotDefinition, elementSelectors, elementConditionals) {
	// test for valid inputs
	if(typeof html != "string") return null;
	if(array == null) return null;
	if(typeof array != "object") return null;
	if(typeof elementSelectors != "object") return null;
	const $ = cheerio.load(html);
	var rows;
	var iterating = false;
	// make rows
	if(rowsDefinition != null) {
		iterating = true;
		if(rowsNotDefinition != null) {
			rows = $(rowsDefinition).not(rowsNotDefinition);
		}
		else {
			rows = $(rowsDefinition);
		}
	}
	else {
		return array;
		rows = null;
	}
	if(iterating) {
		// get data from each row
		rows.each((i, el) => {
			let selected = [];
			var goodRow = true;
			elementSelectors.forEach((sel, i) => {
				//console.log(sel);
				let applied = sel.applySelector($(el));
				if(typeof applied == "boolean") {
					if(applied) return;
					else goodRow = false;
				}
				selected.push({name: sel.property, prop: applied});
			});
			if(!goodRow) return;
			//console.log(selected);
			// perform tests on data to see if we want to keep it
			/*
			if(elementConditionals != null && elementConditionals != 'undefined') {
				let success = true;
				elementConditionals.forEach((con) => {
					let thing = selected.shift();
					thing = thing.prop;
					switch(con.type) {
						case "typeof":
						    if(typeof thing != con.value) {success = false;}
							break;
						case "notTypeof":
						    if(typeof thing == con.value) {success = false;}
							break;
						case "equal":
						    if(thing != con.value) {success = false;}
							break;
						case "notEqual":
						    if(thing == con.value) {success = false;}
							break;
						case "contains":
						    if(success == false) break;
						    if(!thing.toString().includes(con.value)) {success = false;}
							break;
						default: success = false;
					}
			    });
				if(!success) {return;}
			}	
			*/
			//console.log(selected);
			// put resulting object into the array
			let object = {};
			selected.forEach((prop) => {
				object[prop.name] = prop.prop;
			});
			array.push(object);
		});
	}
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
	if(typeof keyPhrase != "string") return null;
	if(keyPhrase.length < 1) return null;
	if(typeof end != "string") return null;
	if(end.length != 1) return null;
	let htmlString = util.inspect(html);
	let index = htmlString.indexOf(keyPhrase);
	if(index == -1) return null;
	index = index + keyPhrase.length + skip
	let output = "";
	let reading = index;
	while(!(htmlString.charAt(reading) === end)) {
		output = output.concat(htmlString.charAt(reading));
		reading++;
		if(reading > index + 25) break; 
		if(reading > html.length) break;
	}
	return output;
}

function parseGames(winloss) {
	winloss = winloss.replace(/,/g, "");
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
	//console.log(url);
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

module.exports = {
    elemSelector,
    extractDataFromHTML,
    extractStringFromHTML,
    parseGames,
    parseURL
};