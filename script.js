const playGame = (function () {

const createBoard =  function () {
    return [
    [null, null, null],
    [null, null, null],
    [null, null, null]
    ];
}

let board = createBoard();
let currentPlayer = "X";
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".container > button");
const rst = document.querySelector(".reset");


const checkPattern = function () {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== null &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]) {
            return `Player ${board[i][0]} wins!`
            }
        }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== null &&
            board[0][i] === board[1][i] &&
            board[1][i] === board[2][i]) {
            return `Player ${board[0][i]} wins!`
            }
        }

    if (board[0][0] !== null &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) {
        return `Player ${board[0][0]} wins!`
    }

    if (board[0][2] !== null &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) {
        return `Player ${board[0][2]} wins!`
    }
    if (board.flat().every(cell => cell !== null)) {
        return "It's a draw!";
    }
    return "Next player's turn."
    }

const markCell = function (row, col, button) {
    if (board[row][col] === null && display.textContent.includes("turn")) {
        board[row][col] = currentPlayer;
        button.textContent = currentPlayer;
        const result = checkPattern();
        display.textContent = result;
        if (result === "Next player's turn.") {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        display.textContent = `Player ${currentPlayer} turn.`
    }
}
}

const addEventListeners = function () {
    buttons.forEach(button => {
    const id = button.id;
    const row = parseInt(id[0]);
    const col = parseInt(id[1]);
    button.addEventListener('click', function () {
        markCell(row, col, button)
    });
    })

    rst.addEventListener('click', resetGame)
}

const resetGame =  function() {
    board = createBoard();
    buttons.forEach(button =>{
        button.textContent = "";
    })
    display.textContent = "Player X turn.";
    currentPlayer = "X";
}

const init = function () {
    display.textContent = "Player X's turn.";
    addEventListeners();
};


return {
    init
};
})()

playGame.init();