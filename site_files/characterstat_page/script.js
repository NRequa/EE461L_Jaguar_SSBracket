$(document).ready(makeTable);


function makeTable(){
  //get number of characters
  var charNum = 0;
  for(charNum = 0; charNum<50; charNum++){
    //get name of character
    var charName = "name";
    //get character weight
    var charWeight = "weight";
    //get character speed
    var charSpeed = "speed";
    var newRow = $("<tr>");
    var col = "";
    col += "<td>"+charName+" "+charNum+"</td>";
    col += "<td>"+charWeight+"</td>";
    col += "<td>"+charSpeed+"</td>"
    col += "</tr>";
    newRow.append(col);
    $("#charStat").append(newRow);
  }
}


function test(){
  $("#chungusTester").css({"color": "red"});
}
