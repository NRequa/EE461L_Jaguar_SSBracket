$(document).ready(function() {
	// begin with showing overall
	//showBoard(1);
});

function showBoard(buttonNum) {
	$("#leader_text").css({"display": "none"});
	
	resetAll(buttonNum);
	
	var list;
	var nodeString;
	switch(buttonNum) {
		case 1: list = document.getElementById("top_list1");
		nodeString = "---- testOverall: Test Number ";
		$("#top_list1").css({"display": ""});
		$("#bar1").css({"opacity": "1"});
		$("#btn1").css({"background-color": "rgb(230, 115, 0)"});
		break;
		case 2: list = document.getElementById("top_list2");
		nodeString = "---- testCharacter: Test Number ";
		$("#top_list2").css({"display": ""});
		$("#bar2").css({"opacity": "1"});
		$("#btn2").css({"background-color": "rgb(230, 115, 0)"});
		break;
		case 3: list = document.getElementById("top_list3");
		nodeString = "---- testRegion: Test Number ";
		$("#top_list3").css({"display": ""});
		$("#bar3").css({"opacity": "1"});
		$("#btn3").css({"background-color": "rgb(230, 115, 0)"});
		break;
		default: return;
	}
	
	if (list.innerText != "") {
		return;
	}
	
	/* forloop for later dynamic population of lists */
	for (var i = 0; i < 20; i++) {
		var testNumber = i + 1;
		var entry = document.createElement("li");
		entry.appendChild(document.createTextNode(nodeString + testNumber));
		
		var img = document.createElement("img");
		img.src = getPicture(buttonNum);
		entry.appendChild(img);
		
		list.appendChild(entry);
	}
}

function resetAll() {
	$("#bar1").css({"opacity": "0"});
	$("#bar2").css({"opacity": "0"});
	$("#bar3").css({"opacity": "0"});
	
	$("#top_list1").css({"display": "none"});
	$("#top_list2").css({"display": "none"});
	$("#top_list3").css({"display": "none"});
	
	$("#btn1").css({"background-color": "rgb(255, 191, 128)"});
	$("#btn2").css({"background-color": "rgb(255, 191, 128)"});
	$("#btn3").css({"background-color": "rgb(255, 191, 128)"});
}

function getPicture(buttonNum) {
	switch(buttonNum) {
		case(1): return "cat1.png";
		break;
		case(2): return "cat2.png";
		break;
		case(3): return "cat3.png";
		break;
		default: return null;
	}
}