// set global variables for game play display, canvas, snake, and food
let movementDisplay;
let ctx
let game;
let snake;
let apple; //food

 // set global variables for snake length, score, snake movement, and buttons
let random_x;
let random_y;
let score = 0;
let highScore = 0;
let snakeArray = [];
let restartBtn = document.getElementById('restartBtn');
let playBtn = document.getElementById('playBtn');

// create crawler function for snake and snake movement
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 10;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
//   this.snakeBody = [];
  this.render = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // create function for snake speed and snake starting point
  this.update = function() {
    this.x += this.speedX; //this is for speed in x direction
    this.y += this.speedY;// this is for speed in y direction
if (this.x > game.height) {
    this.x = 0;
} 
if (this.y > game.width) {
    this.y = 0;
} 
if (this.x < 0) {
    this.x = game.width
} 
if (this.y < 0) {
    this.y = game.height
}    
} 
const up_arrow = 38;
const down_arrow = 40;
const right_arrow = 39;
const left_arrow = 37;

function movementHandler(e) {
    console.log('movement:', e.key);
    donkey.y - 10 >= 0 ? (donkey.y -= 10) : null;

    switch(e.key === 'w' || e.key === 'ArrowUp') {
        case (up_arrow):
           if (this.speedY !== 10) {
            console.log("moving up");
            this.speedX = 0;
            this.speedY = -10;
           }
            break;
        case (down_arrow):
            if (this.speedY !== -10){
                console.log("moving down");
                this.speedX = 0; 
                this.speedY = 10;
            }
            break;

        case (right_arrow):
            if (this.speedX !== -10){
                console.log("moving right");
                this.speedX = 10;
                this.speedY = 0;
            }
            break;

        case(left_arrow):
        if (this.speedX !== 10){
            console.log("moving left");
            this.speedX = -10;
            this.speedY = 0;  
        }
            break;  
        }
    }
}

// create function for food (apple) for the snake
function Food (x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.total = 1;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// function movementHandler(e) {
//     console.log('movement:', e.key);
//     // make a conditional for each direction
//     if (e.key === 'w' || e.key === 'ArrowUp') {
//         snake.y - 10 >= 0 ? (snake.y -= 10) : null;
//     } else if (e.key === 's' || e.key === 'ArrowDown') {
//         snake.y + 10 <= game.height - donkey.height ? (snake.y += 10) : null;
//     } else if (e.key === 'a' || e.key === 'ArrowLeft') {
//         snake.x - 10 >= 10 ? (snake.x -= 10) : null;
//     } else if (e.key === 'd' || e.key === 'ArrowRight') {
//         snake.x + 10 <= game.width - donkey.width ? snake.x += 10 : null;
//     }
// }

// create function for the apple to respawn at random
function foodSpot() {
    random_x = Math.floor(Math.random() * (game.height - 5)); 
    random_y = Math.floor(Math.random() * (game.width - 5));  
}    

// create function for when the snake hit itself
const detectHit = () => {
    if (snake.x + snake.width > apple.x &&
        snake.x < apple.x + apple.width &&
        snake.y + snake.height > apple.y &&
        snake.y < apple.y + apple.height ) { 
           score++;
        apple.alive = false;
        let snakeBody = new Crawler(80, 80, 10, 10, 'green');
        snakeArray.push(snakeBody);

        appleSpot(apple);
        apple = new Food(random_x, random_y, 5, 5, 'red');
    }
}  

// create function for the game play on canvas
function gamePlay() {
        
    ctx.clearRect(0,0, game.width, game.height);

// use for loop to show the snake movement on the canvas
    for (let i = (snakeArray.length - 1); i > 0; i--){ 
      snakeArray[i].x = snakeArray[i - 1].x; 
      snakeArray[i].y = snakeArray[i - 1].y;    
      snakeArray[i].render();  
    } 

    snake.update();
    snake.render();
    apple.render();
    detectHit();

    // update score of current game and show high score
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('right-top').textContent = 'High Score: ' + highScore;
    gameStatus = false;
    message = document.getElementById('gameMessage');
    lost = document.getElementById('youDie');
    
    // restart the game when it is over
    restartBtn.addEventListener('click', startGame);
  
    // use for loop to indicate when the snake hit itself and signal game over
    for (let i = 0; i < snakeArray.length; i++){
        if (snakeArray[0].x === snakeArray[i].x &&
            snakeArray[0].y === snakeArray[i].y ) {
            console.log('You lost! Please play again');
            clearInterval(gameLoop);
            
            message.style.display = 'block';
            lost.style.display = 'block';
            restartBtn.style.display = 'block';
            
         }
    }
    //     if (localStorage.getItem('highScore')) {
    //         highScore = localStorage.getItem('highScore')
    //     } else {
    //         localStorage.setItem('highScore', 0)
    //     }
    //     if (score > highScore) {
    //         localStorage.setItem('highScore', score)
    // }
    //gameOver();
}

let gameStatus = true;

// create function to start playing game
let startGame = () => {

    info.style.display = 'none';
    container.style.display = 'block';

    //infoScreen = document.querySelector('.info');
    message = document.getElementById('gameMessage');
    lost = document.getElementById('youDie');
    

    //infoScreen.style.display = 'block';
    
    //console.log(infoScreen.style);

    restartBtn.style.display = 'none';
    message.style.display = 'none';
    lost.style.display = 'none';


    // use the crawler function for the snake to show snake growth 
        snake = new Crawler(120, 120, 15, 15, 'blue');
        // snakeArray =  [];
        snakeArray.push(snake);   
        score = 0; 
        gameLoop = setInterval(function () {
            gamePlay();           
        }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dom loaded')
    // DOM REFS
  
    movementDisplay = document.getElementById('movement');
    game = document.getElementById('game');
    console.log(game);
   
    // CANVAS CONFIG
  
    game.setAttribute('height', '600px');
    game.setAttribute('width', '600px');
    ctx = game.getContext('2d');
  
      playBtn.addEventListener('click', startGame);
      playBtn.style.display = 'block';
  
    // CHARACTER REFS
    apple = new Food(300, 100, 15, 15, 'red');
    snake = new Crawler(150, 150, 20, 20, '#FF00FF');
    
    
  //   snakeBody = new Crawler(100, 100, 20, 20, 'blue');
  //   snakeBody2 = new Crawler(80, 80, 20, 20, 'red');
  
      snakeArray.push(snake);
  
    document.addEventListener('keydown', ((e) => {
        let newDirection = e.keyCode;
        snake.movementHandler(newDirection);
       // snakeBody.newMove(newDirection);
      }))
   
  });
