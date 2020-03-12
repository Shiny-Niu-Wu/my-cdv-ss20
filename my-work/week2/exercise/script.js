console.log('js loaded.');

//console.log(document.getElementById('viz-container'));
//stuff we do regardless of what the data is
let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 600)
;

// <div id="viz-container"><svg><circle></circle></svg></div>

d3.json("data.json").then(gotData);

function gotData(incomingData){
  console.log(incomingData);

  viz.selectAll("circle").data(incomingData).enter()
    .append("circle")
      .attr()
}

//let myData = [4, 6, 8, 2, 9];

//load the data, and do things with the datapoint

//function blabla(whatD3IsPassing)
// function xLocation(datapoint){
//   console.log(datapoint);
//   return datapoint * 40;
// }

//exercise: use data functions to change multiple attributes
//and experiment with different shapes
// function chooseColor(datapoint){
//   if (datapoint = ) {
//
//   }
//   return "green"
// }

// viz.selectAll("circle").data(myData).enter()
//   .append("circle")
//     .attr("cx", xLocation) //justCheking is different from justChecking().
//     .attr("cy", 100)
//     .attr("r", 40)
// ;
