const elemSelector = require('./helpers').elemSelector;


// get selectors for the weight
function getWeightSelectors() {
	let weightTitleSelector1 = new elemSelector("titletest", getWeightTitleCond);
    let weightTitleSelector2 = new elemSelector("titletest2", getWeightTitleCond);
    let weightNameSelector = new elemSelector("name", getWeightName);
    let weightWeightSelector = new elemSelector("weight", getWeightWeight);
	return [weightTitleSelector1, weightTitleSelector2, weightNameSelector, weightWeightSelector];
}

//[{name: "wtitle", fn: sel.getDashTitleCond}, {name: "wtitle2", fn: sel.getDashTitleCond}, {name: "name", fn: sel.getDashName}, {name: "dash", fn: sel.getDashDash}]
function getDashSelectors() {
	let dashTitleSelector1 = new elemSelector("titletest", getDashTitleCond);
    let dashTitleSelector2 = new elemSelector("titletest2", getDashTitleCond);
    let dashNameSelector = new elemSelector("name", getDashName);
    let dashDashSelector = new elemSelector("dash", getDashDash);
	return [dashTitleSelector1, dashTitleSelector2, dashNameSelector, dashDashSelector];
}

//[{name: "wtitle", fn: sel.getSpotdodgeTitleCond}, {name: "wtitle2", fn: sel.getSpotdodgeTitleCond}, {name: "name", fn: sel.getSpotdodgeName}, {name: "spotdodge", fn: sel.getSpotdodgeSpotdodge}]
function getSpotdodgeSelectors() {
	let spotdodgeTitleSelector1 = new elemSelector("titletest", getSpotdodgeTitleCond);
    let spotdodgeTitleSelector2 = new elemSelector("titletest2", getSpotdodgeTitleCond);
    let spotdodgeNameSelector = new elemSelector("name", getSpotdodgeName);
    let spotdodgeSpotdodgeSelector = new elemSelector("spotdodge", getSpotdodgeSpotdodge);
	return [spotdodgeTitleSelector1, spotdodgeTitleSelector2, spotdodgeNameSelector, spotdodgeSpotdodgeSelector];
}
//[{name: "wtitle", fn: sel.getTractionTitleCond}, {name: "wtitle2", fn: sel.getTractionTitleCond}, {name: "name", fn: sel.getTractionName}, {name: "traction", fn: sel.getTractionTraction}]
function getTractionSelectors() {
	let tractionTitleSelector1 = new elemSelector("titletest", getTractionTitleCond);
    let tractionTitleSelector2 = new elemSelector("titletest2", getTractionTitleCond);
    let tractionNameSelector = new elemSelector("name", getTractionName);
    let tractionTractionSelector = new elemSelector("traction", getTractionTraction);
	return [tractionTitleSelector1, tractionTitleSelector2, tractionNameSelector, tractionTractionSelector];
}

function getSSBWorldSelectors() {
	let ssbworldUrlSelector = new elemSelector("url", getSSBWorldCharURL);
	return [ssbworldUrlSelector];
}



// Character Stats Element Selector Functions

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
	return "https://ssbworld.com" + row.attr('href');
}

function getSSBWorldWinLose(row) {
	return row.root().children().eq(0).children().eq(1).children().eq(1).children().eq(2).children().eq(5).children().eq(0).attr('class');
}

module.exports = {
  getWeightSelectors,
  getDashSelectors,
  getSpotdodgeSelectors,
  getTractionSelectors,
  getSSBWorldSelectors,
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
};