var assert = require('assert');
const get = require('./axios/lib/axios');
const helpers = require('./helpers.js');
const elemSelector = require('./helpers').elemSelector;

// array to hold the json data. Possibly smelly, but making additional
// promises to get around that is slow and prone to error (even more smelly)
var dataArray;

describe('wiki sanity tests', function() {
	before(function() {
		this.timeout(15000);
		return new Promise((resolve) => {
		    var fromBucket = get('http://www.ssbracket.xyz/scrape/data');
	        fromBucket.then(function(data) {
		    dataArray = data.data;
		    resolve(dataArray);
	        })
	        .catch(function(err) {
		        console.log(err)
	        });	
		});
	});
	describe('verify values exist', function() {
		it('should return false for every defined weight', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].tweight == undefined, false);
			}
		});
		it('should return false for every defined dash', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(dataArray[i].name == 'Dr. Mario' || dataArray[i].name == 'Rosalina') continue;
				assert.equal(typeof dataArray[i].tdash == undefined, false);
			}
		});
		it('should return false for every defined spotdodge', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].tspotdodge == undefined, false);
			}
		});
		it('should return false for every defined traction', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].ttraction == undefined, false);
			}
		});
		it('should return true if wins, losses, and total games are numbers', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof parseInt(dataArray[i].ttotalGames) != "NaN", true);
				assert.equal(typeof parseInt(dataArray[i].twins) != "NaN", true);
				assert.equal(typeof parseInt(dataArray[i].tlosses) != "NaN", true);
			}
		});
    });
	describe('verify values are reasonable', function() {
		it('should return true for every reasonable weight', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				let truth = dataArray[i].tweight > 61 && dataArray[i].tweight < 136;
				assert.equal(truth, true);
			}
		});
		it('should return true for every reasonable dash', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				let truth = dataArray[i].tdash < 3.86 && dataArray[i].tdash > 1.17;
				assert.equal(truth, true);
			}
		});
		it('should return true for every reasonable spotdodge', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(dataArray[i].name == 'Terry') continue;
				let truth = dataArray[i].tspotdodge == '3-14'
				         || dataArray[i].tspotdodge == '3-16'
						 || dataArray[i].tspotdodge == '3-17'
						 || dataArray[i].tspotdodge == '6-17'
						 || dataArray[i].tspotdodge == '3-18';
				assert.equal(truth, true);
			}
		});
		it('should return true for every reasonable traction', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
                if(dataArray[i].name == 'Terry') continue;
				let truth = dataArray[i].ttraction < .140 && dataArray[i].ttraction > .075;
				assert.equal(truth, true);
			}
		});
		it('should return true when the total games equals wins + losses', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(parseInt(dataArray[i].ttotalGames) == parseInt(dataArray[i].twins) + parseInt(dataArray[i].tlosses), true);
			}
		});
    });
});

describe('prostats sanity tests', function() {
	before(function() {
		this.timeout(15000);
		return new Promise((resolve) => {
		    var fromBucket = get('http://www.ssbracket.xyz/scrape/prodata');
	        fromBucket.then(function(data) {
		    dataArray = data.data;
		    resolve(dataArray);
	        })
	        .catch(function(err) {
		        console.log(err)
	        });	
		});
	});
	describe('verify values exist', function() {
		it('should return false for every defined name', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].name != "string", false);
			}
		});
		it('should return false for every defined rank', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof parseInt(dataArray[i].rank) != "number", false);
			}
		});
		it('should return false for every defined nationality', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].nationality != "string", false);
			}
		});
		it('should return false for every defined char1, 2, 3, and 4', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].char1 != "string", false);
				assert.equal(typeof dataArray[i].char2 != "string", false);
				assert.equal(typeof dataArray[i].char3 != "string", false);
				assert.equal(typeof dataArray[i].char4 != "string", false);
			}
		});
		it('should return false for every defined score', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof parseInt(dataArray[i].score) != "number", false);
			}
		});
		it('should return false for every defined xfactor', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].xfactor != "string", false);
			}
		});
    });
	describe('verify values are reasonable', function() {
		it('should return true for every defined rank matching its order', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(parseInt(dataArray[i].rank) == i + 1, true); // offset for starting from 0
			}
		});
		it('should return true for scores being properly ordered', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(i > 0) assert.equal(parseInt(dataArray[i].score) <= parseInt(dataArray[i].score), true);
				if(i < 49) assert.equal(parseInt(dataArray[i].score) >= parseInt(dataArray[i+1].score), true);
			}
		});
		it('should return true for every reasonable score', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof parseInt(dataArray[i].score) > 100.0, false);
				assert.equal(typeof parseInt(dataArray[i].score) < 50.0, false);
			}
		});
    });
});

// helper functions for testing extractDataFromHTML

function getTableRow(row) {
	return row.text();
}

function getLink(row) {
	return row.children().eq(0).attr('href');
}

function getTitle(row) {
	return row.children().eq(0).attr('title');
}

function returnAString(row) {return "hello";}
function returnANumber(row) {return 42;}
function returnNull(row) {return null;}

function getGeneralTestSelectors1() {
	return [new elemSelector("test", getTableRow)];
}


describe('general tests', function() {
	var testHTML = '<body><table><tbody class="awesome"><tr>0</tr><tr>1</tr><tr>2</tr><tr>3</tr><tr>4</tr><tr>5</tr></tbody></table><table><tbody class="awesome notawesome"><tr>5</tr><tr>4</tr><tr>3</tr><tr>2</tr><tr>1</tr><tr>0</tr></tbody></table><ul class="awesomer"><li class="skipme"><a href="bad.link">NO</a></li><li><a href="cultofthepartyparrot.com">cult</a></li><li><a href="google.com">goog</a></li><li><a href="yahoo.com" title="notnull">yaho</a></li></ul></body>';
	
	describe('testing extractDataFromHTML', function() {
		it('should return true selecting the right test table', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, '.awesome tr', null, 
                getGeneralTestSelectors1());
			assert.equal(array.length == 12, true);
		});
		it('should return true selecting only 1 test table', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, '.awesome', '.notawesome', 
                getGeneralTestSelectors1());
			assert.equal(array.length == 1, true);
		});
		it('should return an empty array when given invalid row definition', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, null, '.notawesome', 
                getGeneralTestSelectors1());
			assert.equal(array.length == 0, true);
		});
		it('should return null when given invalid html', function() {
			let array = [];
			let val = helpers.extractDataFromHTML(null, array, '.awesome', '.notawesome', 
                getGeneralTestSelectors1());
			assert.equal(val == null, true);
		});
		it('should return null when given null array', function() {
			let array = [];
			let val = helpers.extractDataFromHTML(testHTML, null, '.awesome', '.notawesome', 
                getGeneralTestSelectors1());
			assert.equal(val == null, true);
		});
		it('should return null when given a non-object array', function() {
			let array = [];
			let val = helpers.extractDataFromHTML(testHTML, 42, '.awesome', '.notawesome', 
                getGeneralTestSelectors1());
			assert.equal(val == null, true);
		});
		it('should return null when given a non-object elementSelectors array', function() {
			let array = [];
			let val = helpers.extractDataFromHTML(testHTML, array, '.awesome', '.notawesome', 
                42,
		        null);
			assert.equal(val == null, true);
		});
		// NOTE: after refactoring, the below 5 tests are relatively meaningless, since they tested a function that didn't make sense
		it('should exclude the first li element with anchor "bad.link"', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
			    [new elemSelector("test", getLink, function(l) {return l != "bad.link";}),
				 new elemSelector("link", getLink)]);
			assert.equal(array.length == 3, true);
		});
		it('should find only 1 li with the anchor "bad.link"', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
			    [new elemSelector("test", getLink, function(l) {return l === "bad.link";}),
				 new elemSelector("link", getLink)]);
			assert.equal(array.length == 1, true);
		});
		it('should exclude li elements without "parrot" in the anchor', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
			    [new elemSelector("test", getLink, function(l) {return l.includes('parrot') === true;}),
				 new elemSelector("link", getLink)]);
			assert.equal(array.length == 1, true);
		});
		it('should exclude li elements with null title attributes on their anchors', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
			    [new elemSelector("test", getTitle, function(l) {return typeof l != "undefined";}),
				 new elemSelector("link", getLink)]);
			assert.equal(array.length == 1, true);
		});
		it('should exclude test condition values from returned objects', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
                [new elemSelector("test", getTitle, function(l) {return typeof l != "undefined";}),
				 new elemSelector("link", getLink)]);
			assert.equal(array[0].test == undefined, true);
		});
		it('should return an object with the specified parameters', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
			    [new elemSelector("string", returnAString),
				 new elemSelector("number", returnANumber),
				 new elemSelector("nullval", returnNull)]);
			assert.equal(array[0].string == "hello", true);
			assert.equal(array[0].number == 42, true);
			assert.equal(array[0].nullval == null, true);
		});
		it('should not return an object with unspecified parameters', function() {
			let array = [];
			helpers.extractDataFromHTML(testHTML, array, 'li', null, 
                [new elemSelector("string", returnAString),
				 new elemSelector("number", returnANumber),
				 new elemSelector("nullval", returnNull)]);
			assert.equal(array[0].unspecified == undefined, true);
		});
	});
	
	describe('testing extractStringFromHTML', function() {
		it('should return "<tr>"', function() {
			let value = helpers.extractStringFromHTML(testHTML, 'notawesome', 2, "5");
		    assert.equal(value, "<tr>");
		});
		it('should not find the phrase "unicorn" in our html', function() {
			let value = helpers.extractStringFromHTML(testHTML, 'unicorn', 2, "5");
		    assert.equal(value, null);
		});
		it('should not return more than 26 characters', function() {
			let value = helpers.extractStringFromHTML(testHTML, '<body>', 0, "&");
		    assert.equal(value.length == 26, true);
		});
		it('should not accept a non-string keyPhrase', function() {
			let value = helpers.extractStringFromHTML(testHTML, 123456789, 0, "&");
		    assert.equal(value, null);
		});
		it('should not accept an empty keyPhrase', function() {
			let value = helpers.extractStringFromHTML(testHTML, "", 0, "&");
		    assert.equal(value, null);
		});
		it('should not accept a non-string end character', function() {
			let value = helpers.extractStringFromHTML(testHTML, "<", 0, 42);
		    assert.equal(value, null);
		});
		it('should not accept a string of length != 1 as end character', function() {
			let value = helpers.extractStringFromHTML(testHTML, "<", 0, "42");
		    assert.equal(value, null);
		});
		it('should not try to read beyond the end of the html document', function() {
			let value = helpers.extractStringFromHTML(testHTML, "</b", 0, "0");
		    assert.equal(value, "ody>");
		});
		
		
	});
});