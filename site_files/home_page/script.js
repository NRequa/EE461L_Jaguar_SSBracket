var toggleOn = false;

function loading() {
	logInDisplay();
	var xmlHttp = new XMLHttpRequest();
	var url = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";
	var cmd = "";


	var readyFunc = function() {
		if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);

		var holder = [];
		
		holder = fillHolder(obj, holder);
		holder = sort(holder);

		var popular = document.getElementById("popular");
		
		populateList(obj, holder);
		
		$("#features_btn").click();
	}
	}

	var requestMaker = new RequestFactory();
	var request = requestMaker.createRequest("tournament", cmd, readyFunc);
	request.httpObject.open("GET", request.callURL);
	request.httpObject.send();

	$(".dropdown").on("hide.bs.dropdown", function(){
		document.getElementById("drop_menu").innerHTML = "";
    toggleOn = false;
  });
}

function sort(holder) {
	// insertion sort
	for (i = 1; i < holder.length; i++) {
		key = holder[i];
		j = i - 1;

		while (j >= 0 && holder[j][3] > key[3]) {
			holder[j + 1] = holder[j];
			j = j - 1;
		}
		holder[j + 1] = key;
	}
	
	return holder;
}

function fillHolder(obj, holder) {
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
	
	return holder;
}

function populateList(obj, holder) {
	var count = 3;
		for (i = 0; i < obj.data.content.length; i++) {
			entry = document.createElement("div");

			tname = holder[obj.data.content.length - 1 - i][0];
			description = holder[obj.data.content.length - 1 - i][1];
			id = holder[obj.data.content.length - 1 - i][2];
			visits = holder[obj.data.content.length - 1 - i][3];

			a = document.createElement("a")
			a.innerHTML = tname;
			a.href = "site_files/bracket_page/bracket.html?id=" + id;
			entry.appendChild(a);

			para = document.createElement("p");
			para.innerHTML = description;
			entry.appendChild(para);

			para2 = document.createElement("p");
			para2.innerHTML = "<b>Visits: </b>" + visits;
			para2.className = "visit_nums";
			entry.appendChild(para2);

			popular.appendChild(entry);
		}
}

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
			var myResponse2;
			var cmd = "name";

			var readyFunc = function() {
	    			if (this.readyState == 4 && this.status == 200) {
								document.getElementById("drop_menu").innerHTML = "";
	        			myResponse2 = JSON.parse(this.responseText);
								var searchedTournaments = myResponse2.data.content;
								var countTournament = 0;
								for(var eachTournament in searchedTournaments){
									countTournament++;
									var new_content = '<li style="padding-left: 5%;">'+'<a href='+
									"site_files/bracket_page/bracket.html?id="+searchedTournaments[eachTournament].id+'>'+
									searchedTournaments[eachTournament].tname+'</a>'+'</li>';
									document.getElementById("drop_menu").innerHTML = document.getElementById("drop_menu").innerHTML + new_content;
								}
								if(countTournament==0){
									document.getElementById("drop_menu").innerHTML = '<li style="padding-left: 5%;">'
									+ "No tournament found</li>";
								}
								if (!toggleOn) {
									$(".dropdown-toggle").dropdown("toggle");
									toggleOn = true;
								}
	    			}
			};

			var requestMaker = new RequestFactory();
			var request = requestMaker.createRequest("tournament", cmd, readyFunc);
			request.httpObject.open("POST", request.callURL, true);
			request.httpObject.setRequestHeader("Content-type", "application/json");
			request.httpObject.send(JSON.stringify({
					"tname":text
			}));
		}
	}
}

function logInDisplay(){
	console.log();
    if(sessionStorage.getItem("userId") != null && sessionStorage.getItem("userId") != "null"){
        // Hide log in/register
        $(".guestLinks").hide();
        // Show account data link
        $(".logInLinks").show();
    }

    else{
        //Hide account data
        $(".logInLinks").hide();
        // Show account data link
        $(".guestLinks").show();

    }
}

function showFeatures() {
	var xmlHttp = new XMLHttpRequest();
	var url = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/";
	var cmd = "";

	var readyFunc = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			content = obj.data.content;

			var users = [];
			for (i = 0; i < content.length; i++) {
				if (content[i].numtournamentswon >= 5) {
					users.push(content[i]);
				}
			}

			inner = document.getElementById("tcarousel");
			
			populateCarousel(inner, users);
		}
	}
	
	var requestMaker = new RequestFactory();
	var request = requestMaker.createRequest("user", cmd, readyFunc);
	request.httpObject.open("GET", request.callURL);
	request.httpObject.send();
}

function populateCarousel(inner, users) {
	for (i = 0; i < users.length; i++) {
		if (users[i].username == "guest") {
			continue;
		}

		item = document.createElement("div");
		if(i == 0) {
			item.className = "item active";
		} else {
			item.className = "item";
		}

		head = document.createElement("h1");
		head.innerHTML = users[i].username;
		image = document.createElement("img");

		if (users[i].avatarName == null) {
			srcString = "site_files/account_page/images/notavailable.jpeg"
		} else {
			srcString = "site_files/account_page/images/" + users[i].avatarName;
		}
		image.src = srcString;

		para = document.createElement("p");
		para.innerHTML = "Tournament Wins: " + users[i].numtournamentswon;

		item.appendChild(head);
		item.appendChild(image);
		item.appendChild(para);
		inner.appendChild(item);
	}
}


function RequestFactory() {
    this.createRequest = function(type, command, func){
        var request;

        if(type == "accounts"){
            request = new AccountsRequest(command);
        }

        else if (type == "matchresult"){
            request = new MatchResultRequest(command);
        }

        else if (type == "tournament"){
            request = new TournamentRequest(command);
        }
        else if (type == "user"){
            request = new UserRequest(command);
        }

        else if (type == "scrape"){
            request = new ScrapeRequest(command);
        }

        request.type = type;
        request.command = command;
        request.recallFunction = func;

        request.httpObject = new XMLHttpRequest();
        request.httpObject.onreadystatechange = func;

        return request;
    }
}



var AccountsRequest = function(command) {
    this.callURL = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/Accounts/" + command;
}

var MatchResultRequest = function(command) {
    this.callURL = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/" + command;
}

var TournamentRequest = function(command) {
    this.callURL = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/" + command;

}

var UserRequest = function(command) {
    this.callURL = "http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/" + command;
}

var ScrapeRequest  = function(command) {
    this.callURL = "../../scrape/" + command;
}
