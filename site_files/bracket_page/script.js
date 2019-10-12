{
  const f=(()=>{
    var p1=document.createElementNS('http://www.w3.org/2000/svg','path')
    var svg=svgObject.getElementById('t-svg');
    var y=110;
    p1.setAttributeNS(null,"d","M3 "+(y+24)+" L60 "+(y+24)+" L60 "+(y+52)+" L95 "+(y+52)+" L95 "+(y+63)+" L60 "+(y+63)+" L60 "+(y+91)+" L3 "+(y+91)+" L3 "+(y+79)+" L48 "+(y+79)+" L48 "+(y+36)+" L3 "+(y+36)+" Z");
    svg.appendChild(p1);
  });
}
