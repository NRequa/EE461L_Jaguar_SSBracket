function swapPage(pageName){
    switch(pageName){
        
        // Tournament data wanted
        case 0: {
            $("#tournSect").show();
            $("#settingsSect").hide();
            $("#charSect").hide();
            $("#friendsSect").hide();
               
            break;
        }

        // Char data wanted
        case 1: {
            $("#tournSect").hide();
            $("#charSect").show();
            $("#friendsSect").hide();
            $("#settingsSect").hide();
         

            break;
        }

        // friends data wanted
        case 2: {
            $("#tournSect").hide();
            $("#charSect").hide();
            $("#friendsSect").show();
            $("#settingsSect").hide();
             

            break;
        }
        // Settings page wanted
        case 3: {
            $("#tournSect").hide();
            $("#charSect").hide();
            $("#friendsSect").hide();
            $("#settingsSect").show();
            
            break;
        }

        // Log out requested
        case 4: {

        }
    }
}

function populateTables(){
    var userID = sessionStorage.getItem("userId");
       // var apiCall = 'http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/Accounts/signin';
        var apiCall = "http://localhost:8090/api/v1/user/" + userID;
      
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            console.log(this.readyState);
            console.log(this.responseText);
            if(this.readyState == 4 && this.status == 200){
                var response = JSON.parse(this.responseText);
                if(response["status"] == "OK"){

                    populateOverview(response);
                    populateTournTable(response);
                    populateCharTable(response);
                    populateFriendTable(response);                 
                }
                else{
                    console.log("something wrong with getting ID");
                }
            }
        };
    
        xmlhttp.open("GET",apiCall);
        xmlhttp.send();
}

function populateOverview(response){

    var username = response["data"]["username"];
    var totWins = response["data"]["numwins"];
    var totGames = response["data"]["numgamesplayed"];
    var tournCreated = response["data"]["numtournamentscreated"];
    var tournPart = response["data"]["numtournamentsparticipated"];
    var tournWon = response["data"]["numtournamentswon"];

     $("#overviewTable").append("<tr><td>" + username + "</td>" + "<td>" + totWins + "</td>" + "<td>" + totGames + "</td>" + "<td>" + tournCreated + "</td>" + "<td>" + tournPart + "</td>" + "<td>" + tournWon + "</td></tr>");

}
 function populateTournTable(response){
    var tournArray = response["data"]["mytournaments"];
    console.log("Tournmanets : " + tournArray.length);

    for(var i = 0; i < tournArray.length; i++){
        var tournName = tournArray[i]["tournamentname"];
        var tournChamp = tournArray[i]["championname"];
        $("#tournTable").append("<tr><td>" + tournName + "</td><td>" + tournChamp + "</td></tr>");

    }
}

function populateCharTable(response){

}

function populateFriendTable(response){
    var friendArray = response["data"]["myfriends"];
    console.log("Friends : " + friendArray.length);

    for(var i = 0; i < friendArray.length; i++){
        var friendName = friendArray[i]["friendsname"];
        var friendWins = friendArray[i]["totalwins"];
        var friendLosses = friendArray[i]["totallosses"];
        $("#friendTable").append("<tr><td>" + friendName + "</td>" + "<td>" + friendWins + "</td>" + "<td>" + friendLosses + "</td></tr>");

    }
}
window.onload = populateTables;

/*
function getFriendNumber() {
	var Http = new XMLHttpRequest();
	var url = "https://api.myip.com";
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
		console.log(Http.responseText)
	}
} */

