let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

function gotData(incomingData){
  // all the data:
  console.log(incomingData);

  function filterFunction(datapoint){
    //console.log(datapoint);
    if (datapoint.Code == "USA" || datapoint.Code == "CHN") {
      return true
    } else {
      return false
    }
  }
  let filteredData = incomingData.filter(filterFunction);
  console.log("filteredData", filteredData);

  //JS Date Objects
  let yearToDateObjectConverter = d3.timeParse("%Y");
  let test = yearToDateObjectConverter("2019");
  console.log(test);

  // 14:04
  // let convertHoursAndMinutes = d3.timeParse("%H:%M");
  // let testtest = convertHoursAndMinutes("19:22");
  // console.log(testtest);

  function mapFunction(datapoint){
    datapoint.Year = yearToDateObjectConverter(datapoint.Year);
    datapoint["Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"] = parseFloat(datapoint["Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"])
    return datapoint
  }
  let filteredAndTimeAdjustedData = filteredData.map(mapFunction);

  console.log("filteredAndTimeAdjustedData", filteredAndTimeAdjustedData);

  function findTime(datapoint){
    return datapoint.Year
  }

  //X Scale

  //MIN
  let minTime = d3.min(filteredAndTimeAdjustedData, findTime);
  console.log(minTime);

  //MAX
  let maxTime = d3.max(filteredAndTimeAdjustedData, findTime);
  console.log(maxTime);

  //Get Extent (min and max at the same time)
  let alternativeXDomain = d3.extent(filteredAndTimeAdjustedData, findTime);
  console.log(alternativeXDomain);

  let xPadding = 60;
  //let xScale = d3.scaleTime().domain([minTime, maxTime]).range([xPadding, w - xPadding]);
  let xScale = d3.scaleTime().domain(alternativeXDomain).range([xPadding, w - xPadding]);
  console.log(xScale(yearToDateObjectConverter("2001")));

  // X AXIS
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);

  let xAxisYPos = h-30;
  xAxisGroup.attr("transform", "translate(0, "+xAxisYPos+")");


  //Y Scale

  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";
  console.log(filteredAndTimeAdjustedData[0][valueKey]);

  function getCaseCount(datapoint){
    return datapoint[valueKey];
  }
  let hivCaseCountExtent = d3.extent(filteredAndTimeAdjustedData, getCaseCount);
  console.log("hivCaseCountExtent", hivCaseCountExtent);

  let yPadding = 50;
  let yScale = d3.scaleLinear().domain(hivCaseCountExtent).range([h-yPadding, yPadding]);

  //Y AXIS
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+ (xPadding-15) +", 0)");


  let vizGroup = viz.append("g").attr("class", "vizGroup");

  let dataGroups = vizGroup.selectAll(".datagroup").data(filteredData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  function getColor(d, i){
    if (d.Code === "CHN") {
      return "red"
    } else {
      return "grey"
    }
  }

  // let circles = dataGroups.append("circle")
  //   .attr("cx", 0)
  //   .attr("cy", 0)
  //   .attr("r", 5)
  //   .attr("fill", getColor)
  // ;



  let shape = `<polygon points="61.93 108.58 54.08 196.51 165.57 218.49 297.64 253.04 200.11 168.25 335.16 180.81 335.16 135.27 272.35 108.58 229.95 33.2 176.56 97.58 61.93 108.58" style="fill: #231f20"/>
  <polygon points="205.63 33.2 167.45 80.25 71.6 88.82 48.22 88.82 41.2 160.52 9.25 43.62 127.7 16.35 205.63 33.2" style="fill: #231f20"/>
  <polygon points="259.4 59.21 282 94.28 323.3 111.42 329.54 24.14 238.36 33.2 259.4 59.21" style="fill: #231f20"/>
  <path d="M62.24,244.68s330.15,49.94,205-56.11S36.78,14.1,178.89,71.68,360.71,38.17,360.71,38.17" style="fill: none;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 13px"/>`;

  let customShapes = dataGroups.append("g").attr("class", "customShape").html(shape);
  customShapes.attr("transform", "scale(0.25)");

  customShapes.select("path").attr("stroke", getColor);


  function getCountryCode(d, i){
    return d.Code
  }

  // let countryLabel = dataGroups.append("text")
  //   .attr("x", 7)
  //   .attr("y", 9)
  //   .text(getCountryCode)
  // ;

  // function getYear(d, i){
  //   return d.Year.getFullYear();
  // }
  //
  // let yearLabel = dataGroups.append("text")
  //   .attr("x", 7)
  //   .attr("y", 23)
  //   .text(getYear)
  // ;

  function getTranslate(d, i){
    let x = xScale(d.Year);
    let y = yScale(d[valueKey]);
    return "translate(" + x + ", " + y + ")"
  }
  dataGroups.attr("transform", getTranslate);

}

d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
