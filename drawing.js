//global variables
let movementDisplay;
let ctx
let game;
let snake;
let apple;



document.addEventListener('DOMContentLoaded', () => {
    movementDisplay = document.getElementById('movement');
    game = document.getElementById('game');
    game.setAttribute('height', 600);
    game.setAttribute('width', 600);
    ctx = game.getContext('2d');
    apple = new Crawler(300, 100, 15, 15, 'red');
    snake = new Crawler(150, 150, 20, 20, 'yellow');

    // add event listener for when arrow key moves
    document.addEventListener('keydown', movementHandler);
    let runGame = setInterval(gameLoop, 60);
  })


