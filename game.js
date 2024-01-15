const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      status.innerText = `${gameState[a]} wins!`;
    }
  });
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.innerText = "It's a draw!";
  }
}

function handleRestart() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestart);
