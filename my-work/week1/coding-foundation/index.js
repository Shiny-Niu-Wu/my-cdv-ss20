let button = document.getElementById('getEnterValue');
let enterValue = document.getElementById('allSquares');

//every new box created has to have a unique key, if for further manipulation
let boxId;

//when the button "create" is clicked, it saves the entered number input as a parathesis called 'box'.
button.addEventListener('click', box => {
  box = document.getElementById('numberOfBox').value;
  console.log(box);
  //"boxes" are the newly created boxes, each of them with a unique key called 'boxID'
  let boxes;
  //clear the previous result number of boxes. do this before creating new boxes
  enterValue.innerHTML = '';
  //create new boxes
  for (boxId = 0; boxId < box; boxId++) {
    boxes = document.createElement('div');
    boxes.className = 'square';
    boxes.id = boxId;
    enterValue.appendChild(boxes);
  };
}, true);

// code below for crazy mode
// !!!!!have not finished!!!!!
// let modeToggle = document.getElementById('changeMode');
