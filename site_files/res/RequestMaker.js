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

}