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

function displayOverview(){
    var userID = sessionStorage.getItem("userId");
        var apiCall = 'http://www.ssbracket.us-east-2.elasticbeanstalk.com/api/v1/Accounts/signin';
       // var apiCall = "http://localhost:8090/api/v1/user/" + userID;
    
      
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            console.log(this.readyState);
            console.log(this.responseText);
            if(this.readyState == 4 && this.status == 200){
                var response = JSON.parse(this.responseText);
                if(response["status"] == "OK"){

                    var username = response["data"]["username"];
                    var totWins = response["data"]["numwins"];
                    var totGames = response["data"]["numgamesplayed"];
                    var tournCreated = response["data"]["numtournamentscreated"];
                    var tournPart = response["data"]["numtournamentsparticipated"];
                    var tournWon = response["data"]["numtournamentswon"];

                    $("#overviewTable").append("<tr><td>" + username + "</td>" + "<td>" + totWins + "</td>" + "<td>" + totGames + "</td>" + "<td>" + tournCreated + "</td>" + "<td>" + tournPart + "</td>" + "<td>" + tournWon + "</td></tr>");                   
                }
                else{
                    console.log("something wrong with getting ID");
                }
            }
        };
    
        xmlhttp.open("GET",apiCall);
        xmlhttp.send();
}

window.onload = displayOverview;

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

