function logInDisplay(){
    if(sessionStorage.getItem("userId") != null){
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

function grabCommits() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonReturn = JSON.parse(this.responseText);
            jsonCommitsParser(jsonReturn);
        }
    };

    xhttp.open("GET", "https://api.github.com/repos/NRequa/EE461L_Jaguar_SSBracket/stats/contributors", true);
    xhttp.send();
    }

    function grabIssues(userName, searchOpen) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonReturn = JSON.parse(this.responseText);
            jsonIssuesParser(jsonReturn, userName, searchOpen);
        }
        };
        if(searchOpen){
            xhttp.open("GET", "https://api.github.com/repos/NRequa/EE461L_Jaguar_SSBracket/issues?creator=" + userName , true);
        }
        else{
            xhttp.open("GET","https://api.github.com/repos/NRequa/EE461L_Jaguar_SSBracket/issues?creator=" + userName + "&state=closed", true)
        }
        xhttp.send();
    }

    function jsonCommitsParser(jsonObjectCommits){
        var commitId = "Commits";
        var sumCommits = 0;
        for(var i in jsonObjectCommits){
            // Grab username of we're at
            var userName = jsonObjectCommits[i]["author"]["login"];
            var totalCommits = jsonObjectCommits[i]["total"];
            
            // Handle case with two different user names t osame person
            if(userName == "ttak007"){
                userName = "up1007";
            }
            
            // Grab total commits of current author and put into table
            var currCommits = parseInt(document.getElementById(userName + "Commits").innerHTML);
            var usersCommits = totalCommits + currCommits;
            document.getElementById(userName + "Commits").innerHTML = usersCommits;

            // Add commits to running total
            sumCommits += totalCommits;
        }

        document.getElementById("sumCommits").innerHTML = sumCommits;
    }

    function jsonIssuesParser(jsonObjectIssues, userName, editOpen){
        // Pull request are considered issues by GitHub, so have to ignore them when counting total issues.
        // "pull-request" key in JSON indicates which elements are these type.
        var issue_count = 0;
        var openSum;
        var closeSum;
        for(var i in jsonObjectIssues){
           
            if(!("pull_request" in jsonObjectIssues[i])){
                issue_count++;
            }
        }

        if(editOpen){
            document.getElementById(userName + "OpenIssues").innerHTML = issue_count;
            document.getElementById("sumOpenIss").innerHTML = issue_count + parseInt(document.getElementById("sumOpenIss").innerHTML);

        }
        else{
            document.getElementById(userName + "ClosedIssues").innerHTML = issue_count;
            document.getElementById("sumCloseIss").innerHTML = issue_count + parseInt(document.getElementById("sumCloseIss").innerHTML);
        }
               
    }

    function sumUnitTests(userName){
        var indUnitTests = parseInt(document.getElementById(userName + "UnitTests").innerHTML);
        document.getElementById("sumUnits").innerHTML = parseInt(document.getElementById("sumUnits").innerHTML) + indUnitTests; 
    }

    function runGETS(){
        logInDisplay();
        // Get individual commits for 
        grabCommits();
        var userArray = ["NRequa", "jdieciedue", "NickDuggar", "TakumaFujiwara", "up1007", "bsx-1"];
        for(var i in userArray){      
            grabIssues(userArray[i], true);
            grabIssues(userArray[i], false);
            sumUnitTests(userArray[i]);
        }
    }

    // window.onload = runGETS;