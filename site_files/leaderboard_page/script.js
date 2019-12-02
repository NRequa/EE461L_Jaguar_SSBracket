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
	var cmd = "";

	var readyFunc = function() {
		
		var obj = JSON.parse(Http.responseText);
		var holder = [];

		var i;
		var user;
		var tmp;
		var winRate;

		// 2D array holds player associated with win rate
		for (i = 0; i < obj.data.content.length; i++) {
			tmp = [];
			user = obj.data.content[i];
			tmp.push(user.username);
			if (user.numwins == 0) {
				winRate = 0;
			} else {
				winRate = user.numwins / user.numgamesplayed;
			}
			tmp.push(winRate.toFixed(2));
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
			
			// ignore for debugging
			if (name == "guest") {
				continue;
			}
			
			val = holder[obj.data.content.length - 1 - i][1];

			entry.appendChild(document.createTextNode(name + ": " + val));
			list.appendChild(entry);
		}
	}

	/*
	Http.open("GET", url);
	Http.send();
	*/
	var requestMaker = new RequestFactory();
	var request = requestMaker.createRequest("user", cmd, readyFunc);
	request.httpObject.open("GET", request.callURL);
	request.httpObject.send();
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
