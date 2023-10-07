let movementDisplay;
let ctx
let game;
let snake;
let apple; //food
 //have an array for the snake body
let random_x;
let random_y;
let score = 0;
let highScore = 0;
let snakeArray = [];
let restartBtn = document.getElementById('restartBtn');
let playBtn = document.getElementById('playBtn');

// this is for my snake character
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
  this.update = function() {
            this.x += this.speedX;//this is for speed
            this.y += this.speedY;// this is for speed
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

this.newMove = function(newDirection) {
    switch(newDirection) {
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

//this is for my apple character
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
function locateApple() {
    random_x = Math.floor(Math.random() * (game.height - 15)); //need to take the height number
    random_y = Math.floor(Math.random() * (game.width - 15)); // need to take the width number   
}    

const detectHit = () => {
    if (snake.x + snake.width > apple.x &&
        snake.x < apple.x + apple.width &&
        snake.y + snake.height > apple.y &&
        snake.y < apple.y + apple.height ) { 
           score++;
        apple.alive = false;
        let snakeBody = new Crawler(100, 100, 20, 20, '#4B0082');
        snakeArray.push(snakeBody);

        locateApple(apple);
        apple = new Food(random_x, random_y, 15, 15, 'red');
    }
}  

function gameInit() {
        
    ctx.clearRect(0,0, game.width, game.height);

    for (let i = (snakeArray.length - 1); i > 0; i--){ // i is always going to start at 0
      snakeArray[i].x = snakeArray[i - 1].x; //put its in different place in the array 
      snakeArray[i].y = snakeArray[i - 1].y; // minus    
      snakeArray[i].render();  
    } 

    snake.update();
    snake.render();
    apple.render();
    detectHit();

    document.getElementById('score').innerText = "Score: " + score;

    document.getElementById('top-right').innerText = 'High Score: ' + highScore;

    message = document.getElementById('gameMessage');
   
    gameStatus = false;
    

    lost = document.getElementById('youDie');

    restartBtn.addEventListener('click', startGame);
  
    for ( let i = 5; i < snakeArray.length; i++){
        if (snakeArray[0].x === snakeArray[i].x &&
            snakeArray[0].y === snakeArray[i].y ) {
            console.log('you lost!');
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
let gameStatus = true;



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


        snake = new Crawler(150, 150, 20, 20, '#FF00FF');
        snakeArray =  [];
        snakeArray.push(snake);   
        score = 0; 
        gameLoop = setInterval(function () {
            gameInit();
                    
        }, 25);

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
      snake.newMove(newDirection);
     // snakeBody.newMove(newDirection);
    }))


 
});