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
            sessionStorage.setItem("userId", null);
            sessionStorage.setItem("accId", null);
            document.location.href = "loginPrompt.html";
        }
    }
}

function confirmPassword(){
    if(document.getElementById("regPass").value != document.getElementById("confirmPass").value ){
        document.getElementById("passwordOK").value = "Passwords don't match.";
        document.getElementById("submit").disabled = true;
    }
    else{
        document.getElementById("passwordOK").value = "";
        document.getElementById("submit").disabled = false;
    }
}
function populateTables(){
    var userID = sessionStorage.getItem("userId");
    var apiCall = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/" + userID;
       changeProfilePicture("notavailable.jpeg");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            console.log(this.readyState);
            console.log(this.responseText);
            if(this.readyState == 4 && this.status == 200){
                var response = JSON.parse(this.responseText);
                if(response["status"] == "OK"){
                    document.getElementById("accName").innerHTML = response["data"]["username"];
                    populateOverview(response);
                    populateTournTable(response);
                    populateCharTable(response);
                    populateFriendTable(response);
                    changeProfilePicture(response.data.avatarName);

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
    // Arrays to hold lower seed and higher seed matches for user
    var lowSeedMatches = response["data"]["lowerSeedMatchResults"];
    var highSeedMatches = response["data"]["higherSeedMatchResults"];
    console.log(lowSeedMatches);

    // Map for a charater played to wins and losses
    var charStatsMap = new Map();
    // Array to hold W/L with [Wins, Losses]
    var defaultArray = [0, 0];
    var updatedArray;

    // Iterate through lower seed matches and add wins/losses
    
    for(var i = 0; i < lowSeedMatches.length; i++){
        var matchComplete = lowSeedMatches[i]["completed"];
        if(matchComplete){

            // Get character played and if match won
            var charPlayed = lowSeedMatches[i]["p2characterplayed"];
            
            var won = !(lowSeedMatches[i]["p1win"]);

            // Checks if characer is already in map. Creates entry if not
            if(charStatsMap.get(charPlayed) == undefined){
                charStatsMap.set(charPlayed, [0, 0]);
            }

            // Holds our [Wins, Losses] for given character
            updatedArray = charStatsMap.get(charPlayed);

            if(won){
                updatedArray[0] = updatedArray[0] + 1;
            }

            else{
                updatedArray[1] = updatedArray[1] + 1;
            }

        }
    }

    // Iterate through higher seed matches and add wins/loses
    for(var i = 0; i < highSeedMatches.length; i++){
        var matchComplete = highSeedMatches[i]["completed"];
        if(matchComplete){

            // Get character played and if match won
            var charPlayed = highSeedMatches[i]["p1characterplayed"];
            var won = highSeedMatches[i]["p1win"];

            // Checks if characer is already in map. Creates entry if not
            if(charStatsMap.get(charPlayed) == undefined){
                charStatsMap.set(charPlayed, [0, 0]);
            }

            // Holds our [Wins, Losses] for given character
            updatedArray = charStatsMap.get(charPlayed);

            if(won){
                updatedArray[0] = updatedArray[0] + 1;
            }

            else{
                updatedArray[1] = updatedArray[1] + 1;
            }
        }
    }

    // Populate table with each character wins and losses
    for(var [key, value] of charStatsMap){
        console.log(key + " - W:" + value[0] + " | L:" + value[1]);
        $("#charTable").append("<tr><td>" + key + "</td><td>" + value[0] + "</td><td>" + value[1] + "</td><td>" + (value[0] + value[1]) + "</td>");
    }



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

function changeProfilePicture(imageName){
  if((imageName!=null)&&(imageName!=undefined)&&(imageName!="default")){
      document.getElementById("Avatar").src = "images/"+imageName;
  }
  console.log("profile picture change function ran")
}

function addBuddy(){
    var apiCall = 'http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/addfriend/' + sessionStorage.getItem("userId");
    


    var formData = {
        "username" : $('input[id=palUserName]').val(),
    }


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        console.log(this.readyState);
        console.log(this.status);
        console.log(this.responseText);
        if(this.readyState == 4 && this.status == 200){
            alert("Friend added!");
        }

        else if(this.readyState == 4 && this.status == 400){
            alert("That user doesn't exist!");
        }
    };

    xmlhttp.open("PATCH",apiCall);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
   // xmlhttp.setRequestHeader("Accept", "*/*");
    xmlhttp.send(JSON.stringify(formData));
}

function killFriend(){
        var apiCall = 'http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/deletefriend/' + sessionStorage.getItem("userId");
        
        var formData = {
            "username" : $('input[id=palUserName]').val(),
        }
    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            console.log(this.readyState);
            console.log(this.status);
            console.log(this.responseText);
            if(this.readyState == 4 && this.status == 200){
                alert("Friend removed :(");
            }
    
            else if(this.readyState == 4 && this.status == 400){
                alert("That user isn't your friend");
            }
        };
    
        xmlhttp.open("PATCH",apiCall);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
       // xmlhttp.setRequestHeader("Accept", "*/*");
        xmlhttp.send(JSON.stringify(formData));
    }


function changePictureRequest(imageName){
  var myuserid = sessionStorage.getItem("userId");
  var apiCall = 'http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/updateavatar/'+myuserid;
  var formData = {
      "avatarName" : imageName
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          var response = JSON.parse(this.responseText);
          if(response.status){
            console.log(response);
            changeProfilePicture(response.data.avatarName);
          }
      }
  };

  xmlhttp.open("PATCH",apiCall);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(formData));
}


function resetPassword(){
    var myuserid = sessionStorage.getItem("accId");
    var apiCall = 'http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/Accounts/updatePass/'+myuserid;
   // var apiLocal = 'http://localhost:8080/api/v1/Accounts/updatePass/'+myuserid;
    var formData = {
        "username" :  "bigDummy",
        "password" :  $('input[id=regPass]').val()
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            if(response.status){
              console.log(response);
              alert("Password changed!");
            }

            else{
                alert("Password not reset, something went wrong.");
            }
        }
    };
  
    xmlhttp.open("PATCH",apiCall);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(formData));

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
