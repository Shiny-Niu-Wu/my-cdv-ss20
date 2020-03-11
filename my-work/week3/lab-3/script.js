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

//need to figure out how to position:fixed the text
viz
  .append("text")
    .attrs({
      x: "1%",
      y: "10%",
      fill: "white"
    })
    .text("<o>")
    .attr("font-size", 100)
;

//the names of family members on the left
//later I want to replace this part with graphics
viz
  .append("text")
    .attrs({
      x: "1%",
      y: "25%",
      fill: "white"
    })
    .text("<mom>")
    .attr("font-size", 60)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "40%",
      fill: "white"
    })
    .text("<dad>")
    .attr("font-size", 60)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "55%",
      fill: "white"
    })
    .text("<bro>")
    .attr("font-size", 60)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "70%",
      fill: "white"
    })
    .text("<popo>")
    .attr("font-size", 60)
;

viz
  .append("text")
    .attrs({
      x: "1%",
      y: "85%",
      fill: "white"
    })
    .text("<sis>")
    .attr("font-size", 60)
;

//only use (incomingData) once and here
function gotData(incomingData){
  console.log(incomingData);

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  datagroups
    .append("line")
      .attrs({
        x1: xLocation,
        y1: 0,
        x2: xLocation,
        y2: "100vh",
        stroke: "white"
      })
      .attr("stroke-width", 5)
      .attr("stroke-dasharray", lengthOfConversation)
  ;

//some unfinished experiments...
  //family emotion
  // datagroups
  //   .append("path")
  //     .attr("d", familyEmotionLine)
  //     .attr("stroke", "blue")
  //     .attr("stroke-width", 2)
  //     .attr("fill", "none");
  // ;

  // let filter = datagroups.append("defs")
  //                           .attrs({
  //                             id: "f",
  //                             x: xLocation,
  //                             y: yLocation,
  //                             width: "150%",
  //                             height: "150%"
  //                           })
  // ;
  //
  // filter.append("feOffset")
  //         .attrs({
  //           result: "offOut",
  //           in: "SourceGraphic",
  //           dx: 0,
  //           dy: 10
  //         })
  // ;
  // filter.append("feBlend")
  //         .attrs({
  //           in: "SourceGraphic",
  //           in2: "offOut",
  //           mode: "normal"
  //         })
  // ;

  datagroups
    .append("circle")
      .attrs({
        cx: xLocation,
        cy: yLocation,
        r: eyeArea,
        stroke: timeOfDay,
        fill: "black",
        //filter: "url(#f)"
      })
      .attr("stroke-width", eyeBall)
      //.attr("stroke-dasharray", )
  ;

}

function xLocation(data){
  datapoint = data.no * 85 + 300;
  return datapoint;
}

function yLocation(data){
  let name = data.who;
  let yPos;
  if (name === "mom") {
    yPos = 23
  } else if (name === "dad") {
    yPos = 38
  } else if (name === "brother") {
    yPos = 53
  } else if (name === "popo") {
    yPos = 68
  } else if (name === "sister") {
    yPos = 83
  }
  return yPos + "%";
}

//I want to draw a bezier line on top of the eyeball
// var familyEmotionLine = viz.line()
//                          .x(function(d) { return xLocation - eyeArea; })
//                          .y(function(d) { return yLocation - eyeArea; })
//                          .interpolate("basis")
// ;
//and also one under

//longer the duration, larger the eyes
//need to figure out how to combine the two functions, eyeArea() and eyeBall()
function eyeArea(data){
  let duration = data.howlongeyecontact;
  let size;
  if (duration === "Less than 1 second") {
    size = 10
  } else if (duration === "1-3 seconds") {
    size = 20
  } else if (duration === "More than 3 seconds") {
    size = 35
  }
  return size;
}

function eyeBall(data){
  let duration = data.howlongeyecontact;
  let smallSize;
  if (duration === "Less than 1 second") {
    smallSize = 10 * 0.3
  } else if (duration === "1-3 seconds") {
    smallSize = 20 * 0.3
  } else if (duration === "More than 3 seconds") {
    smallSize = 35 * 0.3
  }
  return smallSize;
}

function time(){
  let timeObject = new Date();
  console.log(timeObject);
}

//virtual call eye in green; otherwise, eye contact in daytime or nighttime affects the color of eyes
function timeOfDay(data){
  //tidy up the original time code from JSON to regular, readable time
  let time = data.whentime;
  let timeObject = new Date(time);
  let hour = timeObject.getHours();
  //console.log(hour);

  // let time = data.whentime.split(":");
  // console.log(time[0]); the number of hour
  let color;
  let where = data.where;
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

//this function decides the dashlines behind the eyes
function lengthOfConversation(data){
  //code following https://stackoverflow.com/questions/20396456/how-to-do-word-counts-for-a-mixture-of-english-and-chinese-in-javascript
  let length;
  let conversation = data.whattalk;

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
    length = (count1 + count2) * 100;
  } else {
    length = (count1 + count2) ;
  }

  //the larger the length (longer conversation), the shorter the dashes of the lines (the lines are splited into more parts)
  //and vice versa
  return 1/length * 250;
}

//(gotData) cannot be changed to other names
d3.json("data.json").then(gotData);
