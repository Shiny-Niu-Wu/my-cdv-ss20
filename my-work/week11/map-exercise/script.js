let w = window.innerWidth;
let h = window.innerHeight * 0.95;
let padding = 30;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "black")
;

let descriptionGroup = viz
  .append("g")
  .attr("class", "descriptionGroup")
;

//Title
let title = descriptionGroup.append("text")
  .attr("x", w-padding)
  .attr("y", padding)
  .attr("fill", "#bbbbbb")
  .attr("font-size", 14)
  .attr("font-family", "Helvetica Neue")
  .style("text-anchor", "end")
;

title.append("tspan")
  .text("Taiwan's administrative division")
  .attr("x", w-padding)
  .attr("dy", "1.2em")
;
title.append("tspan")
  .text("and population density in 2016")
  .attr("x", w-padding)
  .attr("dy", "1.2em")
;

//ranking
let ranking = descriptionGroup.append("text")
  .attr("x", w-padding*3)
  .attr("y", h-padding*4)
  .attr("fill", "#bbbbbb")
  .attr("font-size", 14)
  .attr("font-family", "Helvetica Neue")
  .style("text-anchor", "end")
;
ranking.append("tspan")
  .text("Taiwan Average: 652")
  .attr("x", w-padding)
  .attr("dy", "1.2em")
;
ranking.append("tspan")
  .text("Density ranked 19th on Earth")
  .attr("x", w-padding)
  .attr("dy", "1.2em")
;
ranking.append("tspan")
  .text("2nd highest density for population above 10 million")
  .attr("x", w-padding)
  .attr("dy", "1.2em")
;

let strategyIndex = 0;

  // IMPORT DATA
  d3.json("鄉鎮市區行政區域界線_simplified.json").then(function(geoDataTW){
    d3.csv("taiwan-pop-density.csv").then(function(incomingDataTW){
      // d3.json("countries.geojson").then(function(geoDataWorld){
      //   d3.json("world-pop-density.csv").then(function(incomingDataWorld){

          // PRINT DATA
          console.log(geoDataTW);
          //console.log(incomingDataTW);

          //turn population string into numbers
          //so we can compare the min value
          incomingDataTW = incomingDataTW.map(function(d, i){
            d.population_density = Number(d.population_density);
            return d
          });
          //getting rid of the incomplete data
          incomingDataTW = incomingDataTW.slice(1, -7);
          console.log("new", incomingDataTW);

          let minDense = d3.min(incomingDataTW, function(d, i){
            return d.population_density
          });
          console.log("minDense", minDense);
          let maxDense = d3.max(incomingDataTW, function(d, i){
            return d.population_density
          });
          console.log("maxDense", maxDense);
          let colorScale = d3.scaleSequential( d3.interpolateTurbo ).domain([minDense, maxDense]);
          //console.log(colorScale(20));

          //bar range numbers at the bottom of page
          descriptionGroup.append("text")
            .text(minDense.toString())
            .attr("x", padding)
            .attr("y", h - 14)
            .attr("fill", "#bbbbbb")
            .attr("font-size", 28)
            .attr("font-family", "Helvetica Neue")
            .style("text-anchor", "start")
          ;
          descriptionGroup.append("text")
            .text(maxDense.toString())
            .attr("x", w-padding)
            .attr("y", h - 14)
            .attr("fill", "white")
            .attr("font-size", 28)
            .attr("font-family", "Helvetica Neue")
            .style("text-anchor", "end")
          ;
          descriptionGroup.append("text")
            .text("Arithmetic Density (population/km²)")
            .attr("x", w / 2)
            .attr("y", h - 14)
            .attr("fill", "#bbbbbb")
            .attr("font-size", 14)
            .attr("font-family", "Helvetica Neue")
            .attr("text-anchor", "middle")
          ;

          descriptionGroup.append("text")
            .text("World Average: 14.64")
            .attr("x", padding)
            .attr("y", h - padding*2)
            .attr("fill", "#bbbbbb")
            .attr("font-size", 14)
            .attr("font-family", "Helvetica Neue")
            .attr("text-anchor", "start")
          ;

          let lat = 25.0765;
          let lon = 121.2310;

          let projectionStrategy = [
            {projection: d3.geoEquirectangular()},
            {projection: d3.geoEqualEarth()}
          ];

          let projection = projectionStrategy[strategyIndex].projection
            .translate([w/2, h/2])
            .center([lon, lat])
            .fitExtent([[padding, padding], [w-padding, h-padding]], geoDataTW)
          ;

          let pathMaker = d3.geoPath(projection);

          let mapPathGroup = viz
            .append("g")
            .attr("class", "mapPathGroup")
          ;

        function drawMap(){
          let border = mapPathGroup.selectAll(".area").data(geoDataTW.features);

          border.enter()
            .append("path")
              .attr("class", "area")
              .attr("d", pathMaker)
              .attr("stroke", "white")
              .attr("stroke-width", "0.5px")
              .attr("fill", function(d, i){
                let matchedPlace = incomingDataTW.find(function(datapoint){
                  //console.log(datapoint);
                  let countyAndTown = d.properties.C_Name + d.properties.T_Name;
                  if (datapoint.site_id === countyAndTown) {
                    return true
                  } else {
                    return false
                  }
                });
                if (matchedPlace != undefined) {
                  //console.log(matchedPlace.population_density);
                  return colorScale(matchedPlace.population_density)
                } else {
                  return "black"
                }
              })
              //need to figure out
              //how to keep the ZOOMED in a designated area/box
              .on("mouseover", function(d, i){
                d3.select(this)
                  //.style("transform", "translate(" + w*0.7 + ", " + h*0.5 + ")")
                  .style("transform", "scale(1.3)")
                  .style("stroke-width", "1px")
                ;
                // let mousePos = d3.mouse(this);
                //
                // mapPathGroup.append("text")
                //   .text(function(d, i){
                //     let text;
                //     let matchedPlace = incomingDataTW.find(function(datapoint){
                //       text = datapoint.population_density.toString()
                //     });
                //     return text
                //   })
                //   .attr("x", mousePos[0])
                //   .attr("y", mousePos[1])
                //   .style("fill", "white")
                //   .style("font-size", 28)
                // ;
              })

              .on("mouseout", function(d, i){
                d3.select(this)
                  .style("transform", "scale(1)")
                  .style("stroke-width", "0.5px")
                ;
                mapPathGroup.select("text").remove();
              })
          ;

          //updating
          projection = projectionStrategy[strategyIndex].projection
            .translate([w/2, h/2])
            .center([lon, lat])
            .fitExtent([[padding, padding], [w-padding, h-padding]], geoDataTW)
          ;

          pathMaker = d3.geoPath(projection);

          border.transition()
            .attr("d", pathMaker)
            .duration(500)
          ;
        }

        document.getElementById("projection1").addEventListener("click", function(){
          strategyIndex = 0;
          drawMap();
        });
        document.getElementById("projection2").addEventListener("click", function(){
          strategyIndex = 1;
          drawMap();
        });
        //this is to draw a map at the first place, without clicing buttons
        drawMap();
    //   })
    // })
  })
})
