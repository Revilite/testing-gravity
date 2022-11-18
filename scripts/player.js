const player = document.querySelector("#player");
const page = document.querySelector("body");


let position = .01;
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
  if (position >= 800) {
    position = 0;
  }
}

//upward force going up
const goUp = () => {
  if (upForce >= 0) {
    position -= upForce;
    player.style.setProperty("--height", `${position}px`);
    velocity = .005;
    upForce -= gravity;
  }
  else {
    console.log(upForce)
    upForce = 0;
    clearInterval(theLift)
    theFall = setInterval(goDown, 1);
  }
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
    if(theLift){
      clearInterval(theLift)
    }

    upForce = 2;
    clearInterval(theFall)
    theLift = setInterval(goUp, 1);
  }

})
