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

function gotData(incomingData){
  console.log("data loaded");

  let eyeGroups = viz.selectAll(".eyeGroup").data(incomingData).enter()
    .append("g")
      .attr("class", "eyeGroup")
  ;

  let lashGroups = eyeGroups
    .append("g")
      .attr("class", "lashGroup")
  ;

//NEXT:
//see if there is a better way to draw X lashes
  //if eye contact <1s, only dash 1
  //if eye contact 1-3s, add dash 2_1 & 2_2
  //if eye contact >3s, add dash 3_1 & 3_2
  let lash1 = lashGroups
    .append("line")
      .attr("x1", 0)
      .attr("y1", 40)
      .attr("x2", 0)
      .attr("y2", -40)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
  ;

  let lashGroup2 = lashGroups
    .append("g")
      .attr("class", "lashGroup2")
  ;

  let lash2_1 = lashGroup2
    .append("line")
      .attr("x1", 13)
      .attr("y1", 37)
      .attr("x2", -13)
      .attr("y2", -37)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
  ;

  let lash2_2 = lashGroup2
    .append("line")
      .attr("x1", -13)
      .attr("y1", 37)
      .attr("x2", 13)
      .attr("y2", -37)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
  ;

  let lashGroup3 = lashGroups
    .append("g")
      .attr("class", "lashGroup3")
  ;

  let lash3_1 = lashGroup3
    .append("line")
      .attr("x1", 25)
      .attr("y1", 30)
      .attr("x2", -25)
      .attr("y2", -30)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
  ;

  let lash3_2 = lashGroup3
    .append("line")
      .attr("x1", -25)
      .attr("y1", 30)
      .attr("x2", 25)
      .attr("y2", -30)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
  ;

  let eyes = eyeGroups
    .append("circle")
      .attr("id", getID)
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
      //.attr("x", fixedTextXPos)
      .attr("x", -10)
      .attr("y", 80)
      .style("fill", "white")
      .style("font-size", 20)
      .style("font-family", "Helvetica")
  ;

  let familyEmotions = eyeGroups
    .append("path")
      .attr("d", getFamilyEmotionPath)
      .attr("fill", "none")
      .style("stroke", getFamilyEmotionColor)
      .style("stroke-width", 2.5)
  ;

  let myEmotions = eyeGroups
    .append("path")
      .attr("d", getMyEmotionPath)
      .attr("fill", "none")
      .style("stroke", getMyEmotionColor)
      .style("stroke-width", 2.5)
  ;

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
  eyeGroups.attr("transform", positionGroup);
}

function getID(d, i){
  return d.no
}

//CONSIDER:
//when applying colors, scale and map the time range
//virtual call eye in green; otherwise, eye contact in daytime or nighttime affects the color of eyes
function getDayTime(d, i){
  //tidy up the original time code from JSON to regular, readable time
  let time = d.whentime;
  let timeObject = new Date(time);
  let hour = timeObject.getHours();
  //console.log(hour);

  // let time = data.whentime.split(":");
  // console.log(time[0]); the number of hour
  let color;
  let where = d.where;
  if (where === "Virtual Call") {
    color = "green"
  } else {
    if (hour >= 6 && hour <= 11) {
      color = "#FFC408"
    } else if (hour >= 12 && hour <= 17) {
      color = "#F05E1C"
    } else if (hour >= 18 && hour <= 24) {
      color = "#113285"
    } else {
      color = "#211E55"
    }
  }

  return color;
}

function getPerson(d, i){
  let color;
  if (d.who === "mom") {
    color = "#d62d20"
  } else if (d.who === "dad") {
    color = "#0057e7"
  } else if (d.who === "brother") {
    color = "#008744"
  } else if (d.who === "sister") {
    color = "white"
  } else if (d.who === "popo") {
    color = "#ffa700"
  }
  return color;
}

function getConvoLength(d, i){
  //code following https://stackoverflow.com/questions/20396456/how-to-do-word-counts-for-a-mixture-of-english-and-chinese-in-javascript
  let length;
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
    length = (count1 + count2) * 1000;
  } else {
    length = (count1 + count2);
  }
  return length;
}

//NEXT:
//add colors to the different emotions
//"No idea." or "Nothing particular.": arc, others straightLine
function getFamilyEmotionPath(d, i){
  let emotion = d.whatemotion;
  let path;
  if (emotion === "No idea.") {
    path = "M -25 -40 q 25 -20 50 0"
  } else {
    path = "M -25 -35 L 0 -55 L 25 -35"
  }
  return path
}

//NEXT:
//I need it to be one emotion, one random color
function getFamilyEmotionColor(d, i){
  let emotion = d.whatemotion;
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  let color;
  if (emotion === "No idea.") {
    color = "white"
  } else {
    color = "#" + randomColor
  }
  return color
}

function getMyEmotionPath(d, i){
  let emotion = d.myemotion;
  let path;
  if (emotion === "Nothing particular.") {
    path = "M -25 40 q 25 20 50 0"
  } else {
    path = "M -25 35 L 0 55 L 25 35"
  }
  return path
}

function getMyEmotionColor(d, i){
  let emotion = d.myemotion;
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  let color;
  if (emotion === "Nothing particular.") {
    color = "white"
  } else {
    color = "#" + randomColor
  }
  return color
}

d3.json("data.json").then(gotData);
