function showBoard() {
	console.log("test");
	$("#leader_text").css({"transition-duration": "0.5s"});
	$("#leader_text").css({"opacity": 0});
	
	var list = document.getElementById("top_lists");
	
	for (var i = 0; i < 10; i++) {
		var entry = document.createElement("li");
		entry.appendChild(document.createTextNode("test"));
		list.appendChild(entry);
	}

	$("#clear_row").css({"display": ""});
	$("#clear_row").css({"transition-duration": "0.5s"});
	$("#clear_row").css({"opacity": 1});
}