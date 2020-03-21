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

viz.append("text")
    .text("eye")
    .attr("fill", "white")
    .attr("x", w * 0.95)
    .attr("y", h / 2)
    .style("font-size", 20)
    .style("font-family", "Helvetica")
;

viz.append("text")
    .text("眼")
    .attr("fill", "white")
    .attr("x", w * 0.02)
    .attr("y", h / 2)
    .style("font-size", 20)
    .style("font-family", "Helvetica")
;

viz.append("text")
    .text("contact")
    .attr("fill", "white")
    .attr("x", w * 0.2)
    .attr("y", h / 1.3)
    .style("font-size", 20)
    .style("font-family", "Helvetica")
;

viz.append("text")
    .text("連結")
    .attr("fill", "white")
    .attr("x", w * 0.6)
    .attr("y", h / 10)
    .style("font-size", 20)
    .style("font-family", "Helvetica")
;

viz.append("path")
    .attr("d", "M 72 40 L 84 25 L 96 40")
    .attr("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2.5)
;

viz.append("path")
    .attr("d", "M 672 500 L 684 515 L 696 500")
    .attr("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2.5)
;

viz.append("path")
    .attr("d", "M 255 750 q 14 25 28 0")
    .attr("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2.5)
;

viz.append("path")
    .attr("d", "M 855 150 q 14 25 28 0")
    .attr("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2.5)
;

viz.append("path")
    .attr("d", "M 1143 765 q 14 -25 28 0")
    .attr("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2.5)
;

function gotData(incomingData){
  console.log("data loaded");

  let eyeGroup = viz
                  .append("g")
                    .attr("class", "eyeGroup")
                    .attr("transform", positionGroup);
  ;

  eyeGroup.append("line")
            .attr("x1", 0)
            .attr("y1", 25)
            .attr("x2", 0)
            .attr("y2", -25)
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("line")
            .attr("x1", 13)
            .attr("y1", 18)
            .attr("x2", -13)
            .attr("y2", -18)
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("line")
            .attr("x1", -13)
            .attr("y1", 18)
            .attr("x2", 13)
            .attr("y2", -18)
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 13)
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("text")
            .text(incomingData.length)
            .attr("fill", "white")
            .attr("x", 0)
            .attr("y", 70)
            .attr("text-anchor", "middle")
            .style("font-size", 20)
            .style("font-family", "Helvetica")
  ;

  //"M x y q a c b 0"
  //x is x axis starting point position
  //y is y axis position
  //b = a * 2
  //if c > 0 arc opens upward, if c < 0 arc opens downward
  eyeGroup.append("path")
            .attr("id", "arc")
            .attr("d", "M -14 -25 q 14 -20 28 0")
            .attr("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("path")
            .attr("id", "straightLine")
            .attr("d", "M -12 25 L 0 40 L 12 25")
            .attr("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;
}

function positionGroup(d, i){
  let x = w / 2;
  let y = h / 2;
  return "translate("+ x +", "+ y +")"
}

d3.json("data.json").then(gotData);
