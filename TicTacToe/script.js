const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const turnDisplay = document.querySelector('.turn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'T';
    }

    return null;
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard[cellIndex] !== '' || gameEnded) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#007bff' : '#28a745';

    const winner = checkWinner();
    if (winner) {
        gameEnded = true;
        if (winner === 'T') {
            turnDisplay.textContent = "It's a tie!";
        } else {
            turnDisplay.textContent = `Player ${winner} wins!`;
        }
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;

    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#000';
    });

    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
