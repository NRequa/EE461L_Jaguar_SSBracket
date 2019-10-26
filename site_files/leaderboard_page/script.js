$(document).ready(function() {
	$("#content_row").css({"display": "none"});
	
	$("#content_row").css({"transition-duration": "0.5s"});
	$("#content_row").css({"transform-origin": "top"});
	$("#content_row").css({"transform": "scale(0)"});
});

function showBoard(buttonNum) {
	$("#content_row").css({"display": ""});
	
	resetAll(buttonNum);
	
	var list;
	var nodeString;
	switch(buttonNum) {
		case 1: list = document.getElementById("top_list1");
		nodeString = "---- testOverall: Test Number ";
		$("#top_list1").css({"display": ""});
		$("#btn1").css({"background-color": "rgb(230, 115, 0)"});
		break;
		case 2: list = document.getElementById("top_list2");
		nodeString = "---- testCharacter: Test Number ";
		$("#top_list2").css({"display": ""});
		$("#btn2").css({"background-color": "rgb(230, 115, 0)"});
		break;
		case 3: list = document.getElementById("top_list3");
		nodeString = "---- testRegion: Test Number ";
		$("#top_list3").css({"display": ""});
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
	
	$("#content_row").css({"transform": "scale(1)"});
}

function resetAll() {
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

function showTopUsers() {
	console.log("showing top users");
	var Http = new XMLHttpRequest();
	var url = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user";
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
		var obj = JSON.parse(Http.responseText);
		var holder = [];
		
		var i;
		var user;
		var tmp;
		
		// 2D array holds player associated with win rate
		for (i = 0; i < obj.data.content.length; i++) {
			tmp = [];
			user = obj.data.content[i];
			tmp.push(user.username);
			tmp.push(user.numgamesplayed / user.numwins);
			holder.push(tmp)
		}
		
		console.log(holder);
		
		var j;
		var n = holder.length;
		
		
		// insertion sort
		for (i = 1; i < n; i++) {  
			key = holder[i];  
			j = i - 1;  
  
			while (j >= 0 && holder[j][1] > key[1]) {  
				holder[j + 1] = holder[j];  
				j = j - 1;  
			}  
			holder[j + 1] = key;  
		} 
		
		$("#top_list1").empty();
		var list = document.getElementById("top_list1");
		
		
		var name;
		var val;
		var entry;
		for (i = 0; i < obj.data.content.length; i++) {
			entry = document.createElement("li");
			
			name = holder[obj.data.content.length - 1 - i][0];
			val = holder[obj.data.content.length - 1 - i][1];
			
			entry.appendChild(document.createTextNode(name + ": " + val));
			list.appendChild(entry);
		}
	}
}