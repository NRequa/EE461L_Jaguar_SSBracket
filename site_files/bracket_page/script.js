function loading(){
  //for number of people in the tournament create svg attrivutes
  var bBox=document.getElementById("bracketbox");

  //loop according to number of rounds
  var node=document.createElement("DIV");
  var att = document.createAttribute("class");
  att.value="col-sm-4";
  node.setAttributeNode(att);
  bBox.appendChild(node);
  //http://xahlee.info/js/js_scritping_svg_basics.html
  var r1=document.createElementNS('http://www.w3.org/2000/svg','svg');
  r1.setAttribute("width","300");
  r1.setAttribute("height",""+(110*10+5));//make the height scale
  for(p=0;p<10;p++){
    //loop according to number of players/2
    for(j=0;j<2;j++){
      var m1=document.createElementNS('http://www.w3.org/2000/svg','svg');
      m1.setAttribute("x","0");//SCALE
      m1.setAttribute("y",""+(5+55*(j+p*2)));//SCALE
      m1.setAttribute("width","200");
      m1.setAttribute("height","50");
      m1.setAttribute("style","background-color:green");

      var mr1=document.createElementNS('http://www.w3.org/2000/svg',"rect");
      mr1.setAttribute("x","0");
      mr1.setAttribute("y","0");
      mr1.setAttribute("width","200");
      mr1.setAttribute("height","50");
      mr1.setAttribute("class","m-contain");
      m1.appendChild(mr1);

      for(i=0;i<2;i++){
        var pg1=document.createElementNS('http://www.w3.org/2000/svg',"g");
        var pr1=document.createElementNS('http://www.w3.org/2000/svg',"rect");
        pr1.setAttribute("x","50");
        pr1.setAttribute("y",""+(2+25*i));
        pr1.setAttribute("width","143");
        pr1.setAttribute("height","21");
        pr1.setAttribute("class","p-contain");
        var pt1=document.createElementNS('http://www.w3.org/2000/svg',"text");
        pt1.setAttribute("x","50");
        pt1.setAttribute("y",""+(20+25*i));
        pt1.setAttribute("font-family","Verdana");
        pt1.setAttribute("font-size","15");
        pt1.setAttribute("fill","blue");
        pt1.innerHTML='Hello';
        pg1.appendChild(pr1);
        pg1.appendChild(pt1);
        m1.appendChild(pg1);
      }
      r1.appendChild(m1);
    }
    var ps1=document.createElementNS('http://www.w3.org/2000/svg',"svg");
    ps1.setAttribute("x","200");
    ps1.setAttribute("y",""+(0+110*p));
    ps1.setAttribute("width","100");
    ps1.setAttribute("height","110");
    var p1=document.createElementNS('http://www.w3.org/2000/svg',"path");
    var y=0;
    p1.setAttributeNS(null,"d","M3 "+(y+24)+" L60 "+(y+24)+" L60 "+(y+52)+" L95 "+(y+52)+" L95 "+(y+63)+" L60 "+(y+63)+" L60 "+(y+91)+" L3 "+(y+91)+" L3 "+(y+79)+" L48 "+(y+79)+" L48 "+(y+36)+" L3 "+(y+36)+" Z");
    ps1.appendChild(p1);
    r1.appendChild(ps1);
  }

  node.appendChild(r1);





}
{
  const f=(()=>{
    var p1=document.createElementNS('http://www.w3.org/2000/svg','path')
    var svg=svgObject.getElementById('t-svg');
    var y=110;
    p1.setAttributeNS(null,"d","M3 "+(y+24)+" L60 "+(y+24)+" L60 "+(y+52)+" L95 "+(y+52)+" L95 "+(y+63)+" L60 "+(y+63)+" L60 "+(y+91)+" L3 "+(y+91)+" L3 "+(y+79)+" L48 "+(y+79)+" L48 "+(y+36)+" L3 "+(y+36)+" Z");
    svg.appendChild(p1);
  });
}
