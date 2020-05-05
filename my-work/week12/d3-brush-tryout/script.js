console.log("script loaded");

let w = 600;
let h = 400;

let viz = d3.select("#container").append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("id", "svg")
;

d3.json("data.json").then(function gotData(incomingData){
  console.log("data loaded");
  let datagroups = brushArea.selectAll(".datapoint").data(incomingData).enter()
    .append("g")
    .attr("class", "datapoint")
    .attr("transform", function(d, i){
      return "translate(" + (i*(w/5)) + ", " + (h/2)  + ")"
    })
  ;

  // datagroups.append("rect")
  //   .attr("width", w/5)
  //   .attr("height", 50)
  //   .attr("class", "dataArea")
  //   .attr("x", 0)
  //   .attr("y", 0)
  // ;
});

let brush = d3.brushX()
  .extent([[0, h/2], [w, (h/2)+50]])
  .on("end", brushend)
;

let brushArea = viz.append("g")
  .attr("class", "brush")
  .call(brush)
  // default selection area
  .call(brush.move, [w/2, (w/2)+10])
;

// removes handle to resize the brush
d3.selectAll('.brush>.handle').remove();
// removes crosshair cursor
d3.selectAll('.brush>.overlay').remove();

//this is whenever a selection is done
function brushend(){
  console.log("hi");
}
