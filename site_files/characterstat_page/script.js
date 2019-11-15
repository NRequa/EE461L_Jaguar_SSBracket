$(document).ready(init);

function init(){
  handleCharacterData();
  handleProData();
}

function handleCharacterData(){
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

              var charWeight = myResponse[index].tweight;

              var charSpeed = myResponse[index].tdash;

              var spotDodge = myResponse[index].tspotdodge;

              var traction = myResponse[index].ttraction;

              var winlossratio = myResponse[index].twins +"/" + myResponse[index].tlosses;

              var newRow = $("<tr>");
              var col = "";
              col += "<td>"+charName+"</td>";
              col += "<td>"+charWeight+"</td>";
              col += "<td>"+charSpeed+"</td>";
              col += "<td>"+spotDodge+"</td>";
              col += "<td>"+traction+"</td>";
              col += "<td>"+winlossratio+"</td>"
              col += "</tr>";
              newRow.append(col);
              $("#charStat").append(newRow);
            }
        }
  };
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
}

function handleProData(){
  var xmlhttp = new XMLHttpRequest();
  var proxyUrl = "https://cors-anywhere.herokuapp.com/"
  var ourApi = proxyUrl + "http://www.ssbracket.xyz/scrape/prodata";
  //var ourApi = "../../scrape/data"
  var myResponse;
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            populateChartAndTable(myResponse);
            }
  }
  xmlhttp.open("GET", ourApi, true);
  xmlhttp.send();
}

function addToObject(myObject, nameKey){
  if(nameKey=="None Listed"){
    return myObject;
  }
  if(myObject[nameKey]==null){
    myObject[nameKey]=1;
  } else {
    myObject[nameKey]=myObject[nameKey]+1;
  }
  return myObject;
}

function populateChartAndTable(myResponse){
  var characterPlayed = new Object();
  var nationality = new Object();
  for(var proPlayerIndex in myResponse){
    var proPlayer = myResponse[proPlayerIndex];
    characterPlayed = addToObject(characterPlayed, proPlayer.char1);
    characterPlayed = addToObject(characterPlayed, proPlayer.char2);
    characterPlayed = addToObject(characterPlayed, proPlayer.char3);
    characterPlayed = addToObject(characterPlayed, proPlayer.char4);
    nationality = addToObject(nationality, proPlayer.nationality);
  }
  var characters = [];
  var timesPlayed = [];
  var color = [];
  var border = [];
  for(var charTimesPlayed in characterPlayed){
    var red = Math.floor(Math.random() * 200) + 10;
    var green = Math.floor(Math.random() * 200) + 10;
    var blue = Math.floor(Math.random() * 200) + 10;
    color.push("rgba("+red+","+green+","+blue+","+0.2+")");
    border.push("rgba(1,1,1,1)");
    characters.push(charTimesPlayed);
    timesPlayed.push(characterPlayed[charTimesPlayed]);
  }
  var ctx = document.getElementById("usageChart").getContext('2d');
  var label1 = '# of Notable Players (Ranked by Panda Global Rankings) That Use Character';
  populateChartHelper(characters, timesPlayed, color, border, label1, ctx);
  var nation = [];
  var numberOfNationality = [];
  var color2 = [];
  var border2 = [];
  for(var playerNation in nationality){
    var red = Math.floor(Math.random() * 200) + 10;
    var green = Math.floor(Math.random() * 200) + 10;
    var blue = Math.floor(Math.random() * 200) + 10;
    color2.push("rgba("+red+","+green+","+blue+","+0.2+")");
    border2.push("rgba(1,1,1,1)");
    nation.push(playerNation);
    numberOfNationality.push(nationality[playerNation]);
  }
  ctx = document.getElementById("nationalityChart").getContext('2d');
  label2 = "# of Notable Players (Ranked by Panda Global Rankings) By Nation";
  populateChartHelper(nation,numberOfNationality,color2,border2,label2, ctx);
}

function populateChartHelper(labelArray, dataArray, backgroundArray, borderArray, labelString, ctx){
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelArray,
    datasets: [{
      label: labelString,
      data: dataArray,
      backgroundColor: backgroundArray,
      borderColor: borderArray,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  });
}
