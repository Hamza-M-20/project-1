const gameBoard = document.querySelector('#gameBoard');
const resetBtn = document.querySelector('#resetBtn');
const scoreText = document.querySelector('#scoreText');
const message = document.querySelector('#message');


import { unitSize, boardWidth, boardHeight } from './constants.js';

// constants and variables
const snakeColor = 'green';
const foodColor = 'red';
const gameWidth = boardWidth;
const gameHeight = boardHeight;
let score = 0;
let running = true;
let direction = { x: 1, y: 0 };
let food = {};
let snake = [
    {x: 4, y:0},
    {x: 3, y:0},
    {x: 2, y:0},
    {x: 1, y:0},
    {x:0, y:0}
];
document.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);
renderBoard();
createFood();
gameLoop();
renderSnake();




function renderBoard() {
  gameBoard.innerHTML = '';
  gameBoard.style.display = 'grid';
  gameBoard.style.gridTemplateColumns = `repeat(${boardWidth}, ${unitSize}px)`;
  gameBoard.style.gridTemplateRows = `repeat(${boardHeight}, ${unitSize}px)`;

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      gameBoard.appendChild(cell);
    }
  }
}

function renderSnake() {
  snake.forEach(snakePart => {
    const cell = getCell(snakePart.x, snakePart.y);
    if (cell) cell.classList.add('snake');
  });
}
  

function createFood() {
  food = {
    x: Math.floor(Math.random() * boardWidth),
    y: Math.floor(Math.random() * boardHeight)
  };
  const cell = getCell(food.x, food.y);
  if (cell) cell.classList.add('food');
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreText.textContent = score;
    createFood();

    // win condition
    if (score >= 200) {
        running = false;
        message.textContent = 'you win';
        return;
    }
  } else {
    snake.pop();
  }
}

function updateBoard() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('snake', 'food');
  });
  renderSnake();
  const foodCell = getCell(food.x, food.y);
  if (foodCell) foodCell.classList.add('food');
}

function getCell(x, y) {
  return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight) {
    running = false;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      running = false;
    }
  }

  if (!running) {
    message.textContent = "Game Over!";
  }
}

function changeDirection(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function gameLoop() {
  if (!running) return;
  setTimeout(() => {
    moveSnake();
    checkCollision();
    updateBoard();
    gameLoop();
  }, 200); 
}

function resetGame() {
    renderBoard();
  snake = [ {x: 4, y:0},
  {x: 3, y:0},
  {x: 2, y:0},
  {x: 1, y:0},
  {x: 0, y:0}
  ];
  direction = { x: 1, y: 0 };
  score = 0;
  scoreText.textContent = score;
  running = true;
  message.textContent = '';
  createFood();
  updateBoard();
  gameLoop();
}


