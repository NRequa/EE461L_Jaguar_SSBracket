// Character Stats Element Selectors

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