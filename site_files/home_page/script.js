toggleOn = false;
topThree = [];
index = 1;

function loading() {
	var xmlHttp = new XMLHttpRequest();
	var url = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";


	xmlHttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);

		var holder = [];

		var i;
		var tourney;
		var tmp;

		// 2D array holds player associated with win rate
		for (i = 0; i < obj.data.content.length; i++) {
			tmp = [];
			tourney = obj.data.content[i];
			tmp.push(tourney.tname);
			tmp.push(tourney.description);
			tmp.push(tourney.id);
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

			while (j >= 0 && holder[j][3] > key[3]) {
				holder[j + 1] = holder[j];
				j = j - 1;
			}
			holder[j + 1] = key;
		}

		var popular = document.getElementById("popular");

		var tname;
		var description;
		var id;
		var visits;
		var a;
		var para;
		var entry;
		var count = 3;
		for (i = 0; i < obj.data.content.length; i++) {
			entry = document.createElement("div");

			tname = holder[obj.data.content.length - 1 - i][0];
			description = holder[obj.data.content.length - 1 - i][1];
			id = holder[obj.data.content.length - 1 - i][2];

			a = document.createElement("a")
			a.innerHTML = tname;
			a.href = "site_files/bracket_page/bracket.html?id=" + id;
			entry.appendChild(a);

			para = document.createElement("p");
			para.innerHTML = description;
			entry.appendChild(para);

			if (count >= 1) {
				topThree.push(description);
				count = count - 1;
			}

			popular.appendChild(entry);
		}
		document.getElementById("scroller_text").innerHTML = topThree[0];
	}
	}
	$('#myCarousel').on('slide.bs.carousel', function () {
		console.log(topThree);
		document.getElementById("scroller_text").innerHTML = topThree[index];

		index = index + 1;
		if (index > 2) {
			index = 0;
		}
	});



	xmlHttp.open("GET", url,true);
	xmlHttp.send();

	$(".dropdown").on("hide.bs.dropdown", function(){
		document.getElementById("drop_menu").innerHTML = "";
    toggleOn = false;
  });
};

function showContactInfo() {
	$("#contact_btn").css({"display": "none"});
	$("#contact_p").css({"display": ""});
}

function populateDrop() {

	var searchForm = document.getElementById("searchForm");
	//var searchTitle = document.getElementById("search_ph");

	if (toggleOn) {
		$(".dropdown-toggle").dropdown("toggle");
		document.getElementById("drop_menu").innerHTML = "";
		//There is an event listener too that listens for dropdown toggle
		toggleOn = false;
	}

	if (event.keyCode == 13){
		var text = searchForm.value;
		if (text != "") {
			var xmlhttp2 = new XMLHttpRequest();
			var ourApi2 = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/name";
			//var ourApi2 = "http://localhost:8080/api/v1/tournament/name";
			var myResponse2;

			xmlhttp2.onreadystatechange = function() {
	    			if (this.readyState == 4 && this.status == 200) {
								document.getElementById("drop_menu").innerHTML = "";
	        			myResponse2 = JSON.parse(this.responseText);
								var searchedTournaments = myResponse2.data.content;
								console.log(searchedTournaments);
								for(var eachTournament in searchedTournaments){
									console.log(searchedTournaments[eachTournament].id);
									var new_content = '<li style="padding-left: 5%;">'+'<a href='+
									"site_files/bracket_page/bracket.html?id="+searchedTournaments[eachTournament].id+'>'+
									searchedTournaments[eachTournament].tname+' by '+searchedTournaments[eachTournament].tcreator+'</a>'+'</li>';
									document.getElementById("drop_menu").innerHTML = document.getElementById("drop_menu").innerHTML + new_content;
								}
								if (!toggleOn) {
									$(".dropdown-toggle").dropdown("toggle");
									toggleOn = true;
								}
	    			}
			};

			xmlhttp2.open("POST", ourApi2, true);
			xmlhttp2.setRequestHeader("Content-type", "application/json");
			xmlhttp2.send(JSON.stringify({
					"tname":text
				})
			);
			//xmlhttp.send();
		}
	}
}
