console.log("script loaded");

let w = window.innerWidth;
let h = window.innerHeight * 3;
// let padding = 90;

let viz = d3.select("#container").append("svg")
  .style("width", w)
  .style("height", h)
  .style("background-color", "black")
;

let section1 = viz.append("g")
  .attr("class", "section_div")
  .attr("id", "one")
  .attr("transform", "translate(0, 0)")
;

section1.append("text")
  .text("the")
  .attr("id", "title_the")
  .attr("class", "disableSelection")
  .attr("x", w/2 - 60)
  .attr("y", "12vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

section1.append("text")
  .text("FINAL")
  .attr("id", "title_final")
  .attr("class", "disableSelection")
  .attr("x", "10vw")
  .attr("y", h/6)
  .style("text-anchor", "start")
  .style("fill", "white")
;

section1.append("text")
  .text("BLESSING")
  .attr("id", "title_blessing")
  .attr("class", "disableSelection")
  .attr("x", "90vw")
  .attr("y", h/6)
  .style("text-anchor", "end")
  .style("fill", "white")
;

let section3 = viz.append("g")
  .attr("class", "section_div")
  .attr("id", "three")
  .attr("transform", "translate(0, " + (h/3)*2 + ")")
;

section3.append("image")
  .attr("class", "bg")
  .attr("xlink:href", "images/rainbow.svg")
  .attr("x", 0)
  .attr("y", 0)
;

section3.append("text")
  .text("created by")
  .attr("id", "text_created")
  .attr("class", "disableSelection")
  .attr("x", w/2)
  .attr("y", "92vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

section3.append("text")
  .text("Shiny Shuan-Yi Wu")
  .attr("id", "text_Shiny")
  .attr("class", "disableSelection")
  .attr("x", w/2)
  .attr("y", "95vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

let section2 = viz.append("g")
  .attr("class", "section_div")
  .attr("id", "two")
  .attr("transform", "translate(0, " + h/3 + ")")
;

section2.append("image")
  .attr("class", "bg")
  .attr("xlink:href", "images/rainbow.svg")
  .attr("x", 0)
  .attr("y", h/6)
;

let emptyDiv = section2.append("rect")
  .attr("class", "emptyDiv")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", w)
  .attr("height", h/6)
;

let navigationGroup = section2
  .append("g")
    .attr("class", "navigationGroup")
    .attr("transform", "translate(0, " + (h/6) + ")")
;

let brushGraphGroup = section2.append("g").attr("class", "brushGraphGroup");
let brushInterXGroup = section2.append("g").attr("class", "brushInterXGroup");

let xScale = d3.scaleLinear().range([0, w]);

let brush = d3.brushX()
  .extent([[0, h/6], [w, (h/6)+20]])
;

let brushArea = brushInterXGroup.append("g")
  .attr("class", "brush")
  .call(brush)
  // default selection area
  .call(brush.move, [w/2, (w/2)+3])
;
// removes handle to resize the brush
d3.selectAll('.brush>.handle').remove();
// removes crosshair cursor
d3.selectAll('.brush>.overlay').remove();

// var timeoutID;
// function delayedAlert() {
//   window.setTimeout(repeat(), 7*1000);
// //   window.setTimeout(function() {
// //   alert('Hello World!');
// // }, 500);
// }

let brushMoveIndicator = section2.append("text");

// repeat();
function repeat(){
  brushMoveIndicator
    .text("▼")
    .attr("y", (h/6)-20)
    .attr("class", "disableSelection")
    .attr("fill", "#aaaaaa")
    .style("text-anchor", "middle")
    .style("font-size", 30)
    .style("font-weight", "bold")
    //animation
    .transition()
    .duration(500)
    .attr("y", (h/6)-10)
    .transition()
    .delay(1000)
    .duration(500)
    .attr("y", (h/6)-20)
    .on("end", repeat)
  ;
}

d3.csv("first-words.csv").then(function(gotData){
  d3.json("last-words.json").then(function(incomingData){
    console.log("data loaded");

    xScale.domain([0, incomingData.length-1]);
    brush.on("end", brushEnd);
    brush.on("brush", brushMove);

    let datagroups = brushGraphGroup.selectAll(".datapoint").data(incomingData).enter()
      .append("g")
      .attr("class", "datapoint")
      .attr("transform", function(d, i){
        let x = xScale(i);
        return "translate(" + x + ", " + (h/6)  + ")"
      })
    ;
    datagroups.append("rect")
      .attr("width", w/incomingData.length)
      .attr("height", 20)
      .attr("class", "dataArea")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "white")
    ;

    let selectionIndex = Math.round((incomingData.length)/2);
    // console.log("default selection", selectionIndex);

    let selectedData;
    function getSelectedData(){
      for (var i=0; i < incomingData.length; i++) {
        if (incomingData[i].Execution_Number == incomingData[selectionIndex].Execution_Number){
          selectedData = incomingData[i];
        }
      }
      console.log(selectedData);
    }
    getSelectedData();

    brushMoveIndicator.attr("x", xScale(selectionIndex) - 1);

     // function currentNumberAnchor(d, i){
     //   if (Number(selectedData.Execution_Number) >= 550) {
     //     return "start"
     //   } else {
     //     return "middle"
     //   }
     // }

    let currentNumber = section2.append("text")
      .text("Executed #" + selectedData.Execution_Number)
      .attr("x", xScale(selectionIndex) - 1)
      .attr("y", (h/6)+25)
      .attr("class", "disableSelection")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .call(wrap, 40);
    ;

    let fullStatment = section3.append("text")
      .text(selectedData["Last Statement"])
      .attr("id", "full_statement")
      .attr("x", w/2)
      .attr("y", h/14)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-family", 'Caladea')
      .call(wrap, w*0.85);
    ;

    // let allStatement = section3.selectAll(".all_statement").data(incomingData).enter()
    //   .append("text")
    //     .text((d, i) => incomingData[i]['Last Statement'])
    //     .attr("class", "all_statement")
    //     .attr("x", w/2)
    //     .attr("y", h/6 + 30)
    //     .style("text-anchor", "middle")
    //     .style("fill", "white")
    //     .style("font-size", 8)
    //     .call(wrap, w*0.95);
    // ;
    //replacing this with a screenshot of its rendering, to save page loading time
    let allStatementImage = section3.append("image")
      .attr("class", "allStatementImage")
      .attr("xlink:href", "images/allStatement.png")
      .attr("x", 0)
      .attr("y", h/6)
      .attr("width", w)
      .attr("height", h/12)
    ;

//drawBed
    let bedGroup = section2.append("g")
      .attr("class", "bedGroup")
      .attr("transform", "translate(0, " + h/6 + ")")
    ;

    function getAgeWidth(){
      let age = Number(selectedData.info.Age);
      let ageWidth = w*0.4 + age*10;
      // console.log(age);
      return ageWidth - 10
    }

    function getEducationWidth(){
      let educationLevel;
      if (selectedData.info['Education Level (Highest Grade Completed)'] != "") {
        educationLevel = Number(selectedData.info['Education Level (Highest Grade Completed)']);
      } else {
        educationLevel = 1;
      }
      let educationWidth = w*0.1 + educationLevel*15;

      return educationWidth + 10
    }

    function getTDCJWidth(){
      return getEducationWidth() - 20
    }

    function getOffenceAgeWidth(){
      let offenceAge;
      if (selectedData.info['Age (at the time of Offense)'] && selectedData.info['Age (at the time of Offense)'] != "") {
        offenceAge = Number(selectedData.info['Age (at the time of Offense)']);
      } else {
        offenceAge = 1;
      }
      let offenceAgeWidth = getEducationWidth() + offenceAge*3;

      return offenceAgeWidth - 20
    }

    function getOffenceDateWidth(){
      return getOffenceAgeWidth() + 120
    }

    function drawBed(){
      let age = Number(selectedData.info.Age);
      let ageWidth = w*0.4 + age*10;

      let educationLevel;
      if (selectedData.info['Education Level (Highest Grade Completed)'] != "") {
        educationLevel = Number(selectedData.info['Education Level (Highest Grade Completed)']);
      } else {
        educationLevel = 1;
      }
      let educationWidth = w*0.1 + educationLevel*15;

      let offenceAge;
      if (selectedData.info['Age (at the time of Offense)'] && selectedData.info['Age (at the time of Offense)'] != "") {
        offenceAge = Number(selectedData.info['Age (at the time of Offense)']);
      } else {
        offenceAge = 1;
      }
      let offenceAgeWidth = educationWidth + offenceAge*3;

      let bedPoints = [
        {x:w*0.1, y0:h/12, y1:h/6},

        {x:educationWidth, y0:h/12, y1:h/6},
        {x:educationWidth, y0:h/24, y1:h*5/24},

        {x:offenceAgeWidth, y0:h/24, y1:h*5/24},
        {x:offenceAgeWidth, y0:h/12, y1:h/6},

        {x:ageWidth, y0:h/12, y1:h/6}
      ];

      return bedPoints
    }

    let bedArea = d3.area()
      .x(function(d){return d.x})
      .y0(function(d){return d.y0})
      .y1(function(d){return d.y1})
    ;

    let bedPath = bedGroup.append("path")
      .data(drawBed)
      .attr("d", bedArea(drawBed()))
      .attr("fill", "none")
      .style("stroke", "white")
      .style("stroke-width", 2.5)
    ;

    let ageText = bedGroup.append("text")
      .text(selectedData.info.Age)
      .attr("x", getAgeWidth)
      .attr("y", h/6 - 10)
      .attr("class", "bedText")
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    let educationText = bedGroup.append("text")
      .text(selectedData.info['Education Level (Highest Grade Completed)'])
      .attr("x", getEducationWidth)
      .attr("y", h/6 + 15)
      .attr("class", "bedText")
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let tdcjText = bedGroup.append("text")
      .text(selectedData.info.TDCJ_Number)
      .attr("x", getTDCJWidth)
      .attr("y", h/6 + 20)
      .attr("class", "bedText")
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    let offenceAgeText = bedGroup.append("text")
      .text(selectedData.info['Age (at the time of Offense)'])
      .attr("x", getOffenceAgeWidth)
      .attr("y", h/24 + 20)
      .attr("class", "bedText")
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    let birthDateText = bedGroup.append("text")
      .text(selectedData.info['Date of Birth'])
      .attr("x", w*0.25)
      .attr("y", (h/6 + h/12)/2)
      .attr("class", "bedText")
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let offenseDateText = bedGroup.append("text")
      .text(selectedData.info['Date of Offense'])
      .attr("x", getOffenceDateWidth)
      .attr("y", h/12 + 30)
      .attr("class", "bedText")
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let receiveDateText = bedGroup.append("text")
      .text(selectedData.info['Date Received'])
      .attr("x", getOffenceDateWidth)
      .attr("y", h/6 - 30)
      .attr("class", "bedText")
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let executionDateText = bedGroup.append("text")
      .text(selectedData.info['Date_Executed'])
      .attr("x", getAgeWidth)
      .attr("y", (h/6 + h/12)/2)
      .attr("class", "bedText")
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    bedGroup.append("image")
      .attr("class", "pillow")
      .attr("xlink:href", "images/pillow.png")
      .attr("x", w*0.09)
      .attr("y", h/12)
      .attr("width", w*0.15)
      .attr("height", h/6 - h/12)
    ;

    function showMatchedWords(d, i){
      function getRandomYPos(d, i){
        return Math.random() * ((h/6 - 30)-80) + 80
      }

      function fallingRandomYPos(d, i){
        return Math.random() * ((h/3 - 30) - (h/6 + 30)) + (h/6 + 30)
      }

      let wordsXScale = d3.scaleLinear().range([w*0.1, w*0.9]);

      function getGroupLocation(d, i){
        let x = wordsXScale(i);
        let y = getRandomYPos();
        return "translate("+x+", "+y+")"
      }

      function fallingGroupLocation(d, i){
        let x = wordsXScale(i);
        let y = fallingRandomYPos();
        return "translate("+x+", "+y+")"
      }

      function getIncomingGroupLocation(d, i){
        let x = w/2;
        let y = 50;
        return "translate("+x+", "+y+")"
      }

      function getExitingGroupLocation(d, i){
        let x = w/2;
        let y = h/3;
        return "translate("+x+", "+y+")"
      }

      function assignKeys(d, i){
        return d.word
      }

  //check the matched words
      // first turn all first words into an array
      let firstWords = gotData.map(d=>d.definition);
      let firstWordsFreq = gotData.map(d=>(Number(d.fre16) + Number(d.fre17) + Number(d.fre18) + Number(d.fre19) + Number(d.fre20) + Number(d.fre21) + Number(d.fre22) + Number(d.fre23) + Number(d.fre24) + Number(d.fre25) + Number(d.fre26) + Number(d.fre27) + Number(d.fre28) + Number(d.fre29) + Number(d.fre30))/15);
      // console.log(firstWordsFreq);
      let minFreq = d3.min(firstWordsFreq, (d, i) => d);
      let maxFreq = d3.max(firstWordsFreq, (d, i) => d);
      let freqScale = d3.scaleLinear().domain([minFreq, maxFreq]).range([14, 32]);
      // console.log(firstWords);
      let selectedStatement = selectedData['Last Statement'];

      let matchedWords = [];
      //then check if first words are in selected last statement
      for (var i = 0; i < firstWords.length; i++) {
        if (new RegExp("\\b" + firstWords[i] + "\\b", "i").test(selectedStatement)) {
          matchedWords.push({  word: firstWords[i], freq: freqScale(firstWordsFreq[i])  });
        }
      }
      // console.log(selectedData.Execution_Number + " contain: " + matchedWords);

      // let noMatchText = section2.append("text")
      //   .text("X")
      //   .attr("x", w/2 - 50)
      //   .attr("y", h/12)
      //   .style("text-anchor", "middle")
      //   .style("fill", "white")
      //   .style("font-size", 60)
      //   .style("display", "none")
      // ;
      //
      // if (matchedWords.length === 0) {
      //   noMatchText.style("display", "block");
      // } else {
      //   noMatchText.style("display", "none");
      // }

      wordsXScale.domain([0, matchedWords.length-1]);

      //enter() all matchedWords as texts
      let matchedWordsGroups = section2.selectAll(".wordGroup").data(matchedWords, assignKeys);

      //ENTERING words
      let enteringWords = matchedWordsGroups.enter()
        .append("g")
          .attr("class", "wordGroup")
      ;

      let enteringWord = enteringWords.append("text")
        .text((d, i) => d.word)
        .attr("x", 10)
        .attr("y", 10)
        .attr("class", "enteringWord")
        .style("font-size", (d, i) => d.freq)
        .attr("text-anchor", "middle")
        // .attr("fill", "white")
        // .call(wrap, 20)
      ;

      enteringWords.attr("transform", getIncomingGroupLocation)
        .transition().delay(500).duration(3000).attr("transform", getGroupLocation)
        .transition().delay(500).duration(15000).attr("transform", fallingGroupLocation)
      ;
      enteringWord.attr("fill", "white")
        .transition().delay(500).duration(3000).attr("fill", "white")
        .transition().delay(500).duration(15000).attr("fill", "black")
      ;

      //EXITING words
      let exitingWords = matchedWordsGroups.exit();
      exitingWords.transition().duration(1000).attr("transform", getExitingGroupLocation).remove();

      //UPDATING words
      matchedWordsGroups.select("text")
        .text((d, i) => d.word)
        .attr("fill", "white")
        .style("font-size", (d, i) => d.freq)
        .transition().delay(500).duration(3000).attr("fill", "white")
        .transition().delay(500).duration(15000).attr("fill", "black")
      ;
      matchedWordsGroups
        .transition().duration(500).attr("transform", getGroupLocation)
        .transition().delay(500).duration(15000).attr("transform", fallingGroupLocation)
      ;

    }

    showMatchedWords();


// update
    //this is whenever the brush is moving
    function brushMove(){
      let leftEdgeOfBrush = (d3.event.selection.map(xScale.invert)[0] + d3.event.selection.map(xScale.invert)[1])/2;
      selectionIndex = Math.round(leftEdgeOfBrush);
      brushMoveIndicator.attr("x", xScale(selectionIndex));
      currentNumber.text("Executed #" + incomingData[selectionIndex].Execution_Number).attr("x", xScale(selectionIndex) - 1).call(wrap, 40);
    }
    //this is whenever a brush selection is done
    function brushEnd(){
      let leftEdgeOfBrush = (d3.event.selection.map(xScale.invert)[0] + d3.event.selection.map(xScale.invert)[1])/2;
      selectionIndex = Math.round(leftEdgeOfBrush);
      // datagroups.select("rect").attr("fill", "white")
      datagroups.filter((d, i)=>{
        return i == selectionIndex;
      })//.select("rect").attr("fill", "white")
      brushMoveIndicator.attr("x", xScale(selectionIndex));
      currentNumber.text("Executed #" + incomingData[selectionIndex].Execution_Number).attr("x", xScale(selectionIndex) - 1).call(wrap, 40);
      getSelectedData();
      console.log("selction:", selectedData.Execution_Number);
      bedPath.data(drawBed).attr("d", bedArea(drawBed())).transition();
      ageText.text(selectedData.info.Age).attr("x", getAgeWidth);
      educationText.text(selectedData.info['Education Level (Highest Grade Completed)']).attr("x", getEducationWidth);
      offenceAgeText.text(selectedData.info['Age (at the time of Offense)']).attr("x", getOffenceAgeWidth);
      offenseDateText.text(selectedData.info['Date of Offense']).attr("x", getOffenceDateWidth);
      receiveDateText.text(selectedData.info['Date Received']).attr("x", getOffenceDateWidth);
      executionDateText.text(selectedData.info['Date_Executed']).attr("x", getAgeWidth);
      birthDateText.text(selectedData.info['Date of Birth']);
      tdcjText.text(selectedData.info.TDCJ_Number).attr("x", getTDCJWidth);
      fullStatment.text(selectedData['Last Statement']).call(wrap, w*0.85);
      showMatchedWords();
    }

    //wrapping text
    //following and credit to https://stackoverflow.com/questions/24784302/wrapping-text-in-d3/24785497
    function wrap(text, width) {
      text.each(function () {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.2, // ems
              x = text.attr("x"),
              y = text.attr("y"),
              dy = 0, //parseFloat(text.attr("dy")),
              tspan = text.text(null)
                          .append("tspan")
                          .attr("x", x)
                          .attr("y", y)
                          .attr("dy", dy + "em");
          while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan")
                              .attr("x", x)
                              .attr("y", y)
                              .attr("dy", ++lineNumber * lineHeight + dy + "em")
                              .text(word);
              }
          }
        });
      }


  });
});

//clicking the navigation arrows
  //navigate through page sections
  //and display description texts
let firstToSecond = document.getElementById("section_link1_2");
let secondToThird = document.getElementById("section_link2_3");
let secondToFirst = document.getElementById("section_link2_1");
let thirdToSecond = document.getElementById("section_link3_2");

firstToSecond.href = "#two";
secondToThird.href = "#three";
thirdToSecond.href = "#two";
secondToFirst.href = "#one";

let description1 = document.getElementById("description1");
let description2_1 = document.getElementById("description2_1");
let description2_2 = document.getElementById("description2_2");
let text2_2 = document.getElementById("text2_2");
let description3_1 = document.getElementById("description3_1");
let description3_2 = document.getElementById("description3_2");
let description3_3 = document.getElementById("description3_3");
let description3_4 = document.getElementById("description3_4");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("infoButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function go1to2(){
  firstToSecond.style.display = "none";
  secondToThird.style.display = "block";
  secondToFirst.style.display = "block";
  description1.style.display = "none";
  description2_1.style.display = "block";
  description2_1.style.animation = "aniDescription2_1 3s";
  description2_2.style.display = "block";
  description2_2.style.animation = "aniDescription2_2 12s";
  // delayedAlert();
  d3.timeout(repeat(), 7000);
}

function go2to3(){
  secondToThird.style.display = "none";
  secondToFirst.style.display = "none";
  thirdToSecond.style.display = "block";
  description2_1.style.display = "none";
  description2_2.style.display = "none";
  description3_1.style.display = "block";
  description3_1.style.animation = "aniDescription3_1 1s";
  description3_2.style.display = "block";
  description3_2.style.animation = "aniDescription3_2 6s";
  description3_3.style.display = "block";
  description3_3.style.animation = "aniDescription3_3 10s";
  btn.style.display = "block";
}

function go3to2(){
  thirdToSecond.style.display = "none";
  secondToThird.style.display = "block"
  secondToFirst.style.display = "block";
  description3_1.style.display = "none";
  description3_2.style.display = "none";
  description3_3.style.display = "none";
  description3_4.style.display = "none";
  description2_1.style.display = "block";
  description2_1.style.animation = "aniDescription2_1 3s";
  description2_2.style.display = "block";
  description2_2.style.animation = "aniDescription2_2 12s";
  btn.style.display = "none";
}

function go2to1(){
  secondToFirst.style.display = "none";
  secondToThird.style.display = "none";
  firstToSecond.style.display = "block";
  description2_1.style.display = "none";
  description2_2.style.display = "none";
}


function showDescription1(){
  description1.style.display = "block";
  description1.style.animation = "aniDescription1 1s";
}

function changeDescription2_2(){
  text2_2.innerHTML = "to the very<br>last words one may speak <br>on a bed"
  description2_2.style.left = "84.3vw";
}

function originalDescription2_2(){
  text2_2.innerHTML = "across the time<br>indicators that seeminly define life"
  description2_2.style.left = "84vw";
}

function showDescription3_4(){
  description3_4.style.display = "block";
}

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
