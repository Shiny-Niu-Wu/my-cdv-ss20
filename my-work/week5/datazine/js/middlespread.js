//two pages wide
let w = 1200 * 2;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "viz")
    .style("background-color", "black")
;

viz.append("text")
    .text("<20200206-0303>")
      .attr("x", w - 190)
      .attr("y", h - 20)
      .style("fill", "white")
      .style("font-size", 20)
      .style("font-family", "Helvetica")
;

function gotData(incomingData){
  console.log("data loaded");

//get unique values of emotions and for each assign a color
//these unique values will also go into back.js
  //first I am getting the unique values
  let familyEmotionsData = [...new Set(incomingData.map(d => d.whatemotion))];
  console.log(familyEmotionsData);

  //second I am scaling the range of the values to a range of colors
  //ordinalScale inout domain is an array of all possible emotions ["Noidea.", "meh.", "wqdnoqw"];
  let familyEmotionsColorScale = d3.scaleOrdinal(  d3.schemePaired  ).domain( familyEmotionsData );
  //console.log(familyEmotionsColorScale(familyEmotionsData[0]));

  let myEmotionsData = [...new Set(incomingData.map(d => d.myemotion))];
  console.log(myEmotionsData);

  let myEmotionsColorScale = d3.scaleOrdinal(  d3.schemePaired  ).domain( myEmotionsData );
  //console.log(familyEmotionsColorScale(myEmotionsData[0]));

  let eyeGroups = viz.selectAll(".eyeGroup").data(incomingData).enter()
    .append("g")
      .attr("class", "eyeGroup")
      .attr("transform", positionGroup)
  ;

  let lash1 = eyeGroups
    .append("line")
      .attr("x1", 0)
      .attr("y1", 40)
      .attr("x2", 0)
      .attr("y2", -40)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", eyeContactTime)
      .style("stroke-dashoffset", 3)
  ;

  let lash2_1 = eyeGroups
    .append("line")
      .attr("x1", 13)
      .attr("y1", 37)
      .attr("x2", -13)
      .attr("y2", -37)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", eyeContactTime)
      .style("stroke-dashoffset", 3)
  ;

  let lash2_2 = eyeGroups
    .append("line")
      .attr("x1", -13)
      .attr("y1", 37)
      .attr("x2", 13)
      .attr("y2", -37)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", eyeContactTime)
      .style("stroke-dashoffset", 3)
  ;

  let lash3_1 = eyeGroups
    .append("line")
      .attr("x1", 25)
      .attr("y1", 30)
      .attr("x2", -25)
      .attr("y2", -30)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", eyeContactTime)
      .style("stroke-dashoffset", 3)
  ;

  let lash3_2 = eyeGroups
    .append("line")
      .attr("x1", -25)
      .attr("y1", 30)
      .attr("x2", 25)
      .attr("y2", -30)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", eyeContactTime)
      .style("stroke-dashoffset", 3)
  ;

  let eyes = eyeGroups
    .append("circle")
      .attr("id", (d, i) => d.no)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 20)
      .style("stroke", getDayTime)
      .style("stroke-width", 10)
      .style("fill", getPerson)
  ;

  let conversations = eyeGroups
    .append("text")
      .text(getConvoLength)
      .attr("x", 0)
      .attr("y", 80)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", 20)
      .style("font-family", "Helvetica")
  ;

  //familyEmotionsData[0] = "No idea."
  //familyEmotionsData[9] = "Can't recall."
  function getFamilyEmotionPath(d, i){
    let emotion = d.whatemotion;
    if (emotion === familyEmotionsData[0] || emotion === familyEmotionsData[9]) {
      return "M -25 -40 q 25 -20 50 0"
    } else {
      return "M -25 -35 L 0 -55 L 25 -35"
    }
  }

  //NEXT:
  //there must be a more elegant way to match the values and assign colors...
  function getFamilyEmotionColor(d, i){
    let emotion = d.whatemotion;
    //let randomColor = Math.floor(Math.random()*16777215).toString(16);
    //no color for [0] & [9]
    if (emotion === familyEmotionsData[0] || emotion === familyEmotionsData[9]) {
      return "white"
    } else if (emotion === familyEmotionsData[1]) {
      return familyEmotionsColorScale(familyEmotionsData[1])
    } else if (emotion === familyEmotionsData[2]) {
      return familyEmotionsColorScale(familyEmotionsData[2])
    } else if (emotion === familyEmotionsData[3]) {
      return familyEmotionsColorScale(familyEmotionsData[3])
    } else if (emotion === familyEmotionsData[4]) {
      return familyEmotionsColorScale(familyEmotionsData[4])
    } else if (emotion === familyEmotionsData[5]) {
      return familyEmotionsColorScale(familyEmotionsData[5])
    } else if (emotion === familyEmotionsData[6]) {
      return familyEmotionsColorScale(familyEmotionsData[6])
    } else if (emotion === familyEmotionsData[7]) {
      return familyEmotionsColorScale(familyEmotionsData[7])
    } else if (emotion === familyEmotionsData[8]) {
      return familyEmotionsColorScale(familyEmotionsData[8])
    } else if (emotion === familyEmotionsData[10]) {
      return familyEmotionsColorScale(familyEmotionsData[10])
    } else if (emotion === familyEmotionsData[11]) {
      return familyEmotionsColorScale(familyEmotionsData[11])
    } else if (emotion === familyEmotionsData[12]) {
      return familyEmotionsColorScale(familyEmotionsData[12])
    } else {
      return familyEmotionsColorScale(familyEmotionsData[13])
    }
  }

  let familyEmotions = eyeGroups
    .append("path")
      .attr("d", getFamilyEmotionPath)
      .attr("fill", "none")
      .style("stroke", getFamilyEmotionColor)
      .style("stroke-width", 2.5)
  ;

  //myEmotionsData[0] = "Nothing particular."
  function getMyEmotionPath(d, i){
    let emotion = d.myemotion;
    if (emotion === myEmotionsData[0]) {
      return "M -25 40 q 25 20 50 0"
    } else {
      return "M -25 35 L 0 55 L 25 35"
    }
  }

  function getMyEmotionColor(d, i){
    let emotion = d.myemotion;
    //let randomColor = Math.floor(Math.random()*16777215).toString(16);
    if (emotion === myEmotionsData[0]) {
      return "white"
    } else if (emotion === myEmotionsData[1]) {
      return myEmotionsColorScale(myEmotionsData[1])
    } else if (emotion === myEmotionsData[2]) {
      return myEmotionsColorScale(myEmotionsData[2])
    } else if (emotion === myEmotionsData[3]) {
      return myEmotionsColorScale(myEmotionsData[3])
    } else if (emotion === myEmotionsData[4]) {
      return myEmotionsColorScale(myEmotionsData[4])
    } else if (emotion === myEmotionsData[5]) {
      return myEmotionsColorScale(myEmotionsData[5])
    } else if (emotion === myEmotionsData[6]) {
      return myEmotionsColorScale(myEmotionsData[6])
    } else if (emotion === myEmotionsData[7]) {
      return myEmotionsColorScale(myEmotionsData[7])
    } else if (emotion === myEmotionsData[8]) {
      return myEmotionsColorScale(myEmotionsData[8])
    } else if (emotion === myEmotionsData[9]) {
      return myEmotionsColorScale(myEmotionsData[9])
    } else if (emotion === myEmotionsData[10]) {
      return myEmotionsColorScale(myEmotionsData[10])
    } else if (emotion === myEmotionsData[11]) {
      return myEmotionsColorScale(myEmotionsData[11])
    } else {
      return myEmotionsColorScale(myEmotionsData[12])
    }
  }

  let myEmotions = eyeGroups
    .append("path")
      .attr("d", getMyEmotionPath)
      .attr("fill", "none")
      .style("stroke", getMyEmotionColor)
      .style("stroke-width", 2.5)
  ;
}

//24 circles each line
//5 lines in total
//remember: i starts from zero, but d.no starts from 1
function positionGroup(d, i){
  let x;
  let y;
  if ((i+1) <= 24) {
    x = i * 100 + 50;
    y = h * 0.08;
  } else if ((i+1) <= (24*2)) {
    x = (i - 24*1) * 100 + 50;
    y = h * 0.28;
  } else if ((i+1) <= (24*3)) {
    x = (i - 24*2) * 100 + 50;
    y = h * 0.48;
  } else if ((i+1) <= (24*4)) {
    x = (i - 24*3) * 100 + 50;
    y = h * 0.68;
  } else {
    x = (i - 24*4) * 100 + 50;
    y = h * 0.88;
  }
  return "translate("+ x +", "+ y +")"
}

function eyeContactTime(d, i){
  let duration = d.howlongeyecontact;
  if (duration === "Less than 1 second") {
    return "2 5"
  } else if (duration === "1-3 seconds") {
    return "6 5"
  } else if (duration === "More than 3 seconds") {
    return "5 0"
  }
}

//virtual call eye in green; otherwise, eye contact in daytime or nighttime affects the color of eyes
function getDayTime(d, i){
  //tidy up the original time code from JSON to regular, readable time
  let time = d.whentime;
  let timeObject = new Date(time);
  let hour = timeObject.getHours();
  let where = d.where;
  if (where === "Virtual Call") {
    return "green"
  } else {
    if (hour >= 6 && hour <= 11) {
      return "#FFC408"
    } else if (hour >= 12 && hour <= 17) {
      return "#F05E1C"
    } else if (hour >= 18 && hour <= 24) {
      return "#113285"
    } else {
      return "#08192D"
    }
  }
}

function getPerson(d, i){
  if (d.who === "mom") {
    return "#d62d20"
  } else if (d.who === "dad") {
    return "#0057e7"
  } else if (d.who === "brother") {
    return "#008744"
  } else if (d.who === "sister") {
    return "#dee1e6"
  } else if (d.who === "popo") {
    return "#ffa700"
  }
}

function getConvoLength(d, i){
  //code following https://stackoverflow.com/questions/20396456/how-to-do-word-counts-for-a-mixture-of-english-and-chinese-in-javascript
  let conversation = d.whattalk;

  let where = d.where;
  // fix problem in special characters such as middle-dot, etc.
  conversation = conversation.replace(/[\u007F-\u00FE]/g,' ');

  // make a duplicate first...
  let conversation1 = conversation;
  let conversation2 = conversation;

  // the following remove all chinese characters and then count the number of english characters in the string
  conversation1 = conversation1.replace(/[^!-~\d\s]+/gi,' ')

  // the following remove all english characters and then count the number of chinese characters in the string
  conversation2 = conversation2.replace(/[!-~\d\s]+/gi,'')

  let matches1 = conversation1.match(/[\u00ff-\uffff]|\S+/g);
  let matches2 = conversation2.match(/[\u00ff-\uffff]|\S+/g);

  count1 = matches1 ? matches1.length : 0;
  count2 = matches2 ? matches2.length : 0;

  //return the total of the mixture
  //virtual call is actually longer than just "(Everything)"
  if (where === "Virtual Call") {
    return (count1 + count2) * 1000
  } else {
    return (count1 + count2)
  }
}

d3.json("data.json").then(gotData);
