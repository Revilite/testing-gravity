const pipeArea = document.querySelector("#pipeGeneration")
let startingPostion = 1000;
let pipePosition = 1000;
let gameStart;
let speedCounter = 0;
let speed = 1;

const createPipe = () => {
  const pipe = document.createElement("div");
  const opening = document.createElement("div");
  pipePosition = 1000;

  pipe.style.setProperty("position", "absolute")
  pipe.style.setProperty("background-color", "darkGreen");
  pipe.style.setProperty("height", "100vh");
  pipe.style.setProperty("width", "100px");
  pipe.style.setProperty("margin", "0px");
  pipe.style.setProperty("left", `${startingPostion}px`);
  pipe.classList.add("pipe");

  opening.style.setProperty("position", "absolute");
  opening.style.setProperty("background-col")

  pipeArea.appendChild(pipe);
}


const movePipe = () => {

  // Pipe Generation
  // Pipe generation formula (pipepostion / speed) + 100
  const formula = (startingPostion / speed) + 100
  if (speedCounter % formula == 0) {
    createPipe();
  }

  speedCounter++;


  // Pipe Speed
  const pipe = pipeArea.lastElementChild;
  pipePosition -= speed;
  pipe.style.setProperty("left", `${pipePosition}px`)

}

gameStart = setInterval(movePipe, 1);

// movePipe();




