const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cells = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      isGameActive = false;
      statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
      return true;
    }
  }
  if (!cells.includes('')) {
    isGameActive = false;
    statusDisplay.textContent = 'It\'s a Tie!';
    return true;
  }
  return false;
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (cells[index] || !isGameActive) return;
  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');
  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  statusDisplay.textContent = "Player X's Turn";
  board.innerHTML = '';
  createBoard();
}

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

resetButton.addEventListener('click', resetGame);
createBoard();
