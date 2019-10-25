$(document).ready(makeTable);


function makeTable(){
  //get number of characters
  var xmlhttp = new XMLHttpRequest();
  var proxyUrl = "https://cors-anywhere.herokuapp.com/"
  var ourApi = "http://www.ssbracket.xyz/scrape/data";
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse)
            var charNum = myResponse.length;
            var index = 0;
            for(index = 0; index<(charNum); index++){
              //get name of character
              var charName = "name";

              var charWeight = "weight";

              var charSpeed = "speed";

              var spotDodge = "dodge";

              var traction = "traction";

              var newRow = $("<tr>");
              var col = "";
              col += "<td>"+myResponse[index].name+"</td>";
              col += "<td>"+myResponse[index].tweight+"</td>";
              col += "<td>"+myResponse[index].tdash+"</td>"
              col += "<td>"+myResponse[index].tspotdodge+"</td>"
              col += "<td>"+myResponse[index].ttraction+"</td>"
              col += "</tr>";
              newRow.append(col);
              $("#charStat").append(newRow);
            }
        }
  };
  xmlhttp.open("GET", proxyUrl+ourApi, true);
  xmlhttp.send();
}
