/*----- constants -----*/
const COLORS = {
    keys: null,
    p1: 'olive',
    p2: 'tomato',
};
const WIN = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner; //player that won, a tie, game in play

/*----- cached element references -----*/
const resetEl = document.getElementById('reset');
const gameStateEl = document.getElementById('gameState');
const oneEl = document.getElementById('1');
const twoEl = document.getElementById('2');
const threeEl = document.getElementById('3');
const fourEl = document.getElementById('4');
const fiveEl = document.getElementById('5');
const sixEl = document.getElementById('6');
const sevenEl = document.getElementById('7');
const eightEl = document.getElementById('8');
const zeroEl = document.getElementById('0');

/*----- event listeners -----*/
document.getElementById("grid")
.addEventListener("click", handleBoxClick);

/*----- functions -----*/
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
};

//TODO: what happens on click
function handleBoxClick(evt) {
    const playerChoice = parseInt(evt.target.id);
    if (board[playerChoice] !== null) return;
    if (winner !== null) return;
    board.splice(playerChoice, 1, turn);
    if (turn === -1) {
        document.getElementById(playerChoice.toString()).textContent = "O"; 
        document.getElementById(playerChoice.toString()).style.color = "tomato";
    };
    if (turn === 1) {
        document.getElementById(playerChoice.toString()).textContent = "X";
        document.getElementById(playerChoice.toString()).style.color = "olive";
    }
    turn *= -1;
    renderMessage(turn);
    render();
    isGameOver();
    console.log(playerChoice);
};

function isGameOver() {
    
    let total = 0;
    for (let i = 0; i < WIN.length; i++) {
        for (let j = 0; j < WIN[i].length; j++) {
            total += Math.abs(board[j]);
            if (total === 3) {
                retu
            }
        }
    }
    console.log(Math.abs(total))
};

function renderMessage(turn) {
    if (winner === null) {
        if(turn === 1){
            gameStateEl.textContent = `It's ${COLORS.p1.toUpperCase()}'s turn!`
        } else if(turn === -1) {
            gameStateEl.textContent = `It's ${COLORS.p2.toUpperCase()}'s turn!`
        }
    } else if (winner === 'T') {
        gameStateEl.textContent = `It's a Tie!`
    } else if (winner === 1) {
        gameStateEl.textContent = `${COLORS.p1.toUpperCase()} WON!!`
    } else if (winner === -1) {
        gameStateEl.textContent = `${COLORS.p2.toUpperCase()} WON!!`;
    };
};

function render() {
    ;
};

init();