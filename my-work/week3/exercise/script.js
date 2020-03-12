let viz = d3.select('#viz-container')
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 400)
    .style("background-color", "lavender")
;

function randomX(){
  return Math.random() * 600;
}

function randomY(){
  return Math.random() * 400;
}

function randomGroupPosition(){
  let x = Math.random() * 600;
  let y = Math.random() * 400;
  return "translate(" + x + ", " + y + ")"
}

function gotData(incomingData){
  console.log("the incoming data is", incomingData);

  //you can put anything in selectAll(), but it is BEST to select "what you want to create"
                  // 0                10            10 [] []
    // viz.selectAll(".food").data(incomingData).enter()
    //   .append("rect")
    //     .attr("x", randomX)
    //     .attr("y", randomY)
    //     .attr("width", 20)
    //     .attr("height", 40)
    //     .attr("class", "food")
    // ;
    //
    // viz.selectAll(".foodText").data(incomingData).enter()
    //   .append("text")
    //     .attr("x", randomX)
    //     .attr("y", randomY)
    //     .text("food")
    //     .attr("fill", "red")
    //     .attr("class", "foodText")
    // ;

    //                              0                 10                 10
    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class", "datagroup")
    ;
    datagroups.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 21)
    ;
    datagroups.append("text")
        .attr("x", 30)
        .attr("y", 20)
        .text("Hello")
    ;
    datagroups.attr("transform", randomGroupPosition);
}

d3.json("data.json").then(gotData);
