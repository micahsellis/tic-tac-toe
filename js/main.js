/*----- constants -----*/
const COLORS = {
  keys: null,
  p1: 'X',
  p2: 'O',
};
const WIN = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner; //player that won, a tie, game in play

/*----- cached element references -----*/
const gameStateEl = document.getElementById('gameState');
const boxEls = document.querySelectorAll('.box');
const logicEl = document.getElementById('logic');

/*----- event listeners -----*/
document.getElementById('grid').addEventListener('click', handleBoxClick);
document.getElementById('reset').addEventListener('click', eraseBoard);

/*----- functions -----*/
function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  gameStateEl.innerText = 'Click on a square to start!';
}

function handleBoxClick(evt) {
  const playerChoice = parseInt(evt.target.id);
  if (board[playerChoice] !== null) return;
  if (winner !== null) return;
  board.splice(playerChoice, 1, turn);
  if (turn === -1) {
    document.getElementById(playerChoice.toString()).textContent = 'O';
    document.getElementById(playerChoice.toString()).style.color = 'tomato';
  }
  if (turn === 1) {
    document.getElementById(playerChoice.toString()).textContent = 'X';
    document.getElementById(playerChoice.toString()).style.color = 'olive';
  }
  winner = isGameOver();
  logic();
  turn *= -1;
  renderMessage(turn);
}

function isGameOver() {
  for (let i = 0; i < WIN.length; i++) {
    if (
      Math.abs(board[WIN[i][0]] + board[WIN[i][1]] + board[WIN[i][2]]) === 3
    ) {
      return board[WIN[i][0]];
    }
  }
  if (board.includes(null)) return null;
  return 'T';
}

function logic() {
  logicEl.innerText = '';
  for (let i = 0; i < WIN.length; i++) {
    if ((Math.abs(board[WIN[i][0]] + board[WIN[i][1]] + board[WIN[i][2]]) >= 2) && (board[WIN[i][0]] === null || board[WIN[i][1]] === null || board[WIN[i][2]] === null)) {
      if (board[WIN[i][0]] === 1) {
        logicEl.innerText = `Careful! Player ${COLORS.p1} is winning!`;
      } else if (board[WIN[i][0]] === -1) {
        logicEl.innerText = `Careful! Player ${COLORS.p2} is winning!`;
      }
    }
  }
}

function renderMessage(turn) {
  if (winner === null) {
    if (turn === 1) {
      gameStateEl.textContent = `It's ${COLORS.p1.toUpperCase()}'s turn!`;
    } else if (turn === -1) {
      gameStateEl.textContent = `It's ${COLORS.p2.toUpperCase()}'s turn!`;
    }
  } else if (winner === 'T') {
    gameStateEl.textContent = `It's a Tie!`;
  } else if (winner === 1) {
      gameStateEl.textContent = `PLAYER ${COLORS.p1.toUpperCase()} WON!!`;
      logicEl.innerText = '';
  } else if (winner === -1) {
      gameStateEl.textContent = `PLAYER ${COLORS.p2.toUpperCase()} WON!!`;
      logicEl.innerText = '';
  }
}

function eraseBoard() {
  for (let i = 0; i < boxEls.length; i++) {
    boxEls[i].style.color = 'white';
    boxEls[i].innerText = '';
  }

  logicEl.innerText = '';
  init();
}

init();
