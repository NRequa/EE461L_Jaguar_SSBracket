$(document).ready(makeTable);


function makeTable(){
  //get number of characters
  var charNum = 0;
  for(charNum = 0; charNum<50; charNum++){
    //get name of character
    var charName = "name";

    var charWeight = "weight";

    var charSpeed = "speed";

    var spotDodge = "dodge";

    var traction = "traction";

    var newRow = $("<tr>");
    var col = "";
    col += "<td>"+charName+" "+charNum+"</td>";
    col += "<td>"+charWeight+"</td>";
    col += "<td>"+charSpeed+"</td>"
    col += "<td>"+spotDodge+"</td>"
    col += "<td>"+traction+"</td>"
    col += "</tr>";
    newRow.append(col);
    $("#charStat").append(newRow);
  }
}


function test(){
  $("#chungusTester").css({"color": "red"});
}
