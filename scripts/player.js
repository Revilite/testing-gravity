const player = document.querySelector("#player");
const page = document.querySelector("body");


let position = 500 ;
let velocity = .005;
let gravity = 0.01807;
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
    position = window.innerHeight / 2 + 200;
    // clearInterval(theFall)
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
  
  position = 500;
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

  if (e.key == "w") {
    //clears spamming issue
    if (theLift) {
      clearInterval(theLift)
    }

    upForce = 1.5;
    clearInterval(theFall)
    theLift = setInterval(goUp, 1);
  }
  if (e.key == "ArrowRight"){
    movePipe();
  }

})
