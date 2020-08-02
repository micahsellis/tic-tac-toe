/*----- constants -----*/
const COLORS = {
    keys: null,
    p1: 'X',
    p2: 'O',
};
const WIN = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner; //player that won, a tie, game in play

/*----- cached element references -----*/
const gameStateEl = document.getElementById('gameState');

/*----- event listeners -----*/
document.getElementById("grid")
.addEventListener("click", handleBoxClick);
document.getElementById('reset').addEventListener("click", init);

/*----- functions -----*/
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    // render();
    eraseBoard();
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
    console.log(board);
    winner = isGameOver();
    turn *= -1;
    renderMessage(turn);
};

function isGameOver(turn) {
    for (let i = 0; i < WIN.length; i++) {
        if (Math.abs(board[WIN[i][0]] + board[WIN[i][1]] + board[WIN[i][2]]) === 3) {
            console.log(board[WIN[i][0]], board[WIN[i][1]], board[WIN[i][2]])
            return board[WIN[i][0]];
        };
    }
    if (board.includes(null)) return null;
    return 'T';
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

function eraseBoard() {
    let els = document.querySelectorAll(".box")
    for (let i = 0; i < els.length; i++){
        els[i].style.color = 'white';
        els[i].innerText = '';
    };
    gameStateEl.innerText = ' ';
}

init();