function loading(){
  if(sessionStorage.getItem("userId") != -1){
    document.getElementById("bracket_btn").style.visibility="visible";
    document.getElementById("login_prompt").style.visibility="hidden";

  }
  else{
    document.getElementById("bracket_btn").style.visibility="hidden";
    document.getElementById("login_prompt").style.visibility="visible";
  }
}
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
