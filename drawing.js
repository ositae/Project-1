//global variables
let movementDisplay;
let ctx
let game;
let snake;
let apple;



document.addEventListener('DOMContentLoaded', () => {
    console.log('Dom loaded')
    // DOM REFS
    movementDisplay = document.getElementById('movement');
    game = document.getElementById('game');
    // CANVAS CONFIG
    game.setAttribute('height', 400);
    game.setAttribute('width', 400);
    ctx = game.getContext('2d');
    // CHARACTER REFS
    apple = new Crawler(300, 100, 15, 15, 'red');
    snake = new Crawler(150, 150, 20, 20, 'yellow');
    document.addEventListener('keydown', movementHandler);
    let runGame = setInterval(gameLoop, 60);
  })


