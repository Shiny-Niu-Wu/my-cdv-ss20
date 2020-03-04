let viz = d3.select("#viz-container")
  .append("svg")
    .attr("font-family", "Helvetica")
    .attrs({
      id: "viz",
      width: "700%",
      height: "100%",
      overflow: "scroll"
    })
;

//this is the overall background
viz
  .append("rect")
    .attrs({
      fill: "black",
      width: "100%",
      height: "100%"
    })
;

//need to figure out how to position:fixed the text
viz
  .append("text")
    .attrs({
      x: "7%",
      y: "10%",
      fill: "white"
    })
    .text("<o>")
    .attr("font-size", 100)
;

//the names of family members on the left
//this part will be adjusted following the filtered array byName[]
viz
  .append("text")
    .attrs({
      x: "1%",
      y: "25%",
      fill: "white"
    })
    .text("<mom>")
    .attr("font-size", 20)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "40%",
      fill: "white"
    })
    .text("<dad>")
    .attr("font-size", 20)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "55%",
      fill: "white"
    })
    .text("<bro>")
    .attr("font-size", 20)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "70%",
      fill: "white"
    })
    .text("<popo>")
    .attr("font-size", 20)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "85%",
      fill: "white"
    })
    .text("<sis>")
    .attr("font-size", 20)
;

//(gotData) cannot be changed to other names
d3.json("data.json").then(gotData);

let byName = [];

function gotData(incomingData){
  console.log(incomingData);

  //("p") can be any tag I want to create
  let features = viz.selectAll("familyContact").data(incomingData).enter()
;

  features
    .append("ellipse")
      .attrs({
        cx: xLocation,
        cy: yLocation,
        rx: eyeArea,
        ry: lengthOfConversation,
        fill: "white"
      })
  ;

  features
    .append("circle")
      .attrs({
        cx: xLocation,
        cy: yLocation,
        r: eyeArea,
        stroke: timeOfDay,
        fill: "black"
      })
      .attr("stroke-width", eyeBall)
  ;

//this gives back error saying d3.svg.line is not a function
  // features
  //   .append("path")
  //     .attr("d", d3.svg.line().x(xLocation).y(lengthOfConversation)())
  //     //.attr("y", 0)
  //     .attr("stroke", "#D7C4BB")
  //     .attr("stroke-width", 5)
  //     .attr("fill", "none")
  // ;

//this filters each eye contact by family member, and put each family member's eye contacts into separate objects
  // byName = Array.from(d3.group(incomingData, d => d.who), ([key, value]) => ({key, value}));
  // console.log(byName);
  //
  // let count = Array.from(d3.rollup(incomingData, v => v.length, d => d.who), ([key, value]) => ({key, value}));
  // console.log(count);
  //
  // return byName;
}

// viz
//   .append("text")
//     .attrs({
//       x: "10%",
//       y: "10%",
//       fill: "white"
//     })
//     .text(contactCount)
//     .attr("font-size", 20)
// ;
//
// function contactCount(byName){
//   datapoint = byName.value * 10;
//   let name = byName.key;
//   let result = name + ": " + datapoint;
//   return name;
// }

//this will be the X position of the circles, and the points of line shape
function xLocation(data){
  datapoint = data.no * 75 + 150;
  return datapoint;
}

// let nameList = [];
//
// function createNameList(data){
//   datapoint = data.who;
//   nameList.push(datapoint);
//   return datapoint;
// }

function yLocation(data){
  let name = data.who;
  let yPos;
  if (name === "mom") {
    yPos = 25
  } else if (name === "dad") {
    yPos = 40
  } else if (name === "bro") {
    yPos = 55
  } else if (name === "popo") {
    yPos = 70
  } else if (name === "sis") {
    yPos = 85
  }
  return yPos + "%";
}

//longer the duration, larger the eyes
//need to figure out how to combine the two functions, eyeArea and eyeBall
function eyeArea(data){
  let duration = data.durationContact;
  let size;
  if (duration === "<1") {
    size = 5
  } else if (duration === "1-3") {
    size = 11
  } else if (duration === ">3") {
    size = 25
  }
  return size;
}

function eyeBall(data){
  let duration = data.durationContact;
  let smallSize;
  if (duration === "<1") {
    smallSize = 5 * 0.3
  } else if (duration === "1-3") {
    smallSize = 11 * 0.3
  } else if (duration === ">3") {
    smallSize = 25 * 0.3
  }
  return smallSize;
}

//virtual call eye in green; otherwise, eye contact in daytime or nighttime affects the color of eyes
//!!!!!the time zone is messed up when exporting JSON from google spreadsheet!!!!!
//when figure out, add the "date"
function timeOfDay(data){
  let time = data.whenTime.split(":");
  //console.log(time[0]); the number of hour
  let color;
  let where = data.where;
  if (where === "Virtual Call") {
    color = "green"
  } else {
    if (time[0] >= 6 && time[0] <= 17) {
      color = "#FFC408"
    } else {
      color = "#0F2540"
    }
  }

  return color;
}

//this will be the Y of the line shape. the longer the length, the smaller the Y (higher position on webpage)
function lengthOfConversation(data){
  //code following https://stackoverflow.com/questions/20396456/how-to-do-word-counts-for-a-mixture-of-english-and-chinese-in-javascript
  let length;
  let conversation = data.whatTalk;

  let where = data.where;
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
    length = (count1 + count2) * 2;
  }
  //console.log(length);

  return length;
}

let line = function drawConvoLine(){

}
