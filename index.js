let board = document.getElementById("container");
let squares = document.getElementsByClassName("spot");
const players = ["X", "O"];
let currentPlayer = players[0];
let startingPlayer = "X";
let firstClick = false;
let gameOver = false;



let x = 0;
let o = 0;
let score = document.getElementById("score");
let result = document.getElementById("result");
let endMessage = document.getElementById("turn");

endMessage.textContent = `X's turn!`;
endMessage.style.color = "orange";

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function register() {
  document.getElementById("settings").addEventListener("click", function () {
    document.getElementById("register").style = "display:grid";
  });  
}

function save() {
  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;

  document.getElementById("playerName1").innerText = player1;
  document.getElementById("playerName2").innerText = player2;

  if (player1.length === 0 || player2.length === 0) {
    let required = document.getElementById("required-field");
    required.style.display = "flex";
  } else {
    document.getElementById("register").style = "display:none";
    document.getElementById("required-field").style = "display:none";

    resetGame();
  }
}

function resetGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }

    gameOver = false;
    firstClick = false;

   
    if (x + o > 0) { 
        startingPlayer = startingPlayer === "X" ? "O" : "X";
    }

    currentPlayer = startingPlayer;

    endMessage.textContent = `${startingPlayer}'s turn!`;
    endMessage.style.color = startingPlayer === "X" ? "#4995c4" : "#9433b8";
}


for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        if (gameOver) {
            resetGame();
            return;
        }

        if (!firstClick) {
            currentPlayer = startingPlayer; 
            firstClick = true;
        }

        if (squares[i].textContent !== "") {
            return;  
        }

        squares[i].textContent = currentPlayer;

        
        if (currentPlayer === "X") {
            squares[i].style.color = "#4995c4";
        } else {
            squares[i].style.color = "#9433b8"; 
        }

        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            if (currentPlayer === "X") x++;
            else o++;

            result.innerText = `${x} - ${o}`;
            gameOver = true;
            return;
        }

        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            gameOver = true;
            return;
        }

        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        endMessage.textContent = `${currentPlayer}'s turn!`;
        endMessage.style.color = currentPlayer === "X" ? "#4995c4" : "#9433b8";
    });
}


function checkWin(player) {
  for (let combination of winning_combinations) {
    const [a, b, c] = combination;

    if (
      squares[a].textContent === player &&
      squares[b].textContent === player &&
      squares[c].textContent === player
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false; 
    }
  }
  return true;
}