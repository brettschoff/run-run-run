  /*----- constants -----*/


  /*----- state variables -----*/
let winner;
let player;
let playerPiece;
let computer;
let computerPiece;
let turnCounter;

  /*----- cached elements  -----*/
const buttonP1 = document.querySelector("#p1");
const trackStart = document.querySelector(".start-box");
const titleBoxEl = document.querySelector('.title-box');
const eventBoxEl = document.querySelector('.event-box')
const rollDiceButtonEl = document.createElement('button');
rollDiceButtonEl.textContent= 'Roll the dice';
const endTurnButtonEL = document.createElement('button');
endTurnButtonEL.textContent = 'End your turn';

  /*----- event listeners -----*/
buttonP1.addEventListener('click', init);
rollDiceButtonEl.addEventListener('click', playersTurn);
endTurnButtonEL.addEventListener('click', switchTurn);
  /*----- functions -----*/
  function init() {
    player = {
      tile:0,
      speed: 0,
    };
    computer = {
      tile: 0,
      speed: 0
    };
    turnCounter = 0;

    generatePieces();
    buttonP1.removeEventListener('click', init)
    removeTitleBox();
    makePlayerUI();
  }

  function playersTurn() {
    rollTheDice()
    randomEvent()

  }

  function computersTurn() {
    computerDiceRoll()
    randomEvent()

  }

  function generatePieces() {
      playerPieceEl = document.createElement('img');
      computerPieceEl = document.createElement('img');
      playerPieceEl.setAttribute('id','player-pawn');
      computerPieceEl.setAttribute('id','computer-pawn');
      playerPieceEl.src = "./pngs/toppng.com-free-png-pawn-white-chess-piece-png-images-transparent-chess-piece-pawn-4324x7923.png";
      trackStart.appendChild(playerPieceEl);
      computerPieceEl.src ="./pngs/kisspng-chess-piece-pawn-king-queen-painted-black-chess-pieces-5a80da4f05e6c5.7691427615183939350242.png"
      trackStart.appendChild(computerPieceEl);        
  };

  function removeTitleBox() {
    while (titleBoxEl.firstChild) {
      titleBoxEl.removeChild(titleBoxEl.firstChild)
    }
  }

  function removeEventBox() {
    while (eventBoxEl.firstChild) {
      eventBoxEl.removeChild(eventBoxEl.firstChild)
    }
  }

  function makePlayerUI() {
    const playerUIEl = document.createElement('h2');
    const playerTextEl = document.createElement('p')
    playerTextEl.textContent = ('Roll the dice to move closer to the finish line.')
    playerUIEl.textContent = ('It is your turn!');
    titleBoxEl.appendChild(playerUIEl);
    titleBoxEl.appendChild(playerTextEl);
    titleBoxEl.appendChild(rollDiceButtonEl);
  }

  function rollTheDice() {
    const diceTotal = Math.floor(Math.random() * 10) + 2;
    titleBoxEl.removeChild(rollDiceButtonEl);
    const diceResult = document.createElement('p');
    diceResult.textContent = `You advance ${diceTotal}`;
    titleBoxEl.appendChild(diceResult);
    player.tile = player.tile + diceTotal + player.speed;
  }

  function computerDiceRoll() {
    const diceTotal = Math.floor(Math.random() * 10) + 2;
    const diceResult = document.createElement('p');
    diceResult.textContent = `The computer advances ${diceTotal} tiles`;
    titleBoxEl.appendChild(diceResult);
    computer.tile = computer.tile + diceTotal + computer.speed;
  }

  function minPlayerTile() {
    if(player.tile < 0) {
      player.tile = 0;
    }
  }

  function minComputerTile(){
    if(computer.tile < 0) {
      computer.tile = 0;
    }
  }

  function switchTurn() {
    if(turnCounter === 0) {
      turnCounter = 1;
      removeTitleBox();
      removeEventBox();
      computersTurn();
    }else {
      turnCounter = 0;
      removeTitleBox();
      removeEventBox();
      makePlayerUI();
      playersTurn();
    }
  }

  function randomEvent() {
    const randomNumber = Math.floor(Math.random() * 2)
    switch (randomNumber) {
      case 1:
        catapult();
        break;
      case 2:
        bearChase();
        break;
      default:
        noEvent();
    }
  }

  function catapult() {
    const eventTitleEl = document.createElement('h1')
    const eventDescEl = document.createElement('p')
    const randomNumber = Math.floor(Math.random() * 19) + 1
    if(turnCounter === 0) {
      player.tile = player.tile + randomNumber
    } else {
      computer.tile = computer.tile + randomNumber
    }
    eventTitleEl.textContent = 'Catapult!'
    eventDescEl.textContent = `As you step on this tile you are launched ${randomNumber} tiles forward!`
    eventBoxEl.appendChild(eventTitleEl);
    eventBoxEl.appendChild(eventDescEl);
    eventBoxEl.appendChild(endTurnButtonEL);
  }
  function bearChase() {
    const eventTitleEl = document.createElement('h1')
    const eventDescEl = document.createElement('p')
    const eventDesc2El = document.createElement('p')
    const randomNumber = Math.floor(Math.random() * 19) + 1
    if(turnCounter === 0) {
      player.tile = player.tile - randomNumber
      minPlayerTile()
    } else {
      computer.tile = computer.tile - randomNumber
      minComputerTile()
    }
    eventTitleEl.textContent = 'A wild bear has appeared!'
    eventDescEl.textContent = 'As you wonder thhrough the course a bear has picked up your scent.'
    eventDesc2El.textContent = `The bear chases you back ${randomNumber} tiles!`
    eventBoxEl.appendChild(eventTitleEl);
    eventBoxEl.appendChild(eventDescEl);
    eventBoxEl.appendChild(eventDesc2El);
    eventBoxEl.appendChild(endTurnButtonEL);
  }

  function noEvent() {
    const eventTitleEl = document.createElement('h1')
    const eventDescEl = document.createElement('p')
    eventTitleEl.textContent = 'Get a little rest'
    eventDescEl.textContent = 'Nothing eventful happens to you this turn.'
    eventBoxEl.appendChild(eventTitleEl);
    eventBoxEl.appendChild(eventDescEl);
    eventBoxEl.appendChild(endTurnButtonEL);

  }