var gNum;//used for tracking ids for each name element
var closed;//used for if the tournament is closed for
var id;
var mid;

function loading(){
  logInDisplay();
  var parameters = location.search.substring(1);
  var temp = parameters.split("=");
  closed=false;
  id = unescape(temp[1]);
  var playerText=[];
  mid=[];
  gNum=0;
  //for number of people in the tournament create svg attrivutes
  var player=1;//number of players;
  if(id!=null){
    console.log(getTour(id,player,playerText,callback1));
    addVisitToTournament(id);

    }
    else{
        createBracket(player,playerText);
    }
  }

  function addVisitToTournament(tournamentId){
    var xmlhttp = new XMLHttpRequest();
    var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/addvisit/"+tournamentId;
    //var ourApi = "http://localhost:8080/api/v1/user/113"
    var myResponse;

    xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              myResponse = JSON.parse(this.responseText);
              console.log(myResponse)
          }
    };
    xmlhttp.open("PATCH", ourApi, true);
    xmlhttp.send();
  }

function createBracket(player,playerText){
    var bBox=document.getElementById("bracketbox");
    var pRound=player;
    bBox.setAttribute("style","height: "+(136*player+5+26)+"px")
    //used to calculate svg pixels
    var mIndex=[];//array for midpoints of each match
    for(a=0;a<player*2;a++){
      mIndex[a]=(4+68*a);
    }
    //loop according to number of rounds
    while(!(pRound<1)){
      var node=document.createElement("DIV");
      node.setAttribute("style","width: 400px;");

      node.setAttribute("style","display: inline-block;");
      bBox.appendChild(node);
      //http://xahlee.info/js/js_scritping_svg_basics.html
      var r1=document.createElementNS('http://www.w3.org/2000/svg','svg');
      r1.setAttribute("width","300");
      r1.setAttribute("height",""+(136*player+5));//make the height scale
      var ps1=document.createElementNS('http://www.w3.org/2000/svg',"svg");
      ps1.setAttribute("x","200");
      ps1.setAttribute("y",""+0);
      ps1.setAttribute("width","100");
      ps1.setAttribute("height",(136*player+5));
      for(p=0;p<pRound;p++){
        var top=[];

        //loop according to number of players/2
        //height 68-64&4 margin

        for(j=0;j<2;j++){
          top[j]=createMatch(r1,mIndex[p*2+j]);
        }

        mIndex[p]=(createPath(ps1,top[0],top[1])-32);////chenge when more players
        r1.appendChild(ps1);

      }

      node.appendChild(r1);
      pRound=pRound/2;
    }
    //create the final match
    var node=document.createElement("DIV");
    var att = document.createAttribute("class");
    node.setAttribute("style","width:400px;");
    node.setAttribute("style","display: inline-block;");

    var r1=document.createElementNS('http://www.w3.org/2000/svg','svg');
    r1.setAttribute("width","300");
    r1.setAttribute("height",""+(136*player+5));
    createMatch(r1,mIndex[0]);
    node.appendChild(r1);
    bBox.appendChild(node);

    setName(playerText,player);//this enables setting the player's name

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

  }


function createPath(svg,midpoint1,midpoint2){
  var p1=document.createElementNS('http://www.w3.org/2000/svg',"path");
  var y=midpoint1;
  var z=midpoint2;
  var mid=(y+z)/2
  p1.setAttributeNS(null,"d","M3 "+(y-6)+" L60 "+(y-6)+" L60 "+(mid-6)+" L95 "+(mid-6)+" L95 "+(mid+6)+" L60 "
  +(mid+6)+" L60 "+(z+6)+" L3 "+(z+6)+" L3 "+(z-6)+" L48 "+(z-6)+" L48 "+(y+6)+" L3 "+(y+6)+" Z");
  svg.appendChild(p1);
  return mid;
}
function createPeople(svg,numPMat){
  for(i=0;i<numPMat;i++){
    var pg1=document.createElementNS('http://www.w3.org/2000/svg',"g");
    pg1.setAttribute("id",""+gNum);
    gNum+=1;
    pg1.setAttribute("onclick","rectClick(this.id)");

    var pr1=document.createElementNS('http://www.w3.org/2000/svg',"rect");
    pr1.setAttribute("x","20");
    pr1.setAttribute("y",""+(2+31*i));
    pr1.setAttribute("width","138");
    pr1.setAttribute("height","28");
    pr1.setAttribute("class","p-contain");
    var pr2=document.createElementNS('http://www.w3.org/2000/svg',"rect");
    pr2.setAttribute("x","160");
    pr2.setAttribute("y",""+(2+31*i));
    pr2.setAttribute("width","38");
    pr2.setAttribute("height","28");
    pr2.setAttribute("class","p-s-contain");


    var pt1=document.createElementNS('http://www.w3.org/2000/svg',"text");
    pt1.setAttribute("x","20");
    pt1.setAttribute("y",""+(20+30*i));
    pt1.setAttribute("font-family","Verdana");
    pt1.setAttribute("font-size","15");
    pt1.setAttribute("fill","blue");
    pt1.setAttribute("class","p-text");
    pt1.innerHTML="";
    var pt2=document.createElementNS('http://www.w3.org/2000/svg',"text");
    pt2.setAttribute("x","175");
    pt2.setAttribute("y",""+(20+30*i));
    pt2.setAttribute("font-family","Verdana");
    pt2.setAttribute("font-size","15");
    pt2.setAttribute("fill","blue");
    pt2.setAttribute("class","p-s-text");
    pt2.innerHTML="-";


    pg1.appendChild(pr1);
    pg1.appendChild(pt1);
    pg1.appendChild(pr2);
    pg1.appendChild(pt2);
    svg.appendChild(pg1);
  }
}
function createMatch(r1,midpoint){
  var m1=document.createElementNS('http://www.w3.org/2000/svg','svg');
  m1.setAttribute("x","0");
  m1.setAttribute("y",""+midpoint);//SCALE based on midpoint
  m1.setAttribute("width","200");
  m1.setAttribute("height","64");
  m1.setAttribute("style","background-color:green");

  var mr1=document.createElementNS('http://www.w3.org/2000/svg',"rect");
  mr1.setAttribute("x","0");
  mr1.setAttribute("y","0");
  mr1.setAttribute("width","200");
  mr1.setAttribute("height","64");
  mr1.setAttribute("class","m-contain");
  m1.appendChild(mr1);

  createPeople(m1,2);

  r1.appendChild(m1);
  return midpoint+32
}
function rectClick(g_id){//set Editable

  console.log("clicked");
  console.log(g_id);

  if(closed==false/*&&g_id<size*/){
    var getG=document.getElementById(g_id);
    var cText=getG.childNodes[1];
    var mod=document.getElementById("modal-title");
    mod.innerHTML="Edit Player";
    mod=document.getElementById("modal-text1");
    mod.innerHTML="Enter Player Name (To edit score first close the tournament)";
    mod=document.getElementById("modal-ta1");
    mod.value="";
    console.log(g_id);
    console.log(cText.innerHTML);
    mod.value=cText.innerHTML;
    mod.setAttribute("rows","1");
    mod.setAttribute("cols","50");
    mod=document.getElementsByClassName("modal-data");
    mod.innerHTML=""+g_id;
    mod=document.getElementById("modal-text2");
    mod.innerHTML="Enter Player Character";
    mod=document.getElementById("modal-ta2");
    mod.value="";
    mod.setAttribute("rows","1");
    mod.setAttribute("cols","50");
    //TODO patch for charcter
    $("#myModal").modal();
  }
  else{
    //TODO change stuff
    var getG=document.getElementById(g_id);
    var cText=getG.childNodes[3];
    var mod=document.getElementById("modal-title");
    mod.innerHTML="Enter Score";
    mod=document.getElementById("modal-text1");
    mod.innerHTML="Enter Score";
    mod=document.getElementById("modal-ta1");
    mod.value="";
    console.log(g_id);
    console.log(cText.innerHTML);
    mod.value=cText.innerHTML;
    mod.setAttribute("rows","1");
    mod.setAttribute("cols","50");
    mod=document.getElementsByClassName("modal-data");
    mod.innerHTML=""+g_id;
    //enter score for player 2 lmao
    $("#myModal").modal();
    //integer error testing
  }
}


async function modalEnter(){
  if(closed==false){
  var mod=document.getElementsByClassName("modal-data");
  var data=mod.innerHTML;
  mod=document.getElementById("modal-ta1");
  await setOneName(data,mod.value);
}
else{
  await setScore();
}
}
function setScore(){

}
function setOneName(g_id,text){
  //parsing for length of text
  //patch for matches

  var arrG=document.getElementsByTagName('g');
  arrG[g_id].childNodes[1].innerHTML=text;
  	var xmlhttp = new XMLHttpRequest();
    var matchId=mid[g_id/2];
    var p1Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setp1string/"+id;
    var p2Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setp2string/"+id;
    var myReponse;
    xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              myResponse = JSON.parse(this.responseText);
              console.log(myResponse)
              document.getElementById("test").innerHTML = myResponse.data.tname;
          }
    };


    xmlhttp.setRequestHeader("Content-type", "application/json");
    if(g_id%2==0){
      xmlhttp.open("PATCH", p1Api, true);
      xmlhttp.send(JSON.stringify({
        "player1string":text
      })
      );
    }
    else{
      xmlhttp.open("PATCH", p2Api, true);
      xmlhttp.send(JSON.stringify({
        "player2string":text
      })
      );
    }


}

function setName(pArray,player){
  var xmlhttp = new XMLHttpRequest();
  //var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/113";
  var ourApi ="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse)
            var arrG=document.getElementsByTagName('g');
            var key;
            var i=0;
            for(key in myResponse.data.matchResults){
              mid[i/2]=myResponse.data.matchResults[key].id;
              //cutNames
                arrG[i].childNodes[1].innerHTML=myResponse.data.matchResults[key].player1string;
                if(closed==true){
                  arrG[i].childNodes[3].innerHTML=myResponse.data.matchResults[key].p1roundswon;
                }
                i++;
                //set score of the stuff
                //change color if bye
                arrG[i].childNodes[1].innerHTML=myResponse.data.matchResults[key].player2string;
                if(closed==true){
                  arrG[i].childNodes[3].innerHTML=myResponse.data.matchResults[key].p2roundswon;
                }
                i++;

            }
        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();


}

function closeTour(){
  //seteditable closed=true;
  //
  //send tournament closed
}

function parsePlayer(pString){
  pArray=[];
  var lIndex=0;
  var pIndex=0;
  lIndex=pString.indexOf("\n");
  i=0;
  while(lIndex!=-1){
    pArray[i]=pString.substring(pIndex,lIndex);
    i++;
    pIndex=lIndex+1;
    lIndex=pString.indexOf("\n",pIndex);
  }
  end=pString.substring(pIndex);
  if(!(end=="")){
    pArray[i]=end;
  }
  return pArray;
}
function getTour(id,player,playerText,callback){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            callback(myResponse,id,player,playerText);

        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
}

function callback1(myResponse,id,player,playerText){
  document.getElementById("title").innerHTML = myResponse.data.tname;
  document.getElementById("desc").innerHTML = myResponse.data.description;
  closed=myResponse.data.closed;
  playerText=parsePlayer(myResponse.data.tempplayers);
  player= parseInt(myResponse.data.tsize)/4;
  //TODO implement tourmanet closed
  //closed=true;

  createBracket(player,playerText);
}

function createTour(){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";

  var tName = document.getElementById("tournament_name").value;
  var tDesc = document.getElementById("tournament_desc").value;
  var tCreator = "Wungus";
  var tType = 1;
  var e= document.getElementById("tournament_numP");
  var tSize = parseInt(e.options[e.selectedIndex].text);
  var tPlayers =document.getElementById("tournament_players").value;

  var mod;
  if(tName==""){
    mod=document.getElementById("modal-text");
    mod.innerHTML="Tournament Name must have some text.";
    $("#myModal").modal();
    //break;
  }
  else if(tDesc==""){
    mod=document.getElementById("modal-text");
    mod.innerHTML="Tornament Description must have some text.";
    $("#myModal").modal();
  // break;
  }

  else{
  xmlhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            playerText=parsePlayer(tPlayers);
            seed=seeding(tSize);
            size=playerText.length;
            var mtchid=[];
            for(i=0;i<tSize/2;i++){
              sd1=seed[i*2];
              sd2=seed[i*2+1];
              if(sd1<=size){
                player1=playerText[sd1-1];
              }
              else{
                player1="";
              }

              if(sd2<=size){
                player2=playerText[sd2-1];
              }
              else{
                player2="";
              }
              //add match
              var id1= await findplayer(player1)
              //search for player, if not guest player

              var id2=await findplayer(player2)
              mtchid[i]=await postMatch(myResponse.data.id,id1,id2,player1,player2)
            //document.getElementById("test").innerHTML = myResponse.data.tname;
        }
        window.location.href = "bracket.html?id="+myResponse.data.id;
      }
  };


  xmlhttp.open("POST", ourApi, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify({
    "tname":tName,
    "tcreator":tCreator,
    "ttype":tType,
    "tsize":tSize,
    "description":tDesc,
    "tempplayers":tPlayers,
    "championname":""
  })
  );
  }
}
function findplayer(player){
  return new Promise(function(resolve,reject){
  var xmlhttp = new XMLHttpRequest();
  var playerApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/username/"+player;
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if(this.status==200){
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            resolve(myResponse.data.id)
          }
          else if(this.status==400){
            resolve(258)
          }
          else[
            reject(this.status)
          ]
        }



  };
  xmlhttp.open("GET", playerApi, true);
  xmlhttp.send();
  })
}
function postMatch(tid,player1,player2,player1str,player2str){
  return new Promise(function(resolve,reject){
    var xmlhttp = new XMLHttpRequest();
    var matchApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/";
    var myResponse;
    xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              myResponse = JSON.parse(this.responseText);
              console.log(myResponse);
              resolve(myResponse.data.id);

          }
    };
    xmlhttp.open("POST", matchApi, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({//add string to matches
      "completed":false,
      "p1win":false,
      "player1":player1,
      "p1characterplayed":"None",
      "player1string":player1str,
      "p1roundswon":0,
      "player2":player2,
      "p2characterplayed":"None",
      "player2string":player2str,
      "p2roundswon":0,
      "event":tid,
      "level":1
  })
);
})
}

function seeding(numPlayers){
  var rounds = Math.log(numPlayers)/Math.log(2)-1;
  var pls = [1,2];
  for(var i=0;i<rounds;i++){
    pls = nextLayer(pls);
  }
  return pls;
  function nextLayer(pls){
    var out=[];
    var length = pls.length*2+1;
    pls.forEach(function(d){
      out.push(d);
      out.push(length-d);
    });
    return out;
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
