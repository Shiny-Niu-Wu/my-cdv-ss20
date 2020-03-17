//two pages wide
let w = 1200;
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

  let eyeGroup = viz
                  .append("g")
                    .attr("class", "eyeGroup")
  ;

//family emotion above the eye
  eyeGroup.append("path")
            .attr("id", "straightLine")
            .attr("d", "M -600 -150 L 0 -300 L 600 -150")
            .attr("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

// //night time border around eyeball
//   eyeGroup.append("path")
//             .attr("id", "arc")
//             .attr("d", "M -150 50 q 50 75 50 150")
//             .attr("fill", "none")
//             .style("stroke", "white")
//             .style("stroke-width", 2.5)
//   ;

//eyeball
  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 100)
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

//my emotion under the eye
  eyeGroup.append("path")
            .attr("id", "arc")
            .attr("d", "M -600 150 q 600 200 1200 0")
            .attr("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("text")
            .text(incomingData.length)
            .attr("fill", "white")
            .attr("x", -80)
            .attr("y", 350)
            .style("font-size", 100)
            .style("font-family", "Helvetica")
  ;

  function positionGroup(d, i){
    let x = w / 2;
    let y = h / 2;
    return "translate("+ x +", "+ y +")"
  }
  eyeGroup.attr("transform", positionGroup);
}

d3.json("data.json").then(gotData);
