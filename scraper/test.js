var assert = require('assert');
const get = require('./axios/lib/axios');


// array to hold the json data. Possibly smelly, but making additional
// promises to get around that is slow and prone to error
var dataArray;

describe('wiki tests', function() {
	before(function() {
		this.timeout(15000);
		return new Promise((resolve) => {
		    var fromBucket = get('http://www.ssbracket.xyz/scrape/data');
	        fromBucket.then(function(data) {
			//console.log(data);
			//console.log(data.data);
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
		it('should return false for every defined dash, excepting Dr. Mario and Rosalina (see github issue)', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(dataArray[i].name == 'Dr. Mario' || dataArray[i].name == 'Rosalina') continue;
				assert.equal(typeof dataArray[i].tdash == undefined, false);
			}
		});
		it('should return false for every defined spotdodge excepting Hero and Joker (see github issue)', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(dataArray[i].name == 'Hero' || dataArray[i].name == 'Joker') continue;
				assert.equal(typeof dataArray[i].tspotdodge == undefined, false);
			}
		});
		it('should return false for every defined traction', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				assert.equal(typeof dataArray[i].ttraction == undefined, false);
			}
		});
    });
	describe('verify values are reasonable', function() {
		it('should return true for every reasonable weight', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				//console.log(dataArray[i].name);
				let truth = dataArray[i].tweight > 61 && dataArray[i].tweight < 136;
				assert.equal(truth, true);
			}
		});
		it('should return true for every reasonable dash, excepting Dr. Mario and Rosalina (see github issue)', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				//console.log(dataArray[i].name);
				if(dataArray[i].name == 'Dr. Mario' || dataArray[i].name == 'Rosalina') continue;
				let truth = dataArray[i].tdash < 3.86 && dataArray[i].tdash > 1.17;
				assert.equal(truth, true);
			}
		});
		/*it('should return true for every reasonable spotdodge excepting Hero and Joker (see github issue)', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				if(dataArray[i].name == 'Hero' || dataArray[i].name == 'Joker') continue;
				let truth = dataArray[i].tspotdodge > 61 && dataArray[i].tspotdodge < 135;
				assert.equal(truth, true);
			}
		});*/
		it('should return true for every reasonable traction', function() {
			var i;
			for(i = 0; i < dataArray.length; i++) {
				//console.log(dataArray[i].name);
				let truth = dataArray[i].ttraction < .140 && dataArray[i].ttraction > .075;
				assert.equal(truth, true);
			}
		});
    });
});


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
