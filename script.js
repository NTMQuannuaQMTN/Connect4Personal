// Connect 4 game logic

const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let gameBoard = [];
let gameRunning = true;
document.body.style.backgroundColor = 'Red';

// Initialize game board
function initializeBoard() {
    gameBoard = [];
    for (let row = 0; row < ROWS; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < COLS; col++) {
            gameBoard[row][col] = null; // Represents an empty cell
        }
    }
}

// Function to create the game board in HTML
function renderBoard() {
    const boardElement = document.querySelector('.game-board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            boardElement.appendChild(cell);
        }
    }
}

// Function to handle player turn
function handlePlayerTurn(column) {
    if (!gameRunning) return;

    // Find the lowest empty row in the selected column
    let row = ROWS - 1;
    while (row >= 0 && gameBoard[row][column] !== null) {
        row--;
    }

    if (row >= 0) {
        gameBoard[row][column] = currentPlayer;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${column}"]`);
        cell.style.backgroundColor = currentPlayer;
        
        // Check for win
        if (checkForWin(row, column)) {
            gameRunning = false;
            alert(`${currentPlayer.toUpperCase()} wins!`);
        } else {
            // Switch player
            currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
            document.body.style.backgroundColor = currentPlayer;
            document.getElementById('current-player').textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
            if (currentPlayer === 'red') {
                document.getElementById('turn').style.color = "White";
            } else {
                document.getElementById('turn').style.color = "Black";
            }
        }
    }

    // Check for draw
    if (checkForDraw() && gameRunning) {
        gameRunning = false;
        alert("It's a draw!");
    }
}

// Function to check for a win condition
function checkForWin(row, col) {
    const directions = [
        [0, 1],   // Horizontal
        [1, 0],   // Vertical
        [1, 1],   // Diagonal (top-left to bottom-right)
        [-1, 1]   // Diagonal (bottom-left to top-right)
    ];

    for (let dir of directions) {
        let count = 1; // Count the current player's tokens
        let r = row + dir[0];
        let c = col + dir[1];

        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
            count++;
            r += dir[0];
            c += dir[1];
        }

        r = row - dir[0];
        c = col - dir[1];

        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
            count++;
            r -= dir[0];
            c -= dir[1];
        }

        if (count >= 4) {
            return true;
        }
    }

    return false;
}

// Function to check for a draw condition
function checkForDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (gameBoard[row][col] === null) {
                return false; // If any cell is empty, game is not a draw
            }
        }
    }
    return true; // All cells are filled, it's a draw
}

// Event listener for clicking on the game board
document.querySelector('.game-board').addEventListener('click', function(event) {
    if (!gameRunning) return;

    const column = parseInt(event.target.dataset.col);
    if (!isNaN(column)) {
        handlePlayerTurn(column);
    }
});

// Event listener for reset button
document.getElementById('reset-button').addEventListener('click', function() {
    gameRunning = true;
    currentPlayer = 'red';
    initializeBoard();
    renderBoard();
    document.getElementById('current-player').textContent = 'Red';
    document.body.style.backgroundColor = 'Red';
    document.getElementById('turn').style.color = "White";
});

// Initialize the game on page load
initializeBoard();
renderBoard();
