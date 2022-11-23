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
let modalWrap = null;



const showModal = (score) => {
  if (modalWrap != null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement("div");
  modalWrap.innerHTML = `
  <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">  
    <div class="modal-content" id="entireModal"> 
      <div class="" id="modalHeader">
        <h1 class="text-center px-5 mx-5" id="exampleModalLabel">You Died</h1>
      </div>
      <div class="modal-body text-center" id="modalBody">
      <h1>
      Hi-Score: ${localStorage.getItem("score")}
      </h1>
      <h1> Score: ${score} </h1>
      </div>
        <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
  `;
  document.body.appendChild(modalWrap);
  const modal = new bootstrap.Modal(modalWrap.querySelector(".modal"));
  modal.show();
}


//Gravity going downs
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
  if (position >= window.innerHeight || position <= 0) {
    reset();
  }

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
  //Clears game items and actions
  clearInterval(theFall)
  clearInterval(theLift)
  clearInterval(gameStart)
  const pipes = document.querySelectorAll(".pipe")
  const openings = document.querySelectorAll(".opening")

  for(let i of pipes){
    i.remove();
  }
  for(let i of openings){
    i.remove();
  }
  
  player.style.setProperty("visibility", "hidden");
  title.style.setProperty("display", "block");
  scoreEL.style.setProperty("display", "block");
  startGame.style.setProperty("display", "block");

  const middle = window.innerHeight / 2;
  position = middle;
  //shows death modal and resets game counter
  showModal(score);
  gameCounter = 0;
  score = 0;
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
    showModal();
  }
});

page.addEventListener("pointerdown", (e) => {
  let modalChecker;
  for (let i = 0; i < e.composedPath().length; i++) {
    if (e.composedPath()[i].id == "exampleModal") {
      modalChecker = true;
    }
  }

  if (!modalChecker) {
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
}
)
