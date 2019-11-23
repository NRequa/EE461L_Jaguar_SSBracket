
function Request(settings, httpRequest){
    this.httpRequest = httpRequest;
    this.requestType = settings.requestType;
    this.url = settings.url;

    this.makeRequest = function(){
        console.log("Ran make request function to : " + this.url);
    }
}




function RequestFactory(){}

// Default request is GET
RequestFactory.prototype.requestType = "GET";

// Set creation thing
RequestFactory.prototype.createRequest = function(settings){
    var httpRequest = new XMLHttpRequest;
    return new Request(settings, httpRequest);

}