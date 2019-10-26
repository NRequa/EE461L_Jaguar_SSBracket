toggleOn = false;

$(document).ready(function() {
	var Http = new XMLHttpRequest();
	var url = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament";
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
			tourney = obj.data.content[i];
			tmp.push(tourney.tname);
			tmp.push(tourney.description);
			tmp.push(tourney.visits);
			holder.push(tmp)
		}
		
		console.log(holder);
		
		var j;
		var n = holder.length;
		
		// insertion sort
		for (i = 1; i < n; i++) {  
			key = holder[i];  
			j = i - 1;  
  
			while (j >= 0 && holder[j][2] > key[2]) {  
				holder[j + 1] = holder[j];  
				j = j - 1;  
			}  
			holder[j + 1] = key;  
		}
		
		var popular = document.getElementById("popular");
		
		var tname;
		var description;
		var visits;
		var header;
		var para;
		var entry;
		for (i = 0; i < obj.data.content.length; i++) {
			entry = document.createElement("div");
			
			tname = holder[obj.data.content.length - 1 - i][0];
			description = holder[obj.data.content.length - 1 - i][1];
			
			header = document.createElement("h4")
			header.innerHTML = tname;
			entry.appendChild(header);
			
			para = document.createElement("p");
			para.innerHTML = description;
			entry.appendChild(para);
			
			popular.appendChild(entry);
		}
	}
});

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