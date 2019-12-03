var gNum;//used for tracking ids for each name element
var closed;//used for if the tournament is closed for
var size;//size of tournament
var id;
var mid;
var ongoing;
var editable;


async function loading(){
  logInDisplay();
  var parameters = location.search.substring(1);
  var temp = parameters.split("=");
  id = unescape(temp[1]);
  var playerText=[];
  mid=[];
  ongoing=[];
  size=[];
  editable=false;
  gNum=0;
  //for number of people in the tournament create svg attrivutes
  var player=1;//number of players;
  if(id!=null){
  await getTour(id,player,playerText,callback1);
  addVisitToTournament(id);

  }
  else{
      createBracket(player,playerText);
  }
  await setcharacter();
}

function setcharacter(){
  return new Promise(function(resolve,reject){
    var xmlhttp = new XMLHttpRequest();
    var proxyUrl = "https://cors-anywhere.herokuapp.com/"
    var ourApi = proxyUrl + "http://www.ssbracket.xyz/scrape/data";
    //var ourApi = "../../scrape/data"
    var myResponse;
    xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              myResponse = JSON.parse(this.responseText);
              var charNum = myResponse.length;
              var index;
              //https://www.dyn-web.com/tutorials/forms/select/option/
              var sel=document.getElementById("character-data");

              for(index = 0; index<(charNum); index++){
                var charName = myResponse[index].name;
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(charName));
                sel.appendChild(opt);
              }
              resolve();
            }
      }
    xmlhttp.open("GET", ourApi, true);
    xmlhttp.send();
  })
}

function addVisitToTournament(tournamentId){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/addvisit/"+tournamentId;
  //var ourApi = "http://localhost:8080/api/v1/user/113"
  var myResponse;

  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
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


function createPath(svg,midpoint1,midpoint2){//graphic path
  var p1=document.createElementNS('http://www.w3.org/2000/svg',"path");
  var y=midpoint1;
  var z=midpoint2;
  var mid=(y+z)/2
  p1.setAttributeNS(null,"d","M3 "+(y-6)+" L60 "+(y-6)+" L60 "+(mid-6)+" L95 "+(mid-6)+" L95 "+(mid+6)+" L60 "
  +(mid+6)+" L60 "+(z+6)+" L3 "+(z+6)+" L3 "+(z-6)+" L48 "+(z-6)+" L48 "+(y+6)+" L3 "+(y+6)+" Z");
  svg.appendChild(p1);
  return mid;
}

function createPeople(svg,numPMat){//graphic match individual ppl
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

function createMatch(r1,midpoint){//graphic matchbox
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

function rectClick(g_id){//change name & character/ enter score
  if(editable){
    if(document.getElementById("close-tour").style.visibility!="hidden"&&g_id<size[0]){
      var getG=document.getElementById(g_id);
      var cText=getG.childNodes[1];
      var mod=document.getElementById("modal-title");
      mod.innerHTML="Edit Player";
      mod=document.getElementById("modal-text1");
      mod.innerHTML="Enter Player Name (To edit score first close the tournament)";
      mod=document.getElementById("modal-ta1");
      mod.value="";
      mod.value=cText.innerHTML;
      mod.setAttribute("rows","1");
      mod.setAttribute("cols","50");
      mod=document.getElementsByClassName("modal-data");
      mod.innerHTML=""+g_id;
      mod=document.getElementById("modal-text2");
      mod.innerHTML="Enter Player Character";
    //  mod=document.getElementById("")
      $("#myModal").modal();
    }
    else{
      if(ongoing.includes(parseInt(g_id))){
        var intid=parseInt(g_id);
        intid=Math.floor(intid/2)*2
        var getG1=document.getElementById(intid);
        var getG2=document.getElementById(intid+1);
        var cText1=getG1.childNodes[1].innerHTML;
        var cText2=getG2.childNodes[1].innerHTML;
        var mod=document.getElementById("modal-title");
        mod.innerHTML="Enter Score ";
        mod=document.getElementById("modal-text1");
        mod.innerHTML="Enter Score for "+cText1;
        mod=document.getElementById("modal-ta1");
        mod.value="";
        mod.setAttribute("rows","1");
        mod.setAttribute("cols","5");
        mod=document.getElementsByClassName("modal-data");
        mod.innerHTML=""+g_id;
        mod=document.getElementById("modal-text2");
        mod.innerHTML="Enter Score for "+cText2;
        mod=document.getElementById("modal-ta2");
        mod.value="";
        mod.setAttribute("rows","1");
        mod.setAttribute("cols","5");
        $("#myModal").modal();
      }
    }
  }
}


function modalEnter(){
  var mod=document.getElementsByClassName("modal-data");
  var data=mod.innerHTML;
  if(document.getElementById("close-tour").style.visibility!="hidden"){
    var mod1=document.getElementById("modal-ta1");
    var mod2=document.getElementById("character-data");
    setOneName(data,mod1.value,mod2.options[mod2.selectedIndex].text);
  }
  else{
    mod=document.getElementById("modal-ta1");
    var score1=mod.value;
    mod=document.getElementById("modal-ta2");
    var score2=mod.value;
    setScore(data,score1,score2);
  }
}
async function setScore(g_id,score1,score2){
    var arrG=document.getElementsByTagName('g');
    var ret=await patchScore(mid[Math.floor(g_id/2)],score1,score2,Math.floor(g_id/2))
    window.location.reload(false);
}
function patchScore(mtchid,score1,score2,mNum){
  return new Promise(function(resolve,reject){
    var xmlhttp = new XMLHttpRequest();
    var matchId=mtchid.toString();
    var mApi="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/"+matchId;
    var myResponse;
    xmlhttp.onreadystatechange = async function() {
          if (this.readyState == 4 ) {
            if(this.status == 200){
              myResponse = JSON.parse(this.responseText);
              var counter=size[0]/2;
              var even=mNum%2;
              if(even==1){
                mNum--;
              }
              var add=counter-mNum/2;

              var nextmNum=mNum+add;
              var winner
              var winnerid
              var winnerChar
              if(myResponse.data.p1win){
                winner=myResponse.data.player1string
                winnerid=myResponse.data.player1
                winnerChar=myResponse.data.p1characterplayed
              }
              else{
                winner=myResponse.data.player2string
                winnerid=myResponse.data.player2
                winnerChar=myResponse.data.p2characterplayed
              }
              if(add<=1){
                await setWinner(winner);
                resolve(1);
              }
              var full =await findNextMatch(mid[nextmNum])
              await patchNextMatch(mid[nextmNum],winner,winnerid,winnerChar,even,full,id);
              resolve(1);
            }
            else{
              reject(0);
            }
          }
    };
    var win=false;
    if(parseInt(score1)>parseInt(score2)){
      win=true;
    }
    else if(score1==score2){
      reject(0);
    }
      xmlhttp.open("PATCH", mApi, true);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.send(JSON.stringify({
        "p1win":win,
        "p1roundswon":score1,
        "p2roundswon":score2,
        "completed":true,
        "ongoing":false
      })
      );
  })
}
function findNextMatch(mtchid){
  return new Promise(function(resolve,reject){
      var xmlhttp = new XMLHttpRequest();
      var mApi="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/"+mtchid.toString();
      var myResponse;
      xmlhttp.onreadystatechange = function() {
	    			if (this.readyState == 4 && this.status == 200) {
	        			myResponse = JSON.parse(this.responseText);
								if(myResponse.data.player1string==""&&myResponse.data.player2string==""){
                  resolve(false);
                }
                else{
                  resolve(true);
                }

	    			}
			};
      xmlhttp.open("GET", mApi, true);
  		xmlhttp.send();
  })
}
function patchNextMatch(mtchid,winner,winnerid,winnerChar,even,full,eventId){
  return new Promise(function(resolve,reject){
      var xmlhttp = new XMLHttpRequest();
      var m1Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setusers/"+mtchid.toString();
      var myResponse;
      if(winnerChar==""){
        winnerChar="None";
      }
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);

            resolve();
        }
      };
      if(even==0){
      xmlhttp.open("PATCH", m1Api, true);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.send(JSON.stringify({
        "player1":winnerid,
        "player1string":winner,
        "p1characterplayed":winnerChar,
        "ongoing":full,
        "event":eventId
      }));
      }
      else{
        xmlhttp.open("PATCH", m1Api, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify({
          "player2":winnerid,
          "player2string":winner,
          "p2characterplayed":winnerChar,
          "ongoing":full,
          "event":eventId
        }));
      }
  })
}
function setWinner(winner){
  return new Promise(function(resolve,reject){
  var xmlhttp = new XMLHttpRequest();
  var mApi="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/setChampion/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            resolve(0);
        }
  };

  xmlhttp.open("PATCH", mApi, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify({
    "championname":winner
  })
  );
  })
}
async function setOneName(g_id,text,char){
  //parsing for length of text
  //patch for matches
  var arrG=document.getElementsByTagName('g');
  arrG[g_id].childNodes[1].innerHTML=text;
  var odd
  var mcount
  if(g_id%2==0){
    odd=0
    mcount=g_id/2;
  }
  else{
    odd=1
    mcount=(g_id-1)/2;
  }
  await patchPlayer(id,mid[mcount],odd,text)
  await patchCharacter(mid[mcount],odd,char)
  window.location.reload(false);
}
function joinTour(){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            var key;
            for(key in myResponse.data.matchResults){
              if(myResponse.data.matchResults[key].player1string=="Bye"){
                await patchUserId(myResponse.data.matchResults[key].id,sessionStorage.getItem("userId"),0);
                window.location.reload(false);
              }
              else if(myResponse.data.matchResults[key].player2string=="Bye"){
                await patchUserId(myResponse.data.matchResults[key].id,sessionStorage.getItem("userId"),1);
                window.location.reload(false);
              }
            }
          }
        }
    xmlhttp.open("GET", ourApi, true);
    xmlhttp.send();
}
function patchUserId(mtid,pid,even){
  return new Promise(function(resolve,reject){
    var xmlhttp = new XMLHttpRequest();
    var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/"+pid;
    var myResponse;
    xmlhttp.onreadystatechange = async function() {
          if (this.readyState == 4 ) {
            if(this.status == 200){
              myResponse = JSON.parse(this.responseText);
              var full= await findNextMatch(mtid);
              await patchNextMatch(mtid,myResponse.data.username,myResponse.data.id,"",even,full,id)
              resolve();
              }
              else{
                reject();
              }
            }
        }
        xmlhttp.open("GET", ourApi, true);
        xmlhttp.send();
  });
}
function patchPlayer(tourid,mtchid,playernum,playertext){
  return new Promise(function(resolve,reject){
  var xmlhttp = new XMLHttpRequest();
  var matchId=mtchid;
  var p1Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setp1string/"+mtchid;
  var p2Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setp2string/"+mtchid;
  var myReponse;
  if(playertext==""){
    playertext="Bye";
  }
  else if(playertext=="nullzeroplayer"){
    playertext="";
  }
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resolve();
        }
  };
  if(playernum==0){
    xmlhttp.open("PATCH", p1Api, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({
      "player1string":playertext
    })
    );
  }
  else{
    xmlhttp.open("PATCH", p2Api, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({
      "player2string":playertext
    })
    );
  }
  })
}
function patchCharacter(mtchid,playernum,chartext){
  return new Promise(function(resolve,reject){
  var xmlhttp = new XMLHttpRequest();
  var matchId=mtchid;
  var p1Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setcharacters/"+mtchid;
  var p2Api="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/match/setcharacters/"+mtchid;
  var myReponse;
  if(chartext==""){
    chartext="None";
  }
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resolve();
        }
  };
  if(playernum==0){
    xmlhttp.open("PATCH", p1Api, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({
      "p1characterplayed":chartext
    })
    );
  }
  else{
    xmlhttp.open("PATCH", p1Api, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({
      "p2characterplayed":chartext
    })
    );
  }
  })
}

function setName(pArray,player){
  var xmlhttp = new XMLHttpRequest();
  //var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/113";
  var ourApi ="http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            var arrG=document.getElementsByTagName('g');
            var key;
            var i=0;
            var ongoingindex=0;
            for(key in myResponse.data.matchResults){
              mid[i/2]=myResponse.data.matchResults[key].id;
              //cutNames

                var str=myResponse.data.matchResults[key].player1string;
                arrG[i].childNodes[1].innerHTML=str
                if(str=="Bye"){
                    arrG[i].childNodes[0].style.fill="#C0392B"
                    arrG[i].childNodes[2].style.fill="#C0392B"
                    arrG[i].childNodes[1].style.fill="#E74C3C"
                    arrG[i].childNodes[3].style.fill="#E74C3C"
                }

                if(myResponse.data.matchResults[key].completed==true){
                  arrG[i].childNodes[3].innerHTML=myResponse.data.matchResults[key].p1roundswon;
                  if(myResponse.data.matchResults[key].p1win!=true){
                    arrG[i].childNodes[0].style.fill="#C0392B"
                    arrG[i].childNodes[2].style.fill="#C0392B"
                  }
                }
                i++;
                //set score of the stuff
                //change color if bye
                str=myResponse.data.matchResults[key].player2string;
                arrG[i].childNodes[1].innerHTML=str
                if(str=="Bye"){
                  arrG[i].childNodes[0].style.fill="#C0392B"
                  arrG[i].childNodes[2].style.fill="#C0392B"
                  arrG[i].childNodes[1].style.fill="#E74C3C"
                  arrG[i].childNodes[3].style.fill="#E74C3C"
                }

                if(myResponse.data.matchResults[key].completed==true){
                  arrG[i].childNodes[3].innerHTML=myResponse.data.matchResults[key].p2roundswon;
                  if(myResponse.data.matchResults[key].p1win==true){
                    arrG[i].childNodes[0].style.fill="#C0392B"
                    arrG[i].childNodes[2].style.fill="#C0392B"
                  }
                }
                i++;
                if(myResponse.data.matchResults[key].ongoing==true){
                  ongoing[ongoingindex]=i-2
                  ongoingindex++
                  ongoing[ongoingindex]=i-1
                  ongoingindex++
                }
            }
        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();


}

function closeTour(){
  closed=true;
  //patch tournament closed
  //send tournament closed
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/close/"+id;
  var myResponse;
  //make matches good<--done in the backend
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            window.location.reload(false);
        }
  };

  xmlhttp.open("PATCH", ourApi, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify({
    "closed":true
  })
  );

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
  return new Promise(function(resolve,reject){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/"+id;
  var myResponse;
  xmlhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            callback(myResponse,id,player,playerText);
            size[0]=myResponse.data.tsize;
            editable=(myResponse.data.tcreator==sessionStorage.getItem("userId"))
            if(editable){
              document.getElementById("add-tour").style.visibility="hidden";
            }
            else{
              document.getElementById("close-tour").style.visibility="hidden";
            }

            if(myResponse.data.championname==""){
              document.getElementById("ch1").style.visibility="hidden";
              document.getElementById("ch2").style.visibility="hidden";
            }
            else{
              document.getElementById("ch2").innerHTML=(myResponse.data.championname+"!");
            }
            document.getElementById("creator").innerHTML=await getUserName(myResponse.data.tcreator);
            resolve();
        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
  })
}

function callback1(myResponse,id,player,playerText){
  document.getElementById("title").innerHTML = myResponse.data.tname;
  document.getElementById("desc").innerHTML = myResponse.data.description;
  playerText=parsePlayer(myResponse.data.tempplayers);
  player= parseInt(myResponse.data.tsize)/4;

  twttr.widgets.createTimeline(
  {
    sourceType:"profile",
    screenName:myResponse.data.twitter
  },
  document.getElementById("twittertimeline")
  );
  //TODO implement tourmanet closed
  if(myResponse.data.closed){
    document.getElementById("close-tour").style.visibility="hidden";
    document.getElementById("add-tour").style.visibility="hidden";
    document.getElementById("character-data").style.visibility="hidden";
    closed=true;
  }
  else{
    document.getElementById("modal-ta2").style.display="none";
  }

  createBracket(player,playerText);
}
function getUserName(id){
  return new Promise(function(resolve,reject){
    var xmlhttp = new XMLHttpRequest();
    var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/user/"+id;
    var myResponse;
    xmlhttp.onreadystatechange = async function() {
          if (this.readyState == 4 && this.status == 200) {
              myResponse = JSON.parse(this.responseText);
              resolve(myResponse.data.username);
            }
          }
      xmlhttp.open("GET", ourApi, true);
      xmlhttp.send();
  })
}
function createTour(){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";

  var tName = document.getElementById("tournament_name").value;
  var tDesc = document.getElementById("tournament_desc").value;
  var tCreator = sessionStorage.getItem("userId").toString();
  var tType = 1;
  var e= document.getElementById("tournament_numP");
  var tSize = parseInt(e.options[e.selectedIndex].text);
  var tPlayers =document.getElementById("tournament_players").value;
  var account=document.getElementById("tournament_ht").value;
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
    "championname":"",
    "twitter":account
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
            resolve(myResponse.data.id)
          }
          else if(this.status==400){
            resolve(17)
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




function logInDisplay(){
  if(sessionStorage.getItem("userId") != null && sessionStorage.getItem("userId") != "null"){
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
