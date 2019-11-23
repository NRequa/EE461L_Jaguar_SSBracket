const elemSelector = require('./helpers').elemSelector;

// get selectors for the weight
function getProSelectors() {
	let styleSelector = new elemSelector("style", getProPlayerRowStyle, verifyStyle);
	let nameSelector = new elemSelector("name", getProPlayerName);
	let rankSelector = new elemSelector("rank", getProRank);
	let nationalitySelector = new elemSelector("nationality", getProPlayerNationality);
	let char1Selector = new elemSelector("char1", getProPlayerFirstChar);
	let char2Selector = new elemSelector("char2", getProPlayerSecondChar);
	let char3Selector = new elemSelector("char3", getProPlayerThirdChar);
	let char4Selector = new elemSelector("char4", getProPlayerFourthChar);
	let scoreSelector = new elemSelector("score", getProPlayerScore);
	let xfactorSelector = new elemSelector("xfactor", getProPlayerXFactor);
	return [styleSelector, nameSelector, rankSelector, nationalitySelector, char1Selector, char2Selector, char3Selector, char4Selector, scoreSelector, xfactorSelector];
}

function getProPlayerRowStyle(row) {
	return row.children().eq(0).attr('style');
}

function getProRank(row) {
	return row.children().eq(0).text();
}

function getProPlayerName(row) { // TODO: edit so it doesn't have the number!
	return row.children().eq(2).children().eq(0).text();
}

function getProPlayerNationality(row) {
	return row.children().eq(1).children().eq(0).children().eq(0).attr('title');
}

function getProPlayerFirstChar(row) {
	return row.children().eq(3).children().eq(0).attr('alt');
}

function getProPlayerSecondChar(row) {
	let charvar = row.children().eq(3).children().eq(1).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerThirdChar(row) {
	let charvar = row.children().eq(3).children().eq(2).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerFourthChar(row) {
	let charvar = row.children().eq(3).children().eq(3).attr('alt');
	if(typeof charvar === "undefined") charvar = "None Listed";
	return charvar;
}

function getProPlayerScore(row) {
	return row.children().eq(4).text();
}

function getProPlayerXFactor(row) {
	let xfac = row.children().eq(5).text();
	if(typeof xfac === "string") xfac = xfac.trim();
	return xfac;
}

//[{type: "equal", value: 'text-align:right;'}]

function verifyStyle(style) {
	return style === 'text-align:right;';
}

module.exports = {
  getProSelectors
};