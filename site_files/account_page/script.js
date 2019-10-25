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