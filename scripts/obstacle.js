const pipeArea = document.querySelector("#pipeGeneration")

let startingPostion = 1000;
let pipePosition = 1000;
let gameStart;
let speedCounter = 0;
let speed = 1;
let openingPostition;
let openingGap = 150;
let score = 0;


if (innerWidth > 425) {
  speed = 2;
  startingPostion = 2000;
}


const createPipe = () => {
  openingPostition = Math.floor(Math.random() * 80);
  // openingPostition = 50
  const pipe = document.createElement("div");
  const opening = document.createElement("div");
  if (innerWidth <= 425) {
    pipePosition = 1000;
  }
  else {
    pipePosition = 2000;
  }


  pipe.style.setProperty("position", "absolute")
  pipe.style.setProperty("background-image", "url('sprites/pipe.png')")
  pipe.style.setProperty("height", "100vh");
  pipe.style.setProperty("width", "100px");
  pipe.style.setProperty("margin", "0px");
  pipe.style.setProperty("left", `${startingPostion}px`);
  pipe.classList.add("pipe");

  opening.style.setProperty("position", "absolute");
  opening.style.setProperty("background-image", "url('sprites/opening.png')");
  opening.style.setProperty("background-size", "cover");
  opening.style.setProperty("height", `${openingGap}px`);
  opening.style.setProperty("width", "100px");
  opening.style.setProperty("top", `${openingPostition}%`)
  opening.style.setProperty("left", `${startingPostion}px`);

  opening.classList.add("opening");
  pipeArea.appendChild(pipe);
  pipeArea.appendChild(opening);
}


const movePipe = () => {

  // Pipe Generation
  // Pipe generation formula (pipepostion / speed) + 100
  if (innerWidth <= 425) {
    const formula = (startingPostion / speed) + 100;
    if (speedCounter % formula == 0) {
      createPipe();
    }
  }

  else {
    const formula = (startingPostion / speed) + 100;
    if (speedCounter % formula == 0) {
      createPipe();
    }
  }
  speedCounter++;


  // Pipe Speed
  const pipe = document.querySelectorAll(".pipe");
  const opening = document.querySelectorAll(".opening")

  const openingDetection = opening[opening.length - 1].getBoundingClientRect();
  const pipeDetection = pipe[pipe.length - 1].getBoundingClientRect();
  const playerDetection = player.getBoundingClientRect();

  pipePosition -= speed;
  pipe[pipe.length - 1].style.setProperty("left", `${pipePosition}px`)
  opening[pipe.length - 1].style.setProperty("left", `${pipePosition}px`)

  // console.log(pipe[pipe.length - 1].offsetLeft)

  if (Math.floor(playerDetection.right) >= openingDetection.left &&
    Math.floor(playerDetection.left) <= openingDetection.right) {
    if (Math.floor(playerDetection.bottom < openingDetection.bottom && playerDetection.top > openingDetection.top)) {
      if(Math.floor(playerDetection.left) == openingDetection.right){
      console.log("score hit")
      score++;
    }
    }
    else {
      reset();
    }
  }


}

gameStart = setInterval(movePipe, 1);




