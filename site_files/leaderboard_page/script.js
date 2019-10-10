function showBoard(buttonNum) {
	$("#leader_text").css({"display": "none"});
	
	$("#top_list1").css({"display": "none"});
	$("#top_list2").css({"display": "none"});
	$("#top_list3").css({"display": "none"});
	
	var list;
	var nodeString;
	switch(buttonNum) {
		case 1: list = document.getElementById("top_list1");
		nodeString = "test1";
		$("#top_list1").css({"display": ""});
		break;
		case 2: list = document.getElementById("top_list2");
		nodeString = "test2";
		$("#top_list2").css({"display": ""});
		break;
		case 3: list = document.getElementById("top_list3");
		nodeString = "test3";
		$("#top_list3").css({"display": ""});
		break;
		default: return;
	}
	
	if (list.innerText != "") {
		return;
	}
	
	/* forloop for later dynamic population of lists */
	for (var i = 0; i < 10; i++) {
		var entry = document.createElement("li");
		entry.appendChild(document.createTextNode(nodeString));
		list.appendChild(entry);
	}
}