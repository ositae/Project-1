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