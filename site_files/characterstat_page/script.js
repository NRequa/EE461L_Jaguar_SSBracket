$(document).ready(makeTable);


function makeTable(){
  //get number of characters
  var xmlhttp = new XMLHttpRequest();
  var proxyUrl = "https://cors-anywhere.herokuapp.com/"
  var ourApi = proxyUrl + "http://www.ssbracket.xyz/scrape/data";
  //var ourApi = "../../scrape/data"
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            var charNum = myResponse.length;
            var index = 0;
            for(index = 0; index<(charNum); index++){
              //get name of character
              var charName = myResponse[index].name;
              if(charName==undefined){
                charName = "N/A";
              }

              var charWeight = myResponse[index].tweight;
              if(charWeight==undefined){
                charWeight = "N/A";
              }

              var charSpeed = myResponse[index].tdash;
              if(charSpeed==undefined){
                charSpeed = "N/A";
              }

              var spotDodge = myResponse[index].tspotdodge;
              if(spotDodge==undefined){
                spotDodge = "N/A";
              }

              var traction = myResponse[index].ttraction;
              if(traction==undefined){
                traction = "N/A";
              }

              var newRow = $("<tr>");
              var col = "";
              col += "<td>"+charName+"</td>";
              col += "<td>"+charWeight+"</td>";
              col += "<td>"+charSpeed+"</td>"
              col += "<td>"+spotDodge+"</td>"
              col += "<td>"+traction+"</td>"
              col += "</tr>";
              newRow.append(col);
              $("#charStat").append(newRow);
            }
        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
}
