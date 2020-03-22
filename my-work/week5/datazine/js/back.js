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

  let familyEmotionsData = [...new Set(incomingData.map(d => d.whatemotion))];
  let familyEmotionsColorScale = d3.scaleOrdinal(  d3.schemePaired  ).domain( familyEmotionsData );
  let myEmotionsData = [...new Set(incomingData.map(d => d.myemotion))];
  let myEmotionsColorScale = d3.scaleOrdinal(  d3.schemePaired  ).domain( myEmotionsData );

  let eyeGroup = viz.append("g")
                      .attr("class", "eyeGroup")
                      .attr("transform", positionGroup);
  ;

  let lash1 = eyeGroup
    .append("line")
      .attr("x1", 0)
      .attr("y1", 200)
      .attr("x2", 0)
      .attr("y2", -250)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "10 0")
      .style("stroke-dashoffset", 5)
  ;

  let lash2_1 = eyeGroup
    .append("line")
      .attr("x1", 100)
      .attr("y1", 170)
      .attr("x2", -100)
      .attr("y2", -220)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "30 30")
      .style("stroke-dashoffset", 12)
  ;

  let lash2_2 = eyeGroup
    .append("line")
      .attr("x1", -100)
      .attr("y1", 170)
      .attr("x2", 100)
      .attr("y2", -220)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "30 30")
      .style("stroke-dashoffset", 12)
  ;

  let lash3_1 = eyeGroup
    .append("line")
      .attr("x1", 190)
      .attr("y1", 120)
      .attr("x2", -190)
      .attr("y2", -160)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "10 10")
      .style("stroke-dashoffset", 5)
  ;

  let lash3_2 = eyeGroup
    .append("line")
      .attr("x1", -190)
      .attr("y1", 120)
      .attr("x2", 190)
      .attr("y2", -160)
      .style("stroke", "white")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "10 10")
      .style("stroke-dashoffset", 5)
  ;

//family emotions
  let familyEmotionGroups = viz
    .append("g")
      .attr("class", "familyEmotionGroups")
      .attr("transform", positionGroup);
  ;

  familyEmotionGroups.append("clipPath")
        .attr("id", "cut-family-emotion")
        .append("rect")
          .attr("x", 0)
          .attr("y", - h/2)
          .attr("width", w/2)
          .attr("height", h/2)
  ;

  let familyGroups = familyEmotionGroups.selectAll(".emotion").data(familyEmotionsData).enter();

  familyGroups.append("path")
                .attr("id", (d, i) => ("family" + i))
                .attr("d", familyEmotionPos)
                .attr("fill", "none")
                .style("stroke", (d, i) => familyEmotionsColorScale(familyEmotionsData[i]))
                .style("stroke-width", 2.5)
                .attr("clip-path", "url(#cut-family-emotion)")
  ;

  familyGroups.append("text")
                .append("textPath")
                  .attr("xlink:href", (d, i) => ("#family" + i))
                  .attr("startOffset", "97%")
                  .text((d, i) => d)
                  .attr("text-anchor", "end")
                  .attr("class", "description")
                  .attr("x", w/2 - 100)
                  .attr("y", (d, i) => ((-150) - (i+1)*20))
  ;

//my emotions
  let myEmotionGroups = viz
    .append("g")
      .attr("class", "myEmotionGroups")
      .attr("transform", positionGroup);
  ;

  myEmotionGroups.append("clipPath")
        .attr("id", "cut-my-emotion")
        .append("rect")
          .attr("x", - w/2)
          .attr("y", 0)
          .attr("width", w/2 - 150)
          .attr("height", h/2)
  ;

  let myGroups = myEmotionGroups.selectAll(".emotion").data(myEmotionsData).enter();

  myGroups.append("path")
            .attr("id", (d, i) => ("my" + i))
            .attr("d", myEmotionPos)
            .attr("fill", "none")
            .style("stroke", (d, i) => myEmotionsColorScale(myEmotionsData[i]))
            .style("stroke-width", 2.5)
            .attr("clip-path", "url(#cut-my-emotion)")
  ;

  myGroups.append("text")
            .append("textPath")
              .attr("xlink:href", (d, i) => ("#my" + i))
              .attr("startOffset", "3%")
              .text((d, i) => d)
              .attr("class", "description")
              .attr("x", 100)
              .attr("y", (d, i) => (150 + (i+1)*20))
  ;

//family emotion above the eye
  eyeGroup.append("path")
            .attr("id", "familyEyebrow")
            .attr("d", "M -600 -150 L 0 -300 L 600 -150")
            .attr("fill", "none")
            //this "green" is a placeholder
            .style("stroke", "green")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("text")
            .append("textPath")
              .attr("xlink:href", "#familyEyebrow")
              .attr("startOffset", "3%")
              .text("mom dad bro sis popo")
              .attr("class", "label")
  ;

//night time border around eyeball
//using a rectangle to clip a circle
  let night = eyeGroup.append("defs");

  night.append("clipPath")
        .attr("id", "cut-off-left")
        .append("rect")
          .attr("x", -150)
          .attr("y", -150)
          .attr("width", 150)
          .attr("height", 300)
  ;

  let nightGradient = night
    .append("linearGradient")
      .attr("id", "nightGradient")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 1)
  ;

  nightGradient.append("stop")
                .style("stop-color", "#113285")
                .attr("offset", "0%")
  ;

  nightGradient.append("stop")
                .style("stop-color", "#08192D")
                .attr("offset", "100%")
  ;

  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 150)
            .style("fill", "url(#nightGradient)")
            .attr("clip-path", "url(#cut-off-left)")
  ;

//day time border around eyeball
//using a rectangle to clip a circle
  let day = eyeGroup.append("defs");

  day.append("clipPath")
      .attr("id", "cut-off-right")
      .append("rect")
        .attr("x", 0)
        .attr("y", -150)
        .attr("width", 150)
        .attr("height", 300)
  ;

  let dayGradient = day
    .append("linearGradient")
      .attr("id", "dayGradient")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 1)
  ;

  dayGradient.append("stop")
                .style("stop-color", "#FFC408")
                .attr("offset", "0%")
  ;

  dayGradient.append("stop")
                .style("stop-color", "#F05E1C")
                .attr("offset", "100%")
  ;

  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 150)
            .style("fill", "url(#dayGradient)")
            .attr("clip-path", "url(#cut-off-right)")
  ;

//virtual call
  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 120)
            .style("fill", "green")
  ;

//eyeball
  eyeGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 100)
  ;

//my emotion under the eye
  eyeGroup.append("path")
            .attr("id", "myEyebrow")
            .attr("d", "M -600 150 q 600 200 1200 0")
            .attr("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 2.5)
  ;

  eyeGroup.append("text")
            .append("textPath")
              .attr("xlink:href", "#myEyebrow")
              .attr("startOffset", "3%")
              .text("no emotion")
              .attr("class", "description")
  ;


  eyeGroup.append("text")
            .append("textPath")
              .attr("xlink:href", "#myEyebrow")
              .attr("startOffset", "97%")
              .text("shiny shuan-yi wu")
              .attr("text-anchor", "end")
              .attr("class", "label")
  ;

  eyeGroup.append("text")
            .text(incomingData.length)
            .attr("fill", "white")
            .attr("x", -90)
            .attr("y", 350)
            .style("font-size", 100)
            .style("font-family", "Helvetica")
            .style("font-weight", "lighter")
  ;

  let personGroup = viz.append("g")
                      .attr("class", "personGroup")
                      .attr("transform", positionGroup);
  ;

  //mom
  personGroup.append("defs")
              .append("clipPath")
                .attr("id", "cut-off-mom")
                .append("rect")
                  .attr("x", -100)
                  .attr("y", -100)
                  .attr("width", 40)
                  .attr("height", 200)
  ;
  personGroup.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 100)
              .style("fill", "#d62d20")
              .attr("clip-path", "url(#cut-off-mom)")
  ;

  personGroup.append("text")
              .text("<mom>")
              .attr("class", "description")
              .attr("x", -30)
              .attr("y", -75)
              .attr("transform", "rotate(-90)")
  ;

  //popo
  personGroup.append("defs")
              .append("clipPath")
                .attr("id", "cut-off-popo")
                .append("rect")
                  .attr("x", -60)
                  .attr("y", -100)
                  .attr("width", 40)
                  .attr("height", 200)
  ;
  personGroup.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 100)
              .style("fill", "#ffa700")
              .attr("clip-path", "url(#cut-off-popo)")
  ;

  personGroup.append("text")
              .text("<popo>")
              .attr("class", "description")
              .attr("x", -32)
              .attr("y", -37)
              .attr("transform", "rotate(-90)")
  ;

  //brother
  personGroup.append("defs")
              .append("clipPath")
                .attr("id", "cut-off-bro")
                .append("rect")
                  .attr("x", -20)
                  .attr("y", -100)
                  .attr("width", 40)
                  .attr("height", 200)
  ;
  personGroup.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 100)
              .style("fill", "#008744")
              .attr("clip-path", "url(#cut-off-bro)")
  ;

  personGroup.append("text")
              .text("<brother>")
              .attr("class", "description")
              .attr("x", -38)
              .attr("y", 3)
              .attr("transform", "rotate(-90)")
  ;

  //dad
  personGroup.append("defs")
              .append("clipPath")
                .attr("id", "cut-off-dad")
                .append("rect")
                  .attr("x", 20)
                  .attr("y", -100)
                  .attr("width", 40)
                  .attr("height", 200)
  ;
  personGroup.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 100)
              .style("fill", "#0057e7")
              .attr("clip-path", "url(#cut-off-dad)")
  ;

  personGroup.append("text")
              .text("<dad>")
              .attr("class", "description")
              .attr("x", -28)
              .attr("y", 44)
              .attr("transform", "rotate(-90)")
  ;

  //sister
  personGroup.append("defs")
              .append("clipPath")
                .attr("id", "cut-off-sis")
                .append("rect")
                  .attr("x", 60)
                  .attr("y", -100)
                  .attr("width", 40)
                  .attr("height", 200)
  ;
  personGroup.append("circle")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", 100)
              .style("fill", "#dee1e6")
              .attr("clip-path", "url(#cut-off-sis)")
  ;

  personGroup.append("text")
              .text("<sister>")
              .attr("class", "description")
              .attr("x", -31)
              .attr("y", 84)
              .attr("transform", "rotate(-90)")
  ;

  eyeGroup.append("line")
                    .attr("x1", w / 2)
                    .attr("y1", h / 2)
                    .attr("x2", w / 2)
                    .attr("y2", h/2 + 200)
                    .style("stroke", "white")
                    .style("stroke-width", 2.5)
  ;

  let descriptionGroup = viz
    .append("g")
      .attr("class", "descriptionGroup")
  ;

  descriptionGroup.append("text")
                    .text("<length of conversation by words>")
                    .attr("class", "description")
                    .attr("x", w / 2)
                    .attr("y", h - 20)
                    .attr("text-anchor", "middle")
  ;

  descriptionGroup.append("text")
                    .text("<night>")
                    .attr("class", "description")
                    .attr("x", w/2 - 160)
                    .attr("y", h / 2)
                    .attr("text-anchor", "end")
  ;

  descriptionGroup.append("text")
                    .text("<day>")
                    .attr("class", "description")
                    .attr("x", w/2 + 160)
                    .attr("y", h / 2)
                    .attr("text-anchor", "start")
  ;

  descriptionGroup.append("line")
                    .attr("x1", w / 2)
                    .attr("y1", h / 2 + 110)
                    .attr("x2", w / 2)
                    .attr("y2", h / 2 + 200)
                    .style("stroke", "white")
                    .style("stroke-width", 2.5)
  ;

  descriptionGroup.append("text")
                    .text("<virtual call between US & TW>")
                    .attr("class", "description")
                    .attr("x", w / 2)
                    .attr("y", h / 2 + 220)
                    .attr("text-anchor", "middle")
  ;

  descriptionGroup.append("text")
                    .text("<eye contact>")
                    .attr("class", "description")
                    .attr("x", w / 2)
                    .attr("y", 140)
                    .attr("text-anchor", "middle")
  ;

  descriptionGroup.append("text")
                    .text(">3s")
                    .attr("class", "description")
                    .attr("x", w/2 + 10)
                    .attr("y", 170)
  ;

  descriptionGroup.append("text")
                    .text("1-3s")
                    .attr("class", "description")
                    .attr("x", w/2 + 100)
                    .attr("y", 210)
  ;

  descriptionGroup.append("text")
                    .text("<1s")
                    .attr("class", "description")
                    .attr("x", w/2 + 180)
                    .attr("y", 270)
  ;

  descriptionGroup.append("text")
                    .text("<emotion>")
                    .attr("class", "description")
                    .attr("x", w - 110)
                    .attr("y", 620)
  ;

  descriptionGroup.append("text")
                    .text("<emotion>")
                    .attr("class", "description")
                    .attr("x", 30)
                    .attr("y", 180)
  ;
}

function positionGroup(d, i){
  let x = w / 2;
  let y = h / 2;
  return "translate("+ x +", "+ y +")"
}

function familyEmotionPos(d, i){
  let sideY = (-150) - (i+1)*16.5;
  let middleY = (-300) - (i+1)*8;
  return "M -600 " + sideY + " L 0 " + middleY + " L 600 " + sideY
}

function myEmotionPos(d, i){
  let sideY = 155 + (i+1)*18;
  let middleY = 300 + (i+1)*8;
  return "M -600 " + sideY + " L 0 " + middleY + " L 600 " + sideY
}

d3.json("data.json").then(gotData);
