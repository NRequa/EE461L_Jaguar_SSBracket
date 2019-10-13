toggleOn = false;

function showContactInfo() {
	$("#contact_btn").css({"display": "none"});
	$("#contact_p").css({"display": ""});
}

function populateDrop() {
	if (toggleOn) {
		$(".dropdown-toggle").dropdown("toggle");
		toggleOn = false;
	}
	
	var searchForm = document.getElementById("searchForm");
	var searchTitle = document.getElementById("search_ph");
	
	if (event.keyCode == 13){
		var text = searchForm.value;
		if (text != "") {
			searchTitle.innerHTML = "Searching for: " + text;
			if (!toggleOn) {
				$(".dropdown-toggle").dropdown("toggle");
				toggleOn = true;
			}
		}
	}
}