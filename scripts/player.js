const player = document.querySelector("#player");
const page = document.querySelector("body");
const title = document.querySelector("#title");
const scoreEL = document.querySelector("#score");
const startGame = document.querySelector("#startGame");

let position = 500;
let velocity = .005;
let gravity = 0.01807;
let gameCounter = 0;
let upForce;
let theLift;
let theFall;


//Gravity going down
const goDown = () => {
  clearInterval(theLift);
  position += velocity;
  player.style.setProperty("--height", `${position}px`);
  //setting termnial velocity
  if (velocity <= 10) {
    velocity += gravity
  }
  //Loop future height detection
  if (position >= window.innerHeight || position <= 0) {
    reset();
  }
}

//upward force going up
const goUp = () => {
  if (upForce >= 0) {
    // console.log(position)
    position -= upForce;
    player.style.setProperty("--height", `${position}px`);
    velocity = .005;
    upForce -= gravity;
  }
  else {
    upForce = 0;
    clearInterval(theLift)
    theFall = setInterval(goDown, 1);
  }
}

const reset = () => {
  clearInterval(theFall)
  clearInterval(theLift)
  clearInterval(gameStart)

  position = innerHeight / 2;
  player.style.setProperty("top", `${position}px`)
}

// Starting to fall
// theFall = setInterval(goDown, 1);

page.addEventListener("keydown", (e) => {


  console.log(e.key)
  if (e.key == "Enter") {
    clearInterval(theFall)
    clearInterval(theLift)
    clearInterval(gameStart)
  }
  if (e.key == "ArrowRight") {
    movePipe();
  }
});

page.addEventListener("pointerdown", (e) => {
    //clears spamming issue
    player.style.setProperty("visibility", "visible");
    title.style.setProperty("display", "none");
    scoreEL.style.setProperty("display", "none");
    startGame.style.setProperty("display", "none");
  

    if (theLift) {
      clearInterval(theLift)
    }

    upForce = 1.5;
    clearInterval(theFall)
    theLift = setInterval(goUp, 1);

    if (gameCounter == 0) {
      gameStart = setInterval(movePipe, 1);
      gameCounter++;
    }
  }
)
