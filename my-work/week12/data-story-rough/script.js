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
  .attr("x", w/2)
  .attr("y", "5vh")
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

//mic image placeholder
section1.append("text")
  .text("[insert mic pic]")
  .attr("x", w/2)
  .attr("y", h/6)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
// section1.append("image")
//   .attr("id", "img_mic")
//   .attr("xlink:href", "images/XXX")
//   .attr("x", 0)
//   .attr("y", 0)
// ;

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

//matched first words placholder
section2.append("text")
  .text("[matched first words]")
  .attr("x", w/6)
  .attr("y", 0)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
section2.append("text")
  .text("[matched first words]")
  .attr("x", (w*4)/5)
  .attr("y", h/8)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
section2.append("text")
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

//navigation bar placeholder
navigationGroup.append("rect")
  .attr("width", w)
  .attr("height", "2em")
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "red")
;

//bed image placeholder
section2.append("text")
  .text("[insert bed pic]")
  .attr("x", w/2)
  .attr("y", h/4)
  .style("text-anchor", "middle")
  .style("fill", "white")
;
// section1.append("image")
//   .attr("id", "img_bed")
//   .attr("xlink:href", "images/XXX")
//   .attr("x", 0)
//   .attr("y", 0)
// ;

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
  .text("[full last statement]")
  .attr("id", "full_statement")
  .attr("x", w/2)
  .attr("y", h/12)
  .style("text-anchor", "middle")
  .style("fill", "white")
;

section3.append("text")
  .text("[all the statements layered on top of each other]")
  .attr("id", "all_statement")
  .attr("x", w/2)
  .attr("y", h/4)
  .style("text-anchor", "middle")
  .style("fill", "white")
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

d3.csv("first-words.csv").then(gotData);
//still need to import last words data
//maybe combine the two data files

function gotData(incomingData){
  console.log("hello");
}

//scroll down arrow

//let nextSection = document.getElementById("section_link").href;

// let counter = 0;
// let nextSection;
// function goToNextSection(){
//   counter++;
//   if (counter === 1) {
//     nextSection = "#sec2";
//     counter ++;
//   } else if (counter === 2) {
//     nextSection = "#sec3";
//     counter ++;
//   } else {
//     counter = 1;
//   }
//   console.log(counter);
//   return nextSection
// }
//
// section1.append("a")
//   .attr("xlink:href", "javascript:void(0)")
//   .on("clicked", goToNextSection)
//   .append("text")
//     .text("↧")
//     .attr("fill", "white")
//     .attr("x", w * 0.9)
//     .attr("y", h / 7)
// ;
