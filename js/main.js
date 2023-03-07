init();
/*----- constants -----*/
const player = {
  tile: 0,
  speed: 0,
};
const computer = {
  tile: 0,
  speed: 0,
};

/*----- state variables -----*/
let winner;
let playerPiece;
let computerPiece;
let turnCounter;
let imgMove = 0;
let inputValues;

/*----- cached elements  -----*/
const buttonP1 = document.querySelector("#p1");
const trackBoxEl = document.querySelector(".track");
const trackStart = document.querySelector(".start-box");
const titleBoxEl = document.querySelector(".title-box");
const eventBoxEl = document.querySelector(".event-box");
const rollDiceButtonEl = document.createElement("button");
rollDiceButtonEl.textContent = "Roll the dice";
const endTurnButtonEL = document.createElement("button");
const bodyEl = document.querySelector("body");
const playerPieceEl = document.createElement("img");
const computerPieceEl = document.createElement("img");
playerPieceEl.setAttribute("id", "player-pawn");
computerPieceEl.setAttribute("id", "computer-pawn");
const eventTitleEl = document.createElement("h1");
const eventDesc1El = document.createElement("p");
const eventDesc2El = document.createElement("p");
const eventDesc3El = document.createElement("p");
const eventButton2El = document.createElement("button");
const eventButton1El = document.createElement("button");

/*----- event listeners -----*/
buttonP1.addEventListener("click", startGame);
rollDiceButtonEl.addEventListener("click", playersTurn);
endTurnButtonEL.addEventListener("click", switchTurn);
/*----- functions -----*/
function init() {
  const bodyEl = document.querySelector("body");
  const createLeftScreenEl = document.createElement("div");
  createLeftScreenEl.classList.add("left-screen");
  const createRightScreenEl = document.createElement("div");
  createRightScreenEl.classList.add("right-screen");
  const createTitleBoxEl = document.createElement("div");
  createTitleBoxEl.classList.add("title-box");
  const createEventBoxEl = document.createElement("div");
  createEventBoxEl.classList.add("event-box");
  const createTrackEl = document.createElement("div");
  createTrackEl.classList.add("track");
  const createStartBoxEl = document.createElement("div");
  createStartBoxEl.classList.add("start-box");
  const createFinishBoxEl = document.createElement("div");
  createFinishBoxEl.classList.add("finish-box");
  const createTitleEl = document.createElement("h2");
  createTitleEl.textContent = "Welcome to Run?, Run, Run!";
  const createDescText1El = document.createElement("span");
  createDescText1El.textContent =
    "Can you beat your opponents to the end of the race?";
  const createDescText2El = document.createElement("p");
  createDescText2El.textContent = "Get Ready... Get set...";
  const createStartButtonEl = document.createElement("button");
  createStartButtonEl.setAttribute("id", "p1");
  createStartButtonEl.textContent = "Go!";
  const createStartTextEl = document.createElement("h3");
  createStartTextEl.textContent = "Start!";
  const createFinishTextEl = document.createElement("h3");
  createFinishTextEl.textContent = "Finish!";
  bodyEl.appendChild(createLeftScreenEl);
  bodyEl.appendChild(createRightScreenEl);
  createLeftScreenEl.appendChild(createTitleBoxEl);
  createLeftScreenEl.appendChild(createEventBoxEl);
  createTitleBoxEl.appendChild(createTitleEl);
  createTitleBoxEl.appendChild(createDescText1El);
  createTitleBoxEl.appendChild(createDescText2El);
  createTitleBoxEl.appendChild(createStartButtonEl);
  createRightScreenEl.appendChild(createTrackEl);
  createRightScreenEl.appendChild(createStartBoxEl);
  createRightScreenEl.appendChild(createFinishBoxEl);
  createStartBoxEl.appendChild(createStartTextEl);
  createFinishBoxEl.appendChild(createFinishTextEl);
}

function startGame() {
  turnCounter = 0;

  generatePieces();
  buttonP1.removeEventListener("click", startGame);
  removeTitleBox();
  makePlayerUI();
}

function playersTurn() {
  rollTheDice();
  randomEvent(player);
  playerOnTrack();
  playerPositionCheck(player);
  checkWinCondition();
}

function computersTurn() {
  computerDiceRoll();
  randomEvent(computer);
  computerOnTrack();
  ComputerPositionCheck(computer);
  checkWinCondition();
}

function generatePieces() {
  playerPieceEl.src =
    "./pngs/toppng.com-free-png-pawn-white-chess-piece-png-images-transparent-chess-piece-pawn-4324x7923.png";
  trackStart.appendChild(playerPieceEl);
  computerPieceEl.src =
    "./pngs/kisspng-chess-piece-pawn-king-queen-painted-black-chess-pieces-5a80da4f05e6c5.7691427615183939350242.png";
  trackStart.appendChild(computerPieceEl);
}

function removeTitleBox() {
  while (titleBoxEl.firstChild) {
    titleBoxEl.removeChild(titleBoxEl.firstChild);
  }
}

function removeEventBox() {
  while (eventBoxEl.firstChild) {
    eventBoxEl.removeChild(eventBoxEl.firstChild);
  }
}

function makePlayerUI() {
  const playerUIEl = document.createElement("h2");
  const playerTextEl = document.createElement("p");
  playerTextEl.textContent = "Roll the dice to move closer to the finish line.";
  playerUIEl.textContent = "It is your turn!";
  titleBoxEl.appendChild(playerUIEl);
  titleBoxEl.appendChild(playerTextEl);
  titleBoxEl.appendChild(rollDiceButtonEl);
}

function rollTheDice() {
  const diceTotal = Math.floor(Math.random() * 10) + 2;
  titleBoxEl.removeChild(rollDiceButtonEl);
  const diceResult = document.createElement("p");
  diceResult.textContent = `You advance ${diceTotal}`;
  titleBoxEl.appendChild(diceResult);
  player.tile = player.tile + diceTotal + player.tile;
}

function computerDiceRoll() {
  const diceTotal = Math.floor(Math.random() * 10) + 2;
  const diceResult = document.createElement("p");
  diceResult.textContent = `The computer advances ${diceTotal} tiles`;
  titleBoxEl.appendChild(diceResult);
  computer.tile = computer.tile + diceTotal + computer.speed;
}

function minPlayerTile() {
  if (player.tile < 0) {
    player.tile = 0;
  }
}

function minComputerTile() {
  if (computer.tile < 0) {
    computer.tile = 0;
  }
}

function switchTurn() {
  if (turnCounter === 0) {
    turnCounter = 1;
    removeTitleBox();
    removeEventBox();
    computersTurn();
  } else {
    turnCounter = 0;
    removeTitleBox();
    removeEventBox();
    makePlayerUI();
  }
}

function randomEvent(user) {
  const randomNumber = Math.floor(Math.random() * 8);
  switch (randomNumber) {
    case 1:
      catapult();
      break;
    case 2:
      bearChase();
      break;
    case 3:
      energyDrink(user);
      break;
    case 4:
      weightedShoes(user);
      break;
    case 5:
      beeSwarm(user);
      break;
    case 6:
      grappleHook(user);
      break;
    case 7:
      tardisMovement();
      break;
    default:
      noEvent();
  }
}

function beeSwarm(user) {
  eventTitleEl.textContent = "BEEEESSSSSSSS!";
  eventDesc1El.textContent = `You hear a buzzing noise coming towards you. As you look around you see a a giant swarm of bees! You spot a pond nearby
    do you make a run for the pond or try to out run the bees?`;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  if (turnCounter === 0) {
    eventButton1El.textContent = "Dash to the pond?";
    eventButton2El.textContent = "Run away!!";
    eventButton1El.addEventListener("click", dashForPond);
    eventButton2El.addEventListener("click", runAway);
    eventBoxEl.appendChild(eventButton1El);
    eventBoxEl.appendChild(eventButton2El);
  } else {
    if (Math.random() < 0.5) {
      dashForPond(user);
    } else {
      runAway(user);
    }
  }
}

function energyDrink(user) {
  eventTitleEl.textContent = "Powerthirst!";
  eventDesc1El.textContent =
    "As you run you see something shiney on the ground. It is a can of powerthirst! Gain 2 speed.";
  user.speed = user.speed + 2;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  nextTurn();
}

function weightedShoes(user) {
  eventTitleEl.textContent = "Magic shoes!";
  eventDesc1El.textContent =
    "You come across a pair of magically glowing shoes. When you put them on there tighten around your ankles. Gain shoes of slowness +2";
  user.speed = user.speed - 2;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  nextTurn();
}

function catapult() {
  const randomNumber = Math.floor(Math.random() * 14) + 1;
  if (turnCounter === 0) {
    player.tile = player.tile + randomNumber;
  } else {
    computer.tile = computer.tile + randomNumber;
  }
  eventTitleEl.textContent = "Catapult!";
  eventDesc1El.textContent = `As you step on this tile you are launched ${randomNumber} tiles forward!`;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  nextTurn();
}
function bearChase() {
  const randomNumber = Math.floor(Math.random() * 19) + 1;
  if (turnCounter === 0) {
    player.tile = player.tile - randomNumber;
    minPlayerTile();
  } else {
    computer.tile = computer.tile - randomNumber;
    minComputerTile();
  }
  eventTitleEl.textContent = "A wild bear has appeared!";
  eventDesc1El.textContent =
    "As you wonder through the course a bear has picked up your scent.";
  eventDesc2El.textContent = `The bear chases you back ${randomNumber} tiles!`;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  eventBoxEl.appendChild(eventDesc2El);
  nextTurn();
}

function noEvent() {
  eventTitleEl.textContent = "Get a little rest";
  eventDesc1El.textContent = "Nothing eventful happens to you this turn.";
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  nextTurn();
}

function dashForPond(user) {
  if (Math.random < 0.5) {
    eventDesc3El.textContent =
      "You make a break for the pond and dive right in. The bees leave you alone.";
    eventBoxEl.appendChild(eventDesc3El);
    minPlayerTile();
    minComputerTile();
    nextTurn();
  } else {
    const randomNumber = Math.floor(Math.random() * 20);
    eventDesc3El.textContent = `You make a break for the pond and find it is too far away. The bess chase you back a few spaces before stinging you.
       It hurts to walk now. Lose 1 speed and ${randomNumber} tiles`;
    user.tile = user.tile - randomNumber;
    user.speed = user.speed - 1;
    eventBoxEl.appendChild(eventDesc3El);
    minPlayerTile();
    minComputerTile();
    nextTurn();
  }
}

function runAway(user) {
  const randomNumber = Math.floor(Math.random() * 10);
  if (Math.Random < 9) {
    eventDesc2El.textContent = `You high tail backwards as far away as you can. Lose ${randomNumber} tiles`;
    user.tile = user.tile - randomNumber;
    eventBoxEl.appendChild(eventDesc2El);
    minPlayerTile();
    minComputerTile();
  } else {
    eventDesc2El.textContent = `You see an opportunity to run ahead and away. Gain ${randomNumber} tiles`;
    user.tile = user.tile + randomNumber;
    eventBoxEl.appendChild(eventDesc2El);
    minPlayerTile();
    minComputerTile();
  }
  nextTurn();
}

function grappleHook(user) {
  eventTitleEl.textContent = "Grapple Gun";
  eventDesc1El.textContent = `You spot something hanging from a tree branch. It is a gapplehook gun. Maybe you can use this to catch up to your opponent
    or get farther ahead. If you try to get father ahead the father you go the less likely you may grab something.`;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc1El);
  if (!turnCounter && player.tile < computer.tile) {
    eventButton1El.textContent = "Grab you opponent?";
    eventButton2El.textContent = "Take no action";
    eventButton1El.addEventListener("click", grappleOpponent);
    eventButton2El.addEventListener("click", nextTurn);
    eventBoxEl.appendChild(eventButton1El);
    eventBoxEl.appendChild(eventButton2El);
  } else if (!turnCounter && player.tile > computer.tile) {
    eventButton1El.textContent = "Expand my lead!";
    eventButton2El.textContent = "Take no action";
    eventButton1El.addEventListener("click", grappleFartherInput);
    eventButton2El.addEventListener("click", nextTurn);
    eventBoxEl.appendChild(eventButton1El);
    eventBoxEl.appendChild(eventButton2El);
  } else if (turnCounter && player.tile < computer.tile) {
    inputValues = Math.floor(Math.random() * 9) + 1;
    grappleFarther(user);
  } else {
    grappleOpponent(user);
  }
}

function grappleOpponent(user) {
  eventDesc2El.textContent = `With a quick bang and a small whining noise the hook shoots from the gun towards your opponent`;
  eventBoxEl.appendChild(eventDesc2El);
  const randomNumber = Math.floor(Math.random() * 4);
  if (randomNumber && !turnCounter) {
    const randomNumber2 = Math.floor(Math.random() * 3) + 1;
    const missedShot = Math.floor(
      (player.tile - computer.tile) / randomNumber2
    );
    eventDesc3El.textContent = `As the hook travels you notice it is not going as far as you would like. It lands short of the mark but still pulls you
      ${missedShot} tiles`;
    user.tile = computer.tile;
  } else if (randomNumber && turnCounter) {
    const randomNumber2 = Math.floor(Math.random() * 9) + 1;
    const missedShot = Math.floor(
      (player.tile - computer.tile) / randomNumber2
    );
    eventDesc3El.textContent = `As the hook travels you notice it is not going to come close to hitting you. It lands short of the mark but still pulls
       your opponent ${missedShot} tiles`;
    user.tile = player.tile;
  } else if (!randomNumber && !turnCounter) {
    eventDesc3El.textContent = `The hook soars through the sky it starts to look like it will not make it but it is just a trick of your eyes. It swings
      around your opponent and you feel a tug as you speed up to him`;
    user.tile = computer.tile;
  } else {
    eventDesc3El.textContent = `The hook soars through the sky it starts to look like it will not hit you but unfortunatly you feel a cable wrap around
      your waist. A tug pulls at you a bit as you see your opponent flying towards you.`;
    user.tile = player.tile;
  }
  eventBoxEl.appendChild(eventDesc3El);
  eventButton1El.removeEventListener("click", grappleOpponent);
  eventButton2El.removeEventListener("click", nextTurn);
  nextTurn();
}

function grappleFartherInput(user) {
  eventButton1El.removeEventListener("click", grappleFartherInput);
  eventDesc2El.textContent = "How far would you like to travel? (1-20)";
  const inputBox = document.createElement("input");
  inputBox.setAttribute("type", "number");
  eventButton1El.textContent = "Submit";
  eventBoxEl.appendChild(eventDesc2El);
  eventBoxEl.appendChild(inputBox);
  eventBoxEl.appendChild(eventButton1El);
  eventButton1El.addEventListener("click", checkInput);
}

function checkInput(user) {
  const inputBox = document.querySelector("input");
  if (inputBox.valueAsNumber <= 20 && inputBox.valueAsNumber > 0) {
    inputValues = inputBox.valueAsNumber;
    grappleFarther(user);
  } else {
    errorMessage();
  }
}

function errorMessage() {
  eventDesc3El.textContent = "Please enter in a value between 1-20";
  eventBoxEl.appendChild(eventDesc3El);
}

function grappleFarther(user) {
  const randomNumber = Math.random();
  removeEventBox();
  if (inputValues <= 5) {
    eventDesc3El.textContent = `You cast out the line in hopes you go father! the hooks lands where you want it to and you travel ${inputValues} tiles`;
    user.tile = user.tile + inputValues;
  } else if (inputValues <= 10) {
    if (randomNumber < 0.85) {
      eventDesc3El.textContent = `The line goes flying out and hits the mark. You advance ${inputValues} tiles`;
      user.tile = user.tile + inputValues;
    } else {
      eventDesc3El.textContent =
        "As the line leaves the launcher it looks right until it passes over a tree and gets tangled in the branchs.";
    }
  } else if (inputValues <= 15) {
    if (randomNumber < 0.5) {
      eventDesc3El.textContent = `You cast out the line in hopes you go farther! The hook lands where you want it to and you travel ${inputValues} tiles`;
      user.tile = user.tile + inputValues;
    } else {
      eventDesc3El.textContent =
        "As the line leaves the launcher it looks right until it passes over a tree and gets tangled in the branchs.";
    }
  } else {
    if (randomNumber < 0.15) {
      eventDesc3El.textContent = `You cast out the line in hopes you go farther! The hook lands where you want it to and you travel ${inputValues} tiles`;
      user.tile = user.tile + inputValues;
    } else {
      eventDesc3El.textContent =
        "As the line leaves the launcher it looks right until it passes over a tree and gets tangled in the branchs.";
    }
  }
  eventBoxEl.appendChild(eventDesc3El);
  eventButton1El.removeEventListener("click", checkInput);
  eventButton2El.removeEventListener("click", errorMessage);
  nextTurn();
}

function tardisMovement() {
  eventTitleEl.textContent = "Doctor Who?";
  eventDesc2El.textContent = `Out of no where a blue telephone box and a woman steps out. "Um excuse me. Where and When are we?" she asks.
    "Oh never mind sorry for bothering you" she quickly closes the door and a loud whir of noise comes from the box before it vanishs. You
    you realize you have been standing still for a minute and don't gain any ground.`;
  eventBoxEl.appendChild(eventTitleEl);
  eventBoxEl.appendChild(eventDesc2El);
  nextTurn();
}

function checkWinCondition() {
  if (player.tile >= 300 && turnCounter === 0) {
    playerWin();
  } else if (computer.tile >= 300 && turnCounter === 1) {
    computerWin();
  } else {
    return;
  }
}

function playerWin() {
  endTurnButtonEL.removeEventListener("click", switchTurn);
  const winnerScreenEl = document.createElement("div");
  const winnerTitleEl = document.createElement("h1");
  const winnerTextEl = document.createElement("p");
  winnerScreenEl.id = "winner-screen";
  winnerTitleEl.textContent = "We have a winner!!!!!!!";
  winnerTextEl.textContent = `Congratulations! you (the Player) have won! you were actually able to out run the run 
    computer and deserve something special let me see if I can find that cake I was going to give to another test subject a while ago....`;
  while (bodyEl.firstChild) {
    bodyEl.removeChild(bodyEl.firstChild);
  }
  winnerScreenEl.appendChild(winnerTitleEl);
  winnerScreenEl.appendChild(winnerTextEl);
  bodyEl.appendChild(winnerScreenEl);
}

function computerWin() {
  endTurnButtonEL.removeEventListener("click", switchTurn);
  const loserScreenEl = document.createElement("div");
  const loserTitleEl = document.createElement("h1");
  const loserTextEL = document.createElement("p");
  loserScreenEl.id = "loser-screen";
  loserTitleEl.textContent = "We have a winner!!!!!!!";
  loserTextEL.textContent = `Unfortunately it is not you. You were not able to out run the run computer and therefor have lost this game. 
    If you think this is a fluke feel free to try to play again.`;
  while (bodyEl.firstChild) {
    bodyEl.removeChild(bodyEl.firstChild);
  }
  loserScreenEl.appendChild(loserTitleEl);
  loserScreenEl.appendChild(loserTextEL);
  bodyEl.appendChild(loserScreenEl);
}

function playerPositionCheck(user) {
  if (user.tile <= 50) {
    playerPieceEl.style.gridRow = "1/2";
  } else if (user.tile <= 100) {
    playerPieceEl.style.gridRow = "2/3";
  } else if (user.tile <= 150) {
    playerPieceEl.style.gridRow = "3/4";
  } else if (user.tile <= 200) {
    playerPieceEl.style.gridRow = "4/5";
  } else if (user.tile <= 250) {
    playerPieceEl.style.gridRow = "5/6";
  } else {
    playerPieceEl.style.gridRow = "6/7";
  }
}
function ComputerPositionCheck(user) {
  if (user.tile <= 50) {
    computerPieceEl.style.gridRow = "1/2";
  } else if (user.tile <= 100) {
    computerPieceEl.style.gridRow = "2/3";
  } else if (user.tile <= 150) {
    computerPieceEl.style.gridRow = "3/4";
  } else if (user.tile <= 200) {
    computerPieceEl.style.gridRow = "4/5";
  } else if (user.tile <= 250) {
    computerPieceEl.style.gridRow = "5/6";
  } else {
    computerPieceEl.style.gridRow = "6/7";
  }
}

function playerOnTrack() {
  if (playerPieceEl.parentElement === trackStart) {
    trackBoxEl.appendChild(playerPieceEl);
    playerPieceEl.style.gridColumn = "1/2";
    playerPieceEl.style.gridRow = "1/2";
  } else {
    return;
  }
}
function computerOnTrack() {
  if (computerPieceEl.parentElement === trackStart) {
    trackBoxEl.appendChild(computerPieceEl);
    computerPieceEl.style.gridColumn = "2/3";
    computerPieceEl.style.gridRow = "2/3";
  } else {
    return;
  }
}

function nextTurn() {
  eventButton2El.removeEventListener("click", nextTurn);
  if (turnCounter === 0) {
    eventBoxEl.appendChild(endTurnButtonEL);
    endTurnButtonEL.textContent = "End your turn";
  } else {
    eventBoxEl.appendChild(endTurnButtonEL);
    endTurnButtonEL.textContent = "Your turn";
  }
}
