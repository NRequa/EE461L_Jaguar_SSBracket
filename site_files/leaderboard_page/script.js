$(document).ready(function() {
	$("#content_row").css({"display": "none"});
	
	$("#content_row").css({"transition-duration": "0.5s"});
	$("#content_row").css({"transform-origin": "top"});
	$("#content_row").css({"transform": "scale(0)"});
	
	$("#btn1").click();
});

function showBoard(buttonNum) {
	$("#content_row").css({"display": ""});
	
	resetAll(buttonNum);
	
	var list;
	list = document.getElementById("top_list1");
	$("#top_list1").css({"display": ""});
	$("#btn1").css({"background-color": "rgb(230, 115, 0)"});
	showTopUsers();
	
	if (list.innerText != "") {
		return;
	}
	
	$("#content_row").css({"transform": "scale(1)"});
}

function resetAll() {
	$("#top_list1").css({"display": "none"});
	$("#btn1").css({"background-color": "rgb(255, 191, 128)"});
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
			tmp.push((user.numgamesplayed / user.numwins).toFixed(2));
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