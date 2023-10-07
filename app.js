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
if (this. y > game.width) {
    this.y = 0;
} 
if (this.x < 0) {
    this.x = game.width
} 
if (this.y < 0) {
    this.y = game.height
}    
} 

//t create function for food (apple) for the snake
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

        locateApple(apple);
        apple = new Food(random_x, random_y, 5, 5, 'red');
    }
}  

// create function for the game play on canvas
function gamePlay() {
        
    ctx.clearRect(0,0, game.width, game.height);
        
    for (let i = (snakeArray.length - 1); i > 0; i--){ 
      snakeArray[i].x = snakeArray[i - 1].x; 
      snakeArray[i].y = snakeArray[i - 1].y;    
      snakeArray[i].render();  
    } 

    snake.update();
    snake.render();
    apple.render();
    detectHit();

    document.getElementById('score').textContent = "Score: " + score;

    document.getElementById('right-top').textContent = 'High Score: ' + highScore;

    message = document.getElementById('gameMessage');
   
    gameStatus = false;
    

    lost = document.getElementById('youDie');

    restartBtn.addEventListener('click', startGame);
  
    for ( let i = 0; i < snakeArray.length; i++){
        if (snakeArray[0].x === snakeArray[i].x &&
            snakeArray[0].y === snakeArray[i].y ) {
            console.log('You lost! Please play again');
            clearInterval(gameLoop);
            
            message.style.display = 'block';
            lost.style.display = 'block';
            restartBtn.style.display = 'block';
            
         }
    }
        if (localStorage.getItem('highScore')) {
            highScore = localStorage.getItem('highScore')
        } else {
            localStorage.setItem('highScore', 0)
        }
        if (score > highScore) {
            localStorage.setItem('highScore', score)
    }
    //gameOver();
}