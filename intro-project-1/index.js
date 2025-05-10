
const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackgroundColor = 'white';
const snakeColor = 'green';
const snakeBorder = 'black';
const foodColor = 'red';
const unitSize = 25;
let xVelocity = unitSize;
let yVelocity = 0;
let running = false;
let score = 0;
let foodX;
let foodY;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:0, y:0},
   
];
window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);
gameStart();
drawFood();
createFood();
drawSnake();
nextTick();

function  clearBoard(){
    ctx.fillStyle = boardBackgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);

};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            drawSnake();
            moveSnake();
            checkGameOver();
            nextTick();
        }, 200);
    }
    else{
            displayGameover();
        }
    };



function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
const keyPressed = event.code;
const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';
const UP = 'ArrowUp';
const DOWN = 'ArrowDown';

const goingUP = (yVelocity == -unitSize);
const goingDown = (yVelocity == unitSize);
const goingRight = (xVelocity == unitSize);
const goingLeft = (xVelocity == -unitSize);
switch(true){
    case(keyPressed === LEFT && !goingRight):
       xVelocity = -unitSize;
       yVelocity = 0;
 break;
 case(keyPressed === RIGHT && !goingLeft):
 xVelocity = unitSize;
 yVelocity = 0;
 break;
 case(keyPressed === UP && !goingDown):
 xVelocity = 0;
 yVelocity = -unitSize
 break;
 case(keyPressed === DOWN && !goingUP):
 xVelocity = 0;
 yVelocity = unitSize;
 break;
}

};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);

};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();

};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    // if food is eaten

    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    
    }
};
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();

};
function displayGameover(){
    ctx.font = "50px Comic Sans Ms";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;

};
function checkGameOver(){
    switch(true){
    case (snake[0].x < 0):
        running = false;
        break;
    case (snake[0].x >= gameWidth):
        running = false;
        break;
    case (snake[0].y < 0):
        running = false;
        break;
    case (snake[0].y >= gameHeight):
        break;
    }
    for(let i = 1; i < snake.length; i+=1){
    if(snake[i].x == snake[0] && snake[i].y == snake[0])
        running = false;
}

};