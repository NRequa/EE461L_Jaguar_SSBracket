var gNum;//used for tracking ids for each name element
var closed;//used for if the tournament is closed for

function loading(){
  var parameters = location.search.substring(1);
  var temp = parameters.split("=");
  var id = unescape(temp[1]);
  var playerText=[];
  gNum=0;
  //for number of people in the tournament create svg attrivutes
  var player=1;//number of players;
  if(id!=null){
    console.log(getTour(id,player,playerText,callback1));

    }
    else{
        createBracket(player,playerText);
    }
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
    pt1.innerHTML='Player'+(j*2+p*4+i);
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

  if(closed=false){
  var getG=document.getElementById(g_id);
  var cText=getG.childNodes[1];
  var mod=document.getElementById("modal-title");
  mod.innerHTML="Edit Player";
  mod=document.getElementById("modal-text");
  mod.innerHTML="Enter Player Name (To edit score first close the tournament)";
  mod=document.getElementById("modal-ta");
  mod.value="";
  console.log(g_id);
  console.log(cText.innerHTML);
  mod.value=cText.innerHTML;
  mod.setAttribute("rows","1");
  mod.setAttribute("cols","50");
  mod=document.getElementsByClassName("modal-data");
  mod.innerHTML=""+g_id;
  $("#myModal").modal();
  }
  else{
    //TODO change stuff
  }
}


function modalEnter(){
  var mod=document.getElementsByClassName("modal-data");
  var data=mod.innerHTML;
  mod=document.getElementById("modal-ta");
  setOneName(data,mod.value);

}
function setOneName(id,text){
  //parsing for length of text
  var arrG=document.getElementsByTagName('g');
  arrG[id].childNodes[1].innerHTML=text;
}
function setName(pArray,player){
  var arrG=document.getElementsByTagName('g');
  for(i=0;i<arrG.length;i++){
    //cutNames
    if(i<pArray.length){
      arrG[i].childNodes[1].innerHTML=pArray[i];
    }
    else if(i<player*4){
      arrG[i].childNodes[1].innerHTML="Bye";//implement proper bye
    }
    else {
      arrG[i].childNodes[1].innerHTML="";
    }
  }
}

function closeTour(){
  //seteditable rectClick==match
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
            callback(myResponse,player,playerText);

        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
}
function callback1(myResponse,player,playerText){
  document.getElementById("title").innerHTML = myResponse.data.tname;
  document.getElementById("desc").innerHTML = myResponse.data.description;
  playerText=parsePlayer(myResponse.data.tempplayers);
  player= parseInt(myResponse.data.tsize)/4;
  //TODO implement tourmanet closed
  //closed=true;
  createBracket(player,playerText);
}

function createTour(){
  var xmlhttp = new XMLHttpRequest();
  var ourApi = "http://ssbracket.us-east-2.elasticbeanstalk.com/api/v1/tournament/";
  var myResponse;
  var tName = document.getElementById("tournament_name").value;
  var tDesc = document.getElementById("tournament_desc").value;
  var tCreator = "Wungus";
  var tType = 1;
  var tSize = parseInt(document.getElementById("tournament_numP").value);
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
  else if(tSize!='4'&&tSize!= '8'&&tSize!= '16'&&tSize!= '32'&&tSize!= '64'&&tSize!= '128'&&tSize!= '256'){
    mod=document.getElementById("modal-text");
    mod.innerHTML="Invalid player size";
    $("#myModal").modal();
  //  break;
  }
  else{
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            window.location.href = "bracket.html?id="+myResponse.data.id;
            //document.getElementById("test").innerHTML = myResponse.data.tname;
        }
  };
  playerText=parsePlayer(tPlayers);
  seed=seeding(tSize);
  size=playerText.length;
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

  }

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
  //document.getElementById("test").style.color = "red";
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
}
