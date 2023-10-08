let movementDisplay; // 
let ctx
let game;
let snake;
let apple; 
let random_x;
let random_y;
let score = 0;
let highScore = 0;
let snakeArray = [];
let restartBtn = document.getElementById('restartBtn');
let playBtn = document.getElementById('playBtn');
let snakeImg = document.getElementById('snake-img');
let appleImg = document.getElementById('apple-img');
// console.log(appleImg);

// create crawler class for snake, this is for snake character
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
  this.render = function() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);   
    ctx.drawImage(snakeImg, this.x, this.y, this.width, this.height);
  }
  
  // declare update as function for the initial
  // speed of the snake
  this.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
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

//I don't want the snake moving the opposite direction
//name arrow keys as variables to make it readable
const up_arrow = 38;
const down_arrow = 40;
const right_arrow = 39;
const left_arrow = 37;

// create function newMove to make snake movement
// use switch method instead of if statement for directional movement
// if speed at either direction !== 10 in that direction
// the snake will move not move backwards 
this.newMove = function(newDirection) {
    switch(newDirection) {
        case (up_arrow):
           if (this.speedY !== 7) {
            this.speedX = 0;
            this.speedY = -7;
           }
            break;
        case (down_arrow):
            if (this.speedY !== -7){
                this.speedX = 0; 
                this.speedY = 7;
            }
            break;

        case (right_arrow):
            if (this.speedX !== -7){
                this.speedX = 7;
                this.speedY = 0;
            }
            break;

        case(left_arrow):
        if (this.speedX !== 7){
            this.speedX = -7;
            this.speedY = 0;  
        }
            break;  
        }
    }
}
// create food class for snake food
// this is for my apple character
function Food (x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.total = 1;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function() {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(appleImg, this.x, this.y, this.width, this.height);
        ctx.drawImage(appleImg, this.x, this.y, this.width, this.height);

    }
}

// create function appleSpot for where the apple will respawn
// set apple size
function appleSpot() {
    random_x = Math.floor(Math.random() * (game.height - 25)); 
    random_y = Math.floor(Math.random() * (game.width - 25));   
}    

// declare function detectHit as a variable for the snake to die when
// it hits itself using snakeArray and snakeBody crawler class
const detectHit = () => {
    if (snake.x + snake.width > apple.x &&
        snake.x < apple.x + apple.width &&
        snake.y + snake.height > apple.y &&
        snake.y < apple.y + apple.height ) { 
           score++;
        apple.alive = false;

        // call crawler class as snakeBody and push array 
        let snakeBody = new Crawler(100, 100, 30, 30, 'pink');
        snakeArray.push(snakeBody);

        // call function for apple to respawn
        //using Food class
        appleSpot(apple);
        apple = new Food(random_x, random_y, 25, 25);
    }
}  

// create function gameInit using init funition to set
// game play conditionals
function gameInit() {
        
    // set canvas 2d for game play
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
    document.getElementById('top-right').textContent = 'High Score: ' + highScore;

    message = document.getElementById('gameMessage');
   
    gameStatus = false;
    
    lost = document.getElementById('youDie');

    restartBtn.addEventListener('click', startGame);
  
    for ( let i = 5; i < snakeArray.length; i++){
        if (snakeArray[0].x === snakeArray[i].x &&
            snakeArray[0].y === snakeArray[i].y ) {
            console.log('Game Over! You Lost!');
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
}
let gameStatus = true;

let startGame = () => {

    info.style.display = 'none';
    container.style.display = 'block';

    // display message when user playing game hits itself
    message = document.getElementById('gameMessage');
    lost = document.getElementById('youDie');

    restartBtn.style.display = 'none';
    message.style.display = 'none';
    lost.style.display = 'none';

        // push snake into array during game play while
        // eating apple
        snake = new Crawler(0, 0, 30, 30, 'white');
        snakeArray =  [];
        snakeArray.push(snake);   
        score = 0; 
        gameLoop = setInterval(function () {
            gameInit();
                    
        }, 20);

}

// add event listener to load the document on the page
document.addEventListener('DOMContentLoaded', () => {
  
// use variable movementDisplay to put snake character
//on the document
  movementDisplay = document.getElementById('movement');
  game = document.getElementById('game');

  // adjust the size and positon of the canvas
  game.setAttribute('height', '600px');
  game.setAttribute('width', '600px');
  ctx = game.getContext('2d');

    // add event listener for when user clicks the play button
    playBtn.addEventListener('click', startGame);
    playBtn.style.display = 'block';

    // put snake character and food item onto the canvas
    apple = new Food(300, 100, 15, 15, appleImg);
    snake = new Crawler(150, 150, 20, 20);
    snakeArray.push(snake);

  document.addEventListener('keydown', ((e) => {
      let newDirection = e.keyCode;
      snake.newMove(newDirection);
    }))
});

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}