function logInDisplay(){
    if(sessionStorage.getItem("userId") != -1){
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
window.onload = logInDisplay;