console.log('this console works');


// create variable for board size and dimension for the snake game
const blockSize = 25;
const rowTotal = 20;
const columnTotal = 20;
const board;
const context

// create variable for coordinate for the snake 
const snakeX = blockSize * 3;
const snakeY = blockSize * 3;

// create variable for starting location for the snake
const speedX = 0;
const speedY = 0;

// create array variable for the snake body
const snakeBody = [];

// create variable for snake food
const appleX;
const appleY;

// create variable to game ending; return boolean
const gameOver = false;

// run function when window open up
window.onload = function () {
    // create game on window, give it height and width
    game = document.getElementById("game");
    game.height = rowTotal * blockSize;
    game.width = columnTotal * blockSize;
    // set the game dimension to 2d
    context = game.getContext("2d");
    // create function for the food to spawn
    foodSpot();
    document.addEventListener("keyup" || "w", changeDirection);
    // set the snake speed
    setInterval(update, 1000);
}