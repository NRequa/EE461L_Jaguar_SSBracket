const elemSelector = require('./helpers').elemSelector;

// get selectors for the weight
function getWeightSelectors() {
	let weightTitleSelector1 = new elemSelector("titletest", getWeightTitleCond, verifyTitle);
    let weightNameSelector = new elemSelector("name", getWeightName);
    let weightWeightSelector = new elemSelector("weight", getWeightWeight);
	return [weightTitleSelector1, weightNameSelector, weightWeightSelector];
}

function getDashSelectors() {
	let dashTitleSelector1 = new elemSelector("titletest", getDashTitleCond, verifyTitle);
    let dashNameSelector = new elemSelector("name", getDashName);
    let dashDashSelector = new elemSelector("dash", getDashDash);
	return [dashTitleSelector1, dashNameSelector, dashDashSelector];
}

function getSpotdodgeSelectors() {
	let spotdodgeTitleSelector1 = new elemSelector("titletest", getSpotdodgeTitleCond, verifyTitle);
    let spotdodgeNameSelector = new elemSelector("name", getSpotdodgeName);
    let spotdodgeSpotdodgeSelector = new elemSelector("spotdodge", getSpotdodgeSpotdodge);
	return [spotdodgeTitleSelector1, spotdodgeNameSelector, spotdodgeSpotdodgeSelector];
}

function getTractionSelectors() {
	let tractionTitleSelector1 = new elemSelector("titletest", getTractionTitleCond, verifyTitle);
    let tractionNameSelector = new elemSelector("name", getTractionName);
    let tractionTractionSelector = new elemSelector("traction", getTractionTraction);
	return [tractionTitleSelector1, tractionNameSelector, tractionTractionSelector];
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

function verifyTitle(title) {
	if(typeof title == 'undefined') return false;
	if(!title.toString().includes("SSBU")) return false;
	return true;
}

// SSBWorld Functions

function getSSBWorldCharURL(row) {
	return "https://ssbworld.com" + row.attr('href');
}

module.exports = {
  getWeightSelectors,
  getDashSelectors,
  getSpotdodgeSelectors,
  getTractionSelectors,
  getSSBWorldSelectors
};