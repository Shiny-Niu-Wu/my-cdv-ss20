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
  .attr("id", "sec1")
  .attr("transform", "translate(0, 0)")
;

section1.append("text")
  .text("the")
  .attr("id", "title_the")
  .attr("x", w/2 - 60)
  .attr("y", "12vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

section1.append("text")
  .text("FINAL")
  .attr("id", "title_final")
  .attr("x", "10vw")
  .attr("y", h/6)
  .style("text-anchor", "start")
  .style("fill", "white")
;

section1.append("text")
  .text("BLESSING")
  .attr("id", "title_blessing")
  .attr("x", "90vw")
  .attr("y", h/6)
  .style("text-anchor", "end")
  .style("fill", "white")
;

let section3 = viz.append("g")
  .attr("class", "section_div")
  .attr("id", "sec3")
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
  .attr("x", w/2)
  .attr("y", "90vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

section3.append("text")
  .text("Shiny Shuan-Yi Wu")
  .attr("id", "text_Shiny")
  .attr("x", w/2)
  .attr("y", "95vh")
  .style("text-anchor", "middle")
  .style("fill", "white")
;

let section2 = viz.append("g")
  .attr("class", "section_div")
  .attr("id", "sec2")
  .attr("transform", "translate(0, " + h/3 + ")")
;

section2.append("image")
  .attr("class", "bg")
  .attr("xlink:href", "images/rainbow.svg")
  .attr("x", 0)
  .attr("y", h/6)
;

let matchedWordsGroup = section2.append("g")
  .attr("class", "matchedWordsGroup")
  .attr("transform", "translate(0, 0)")
;

//matched first words placholder
matchedWordsGroup.append("text")
  .text("[matched first words]")
  .attr("x", w/6)
  .attr("y", 100)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
matchedWordsGroup.append("text")
  .text("[matched first words]")
  .attr("x", (w*4)/5)
  .attr("y", h/8)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
matchedWordsGroup.append("text")
  .text("[matched first words]")
  .attr("x", w/2)
  .attr("y", h/14)
  .style("text-anchor", "middle")
  .style("fill", "white")
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

//bed image placeholder
// section2.append("text")
//   .text("[insert a bed changing its shape]")
//   .attr("x", w/2)
//   .attr("y", h/4)
//   .style("text-anchor", "middle")
//   .style("fill", "white")
// ;

d3.csv("first-words.csv").then(function(gotData){
  // I want to get the avg frequency
  // gotData.forEach((d, i) => {
  //   gotData[i].avg = (d.fre16 + d.fre17 + d.fre18 + d.fre19 + d.fre20 + d.fre21 + d.fre22 + d.fre23 + d.fre24 + d.fre25 + d.fre26 + d.fre27 + d.fre28 + d.fre29 + d.fre30)/15;
  // });
  // console.log(gotData[2].fre24);

  d3.json("last-words.json").then(function(incomingData){
    console.log("data loaded");

//!!!!!!!!!!!!!!check the matched words!!!!!!!!!!!!!!!

    // var string = "hi, I need support for apple, android and nokia phones.";
    // var keywords = ['apple', 'nokia', 'android'];
    // var results = [];
    // for(var i = 0; i < keywords.length; i++) {
    //     if ((new RegExp("\\b" + keywords[i] + "\\b", "i").test(string)) {
    //         results.push(keywords[i]);
    //     }
    // }
    // alert( "contains: " + results );

// first turn all first words into an array
    let firstWords = gotData.map(d=>d.definition);
    // console.log(firstWords);
    //also turn the last statements into an array
    let lastSentences = incomingData.map(d=>d['Last Statement']);
    // console.log(lastSentences);

//match first words and last words
    // lastSentences.forEach((item, id) => {
    //   for(i = 0; i < firstWords.length; i++){
    //     var match = item.match(firstWords[i]);
    //     // console.log(match);
    //   }
    // });

//enter() all matchedWords as texts



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

    let brushMoveIndicator = section2.append("text")
      .text("↔")
      .attr("x", xScale(selectionIndex) - 1)
      .attr("y", (h/6)-10)
      .attr("fill", "white")
      .style("text-anchor", "middle")
    ;

    let currentNumber = section2.append("text")
      .text("Executed #" + selectedData.Execution_Number)
      .attr("x", xScale(selectionIndex) - 1)
      .attr("y", (h/6)+25)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .call(wrap, 40);
    ;

    let fullStatment = section3.append("text")
      .text(incomingData[selectionIndex]['Last Statement'])
      .attr("id", "full_statement")
      .attr("x", w/2)
      .attr("y", h/14)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .call(wrap, w*0.85);
    ;

    let allStatement = section3.selectAll(".all_statement").data(incomingData).enter()
      .append("text")
        .text((d, i) => incomingData[i]['Last Statement'])
        .attr("class", "all_statement")
        .attr("x", w/2)
        .attr("y", h/6 + 30)
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", 12)
        .call(wrap, w*0.95);
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
      let offenceAge;
      if (selectedData.info['Age (at the time of Offense)'] && selectedData.info['Age (at the time of Offense)'] != "") {
        offenceAge = Number(selectedData.info['Age (at the time of Offense)']);
      } else {
        offenceAge = 1;
      }
      let offenceAgeWidth = getEducationWidth() + offenceAge*3;

      return offenceAgeWidth + 100
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
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    let educationText = bedGroup.append("text")
      .text(selectedData.info['Education Level (Highest Grade Completed)'])
      .attr("x", getEducationWidth)
      .attr("y", h/6 + 15)
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let offenceAgeText = bedGroup.append("text")
      .text(selectedData.info['Age (at the time of Offense)'])
      .attr("x", getOffenceAgeWidth)
      .attr("y", h/24 + 20)
      .style("text-anchor", "end")
      .style("fill", "white")
    ;

    let birthDateText = bedGroup.append("text")
      .text(selectedData.info['Date of Birth'])
      .attr("x", w*0.25)
      .attr("y", (h/6 + h/12)/2)
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let offenseDateText = bedGroup.append("text")
      .text(selectedData.info['Date of Offense'])
      .attr("x", getOffenceDateWidth)
      .attr("y", h/12 + 30)
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let receiveDateText = bedGroup.append("text")
      .text(selectedData.info['Date Received'])
      .attr("x", getOffenceDateWidth)
      .attr("y", h/6 - 30)
      .style("text-anchor", "start")
      .style("fill", "white")
    ;

    let executionDateText = bedGroup.append("text")
      .text(selectedData.info['Date_Executed'])
      .attr("x", getAgeWidth)
      .attr("y", (h/6 + h/12)/2)
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

    // update
    //this is whenever a selection is done
    function brushMove(){
      let leftEdgeOfBrush = (d3.event.selection.map(xScale.invert)[0] + d3.event.selection.map(xScale.invert)[1])/2;
      selectionIndex = Math.round(leftEdgeOfBrush);
      brushMoveIndicator.attr("x", xScale(selectionIndex));
      currentNumber.text("Executed #" + incomingData[selectionIndex].Execution_Number).attr("x", xScale(selectionIndex) - 1).call(wrap, 40);
    }
    function brushEnd(){
      let leftEdgeOfBrush = (d3.event.selection.map(xScale.invert)[0] + d3.event.selection.map(xScale.invert)[1])/2;
      selectionIndex = Math.round(leftEdgeOfBrush);
      // datagroups.select("rect").attr("fill", "white")
      datagroups.filter((d, i)=>{
        return i == selectionIndex;
      })//.select("rect").attr("fill", "white")
      brushMoveIndicator.attr("x", xScale(selectionIndex));
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
      fullStatment.text(selectedData['Last Statement']).call(wrap, w*0.85);
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

//maybe combine the two data files


let firstToSecond = document.getElementById("section_link1_2");
let secondToThird = document.getElementById("section_link2_3");
let secondToFirst = document.getElementById("section_link2_1");
let thirdToSecond = document.getElementById("section_link3_2");

firstToSecond.href = "#sec2";
secondToThird.href = "#sec3";
thirdToSecond.href = "#sec2";
secondToFirst.href = "#sec1";

function go1to2(){
  firstToSecond.style.display = "none";
  secondToThird.style.display = "block";
  secondToFirst.style.display = "block";
}

function go2to3(){
  secondToThird.style.display = "none";
  secondToFirst.style.display = "none";
  thirdToSecond.style.display = "block";
}

function go3to2(){
  thirdToSecond.style.display = "none";
  secondToThird.style.display = "block"
  secondToFirst.style.display = "block";
}

function go2to1(){
  secondToFirst.style.display = "none";
  secondToThird.style.display = "none";
  firstToSecond.style.display = "block";
}
