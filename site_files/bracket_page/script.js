function loading(){
  //for number of people in the tournament create svg attrivutes
  var bBox=document.getElementById("bracketbox");
  var player=16;//number of players;
  var pRound=player;
  bBox.setAttribute("style","height: "+(136*player+5)+"px")
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
    pg1.setAttribute("onclick","rectClick()");
    var pr1=document.createElementNS('http://www.w3.org/2000/svg',"rect");
    pr1.setAttribute("x","50");
    pr1.setAttribute("y",""+(2+31*i));
    pr1.setAttribute("width","143");
    pr1.setAttribute("height","28");
    pr1.setAttribute("class","p-contain");


    var pt1=document.createElementNS('http://www.w3.org/2000/svg',"text");
    pt1.setAttribute("x","50");
    pt1.setAttribute("y",""+(20+30*i));
    pt1.setAttribute("font-family","Verdana");
    pt1.setAttribute("font-size","15");
    pt1.setAttribute("fill","blue");
    pt1.setAttribute("class","p-text");
    pt1.innerHTML='Player'+(j*2+p*4+i);


    pg1.appendChild(pr1);
    pg1.appendChild(pt1);
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
function rectClick(){
  console.log("clicked");
}
