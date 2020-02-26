//my friends' data
let data = [
    {
        // "timestamp": "2020-02-24T14:46:54.831Z",
        "idealistic": 10,
        "passionate_energetic": 8,
        "openminded_flexible": 5,
        "creative": 10,
        "dedicated_hardworking": 10,
        "altruistic": 5,
        "impractical": 6,
        "emotional": 10,
        "touchy": 9,
        "difficult_to_know": 8
    },
    {
        // "timestamp": "2020-02-24T14:53:51.735Z",
        "idealistic": 10,
        "passionate_energetic": 9,
        "openminded_flexible": 7,
        "creative": 9,
        "dedicated_hardworking": 10,
        "altruistic": 5,
        "impractical": 3,
        "emotional": 6,
        "touchy": 1,
        "difficult_to_know": 2
    },
    {
        // "timestamp": "2020-02-24T14:59:16.966Z",
        "idealistic": 8,
        "passionate_energetic": 5,
        "openminded_flexible": 8,
        "creative": 10,
        "dedicated_hardworking": 10,
        "altruistic": 8,
        "impractical": 2,
        "emotional": 6,
        "touchy": 7,
        "difficult_to_know": 7
    },
    {
        // "timestamp": "2020-02-24T15:01:28.884Z",
        "idealistic": 8,
        "passionate_energetic": 9,
        "openminded_flexible": 7,
        "creative": 8,
        "dedicated_hardworking": 8,
        "altruistic": 6,
        "impractical": 4,
        "emotional": 5,
        "touchy": 7,
        "difficult_to_know": 4
    },
    {
        // "timestamp": "2020-02-24T15:10:02.801Z",
        "idealistic": 7,
        "passionate_energetic": 6,
        "openminded_flexible": 8,
        "creative": 10,
        "dedicated_hardworking": 10,
        "altruistic": 10,
        "impractical": 4,
        "emotional": 9,
        "touchy": 5,
        "difficult_to_know": 5
    },
    {
        // "timestamp": "2020-02-24T15:10:18.461Z",
        "idealistic": 9,
        "passionate_energetic": 8,
        "openminded_flexible": 6,
        "creative": 8,
        "dedicated_hardworking": 7,
        "altruistic": 5,
        "impractical": 5,
        "emotional": 7,
        "touchy": 8,
        "difficult_to_know": 3
    },
    {
        // "timestamp": "2020-02-24T15:23:51.522Z",
        "idealistic": 5,
        "passionate_energetic": 7,
        "openminded_flexible": 9,
        "creative": 9,
        "dedicated_hardworking": 9,
        "altruistic": 6,
        "impractical": 2,
        "emotional": 5,
        "touchy": 8,
        "difficult_to_know": 7
    },
    {
        // "timestamp": "2020-02-24T15:31:10.675Z",
        "idealistic": 9,
        "passionate_energetic": 10,
        "openminded_flexible": 10,
        "creative": 10,
        "dedicated_hardworking": 10,
        "altruistic": 6,
        "impractical": 3,
        "emotional": 8,
        "touchy": 5,
        "difficult_to_know": 3
    },
    {
        // "timestamp": "2020-02-24T15:41:08.972Z",
        "idealistic": 7,
        "passionate_energetic": 9,
        "openminded_flexible": 5,
        "creative": 7,
        "dedicated_hardworking": 8,
        "altruistic": 5,
        "impractical": 5,
        "emotional": 6,
        "touchy": 7,
        "difficult_to_know": 6
    },
    {
        // "timestamp": "2020-02-24T15:45:52.452Z",
        "idealistic": 7,
        "passionate_energetic": 8,
        "openminded_flexible": 8,
        "creative": 9,
        "dedicated_hardworking": 9,
        "altruistic": 3,
        "impractical": 1,
        "emotional": 4,
        "touchy": 9,
        "difficult_to_know": 5
    }
];

//my data, structure adjusted to look like transformedData[]
//currently dont't know how o
let myData = [
  {
    name: "idealistic",
    score: 9,
    each: [10, 10, 8, 8, 7, 9, 5, 9, 7, 7]
  },
  {
    name: "passionate_energetic",
    score: 6,
    each: [8, 9, 5, 9, 6, 8, 7, 10, 9, 8]
  },
  {
    name: "openminded_flexible",
    score: 5,
    each: [5, 7, 8, 7, 8, 6, 9, 10, 5, 8]
  },
  {
    name: "creative",
    score: 8,
    each: [10, 9, 10, 8, 10, 8, 9, 10, 7, 9]
  },
  {
    name: "dedicated_hardworking",
    score: 7,
    each: [10, 10, 10, 8, 10, 7, 9, 10, 8, 9]
  },
  {
    name: "altruistic",
    score: 5,
    each: [5, 5, 8, 6, 10, 5, 6, 6, 5, 3]
  },
  {
    name: "impractical",
    score: 5,
    each: [6, 3, 2, 4, 4, 5, 2, 3, 5, 1]
  },
  {
    name: "emotional",
    score: 6,
    each: [10, 6, 6, 5, 9, 7, 5, 8, 6, 4]
  },
  {
    name: "touchy",
    score: 9,
    each: [9, 1, 7, 7, 5, 8, 8, 5, 7, 9]
  },
  {
    name: "difficult_to_know",
    score: 4,
    each: [8, 2, 7, 4, 5, 3, 7, 3, 6, 5]
  }
];

function averageData(data){
  let newData = [];
  let keys = Object.keys(data[0]);
  //console.log(keys);

  //let eachFeature = [];
  let datum;
  //let numbers = [];

  //the features/descriptions
  for(let i = 0; i < keys.length; i++){
    //each feature
    let key = keys[i];
    console.log(key);

    let sum = 0;
    let num = 0;
    //the length of the array, excluding the last data set of my own data
    for(let j = 0; j < data.length; j++){
      datum = data[j];
      //console.log(datum);

      console.log(datum[key]);
      // numbers[j] = datum[key];
      // console.log(numbers);

      // let newFeature = {"name": key, "allData": numbers[10]};
      // console.log(newFeature);

      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  return newData;
}

//original array
console.log(data);
let transformedData = averageData(data);
//new array
console.log(transformedData);

//ready to change the text "hover on the bars" and the avg. numbers
let infpDescription = document.getElementById('shinyDescription');
let friendsAverage = document.getElementById('friends_avg');
let shinyScore = document.getElementById('my_score');
let allScore = document.getElementById('total');

//create bar chart
for (let i = 0; i < transformedData.length; i++) {
  let datapoint = transformedData[i];
  console.log('friend ' + datapoint.average);

  let myDatapoint = myData[i];
  console.log('me ' + myDatapoint.score);

  let bar = document.createElement('button');
  bar.className = 'bar';
  bar.style.height = datapoint.average * 10 + '%';

  //to put the description as text in the button, and make the text vertical
  bar.innerHTML = '<span>' + datapoint.name + '</span>';

  document.getElementById('viz').appendChild(bar);

  //change "hover on the bars" to clicked shiny's description
  bar.addEventListener('mouseover', () => {
    infpDescription.innerHTML = datapoint.name;
    friendsAverage.innerHTML = datapoint.average;
    shinyScore.innerHTML = myDatapoint.score;
    allScore.innerHTML = myDatapoint.each;
  }, false);
  bar.addEventListener('mouseout', () => {
    infpDescription.innerHTML = 'hover on the bars';
    friendsAverage.innerHTML = 'avg.';
    shinyScore.innerHTML = 'score.';
    allScore.innerHTML = 'all score';
  }, false);
}
