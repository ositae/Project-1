<!-- # Project-1
Create a game -->
Design a snake game that allows the user to move the snake on a canvas grid.
There were several challenges that arose from designing this game. The most important blocker was how to make the snake grow as it consumes the apple. For that I used an array and a for loop for where it pushes into the snake array as it consumes the food. The code block below shows how I was able to accomplish that blocker.

for (let i = (snakeArray.length - 1); i > 0; i--){ // i is always going to start at 0
      snakeArray[i].x = snakeArray[i - 1].x; //put its in different place in the array 
      snakeArray[i].y = snakeArray[i - 1].y; // minus    
      snakeArray[i].render();  
    } 

Another blocker was getting the snake to move be unable to move backwards. In my initial run, when the snake grows to past 6 apples eaten and you move backwards in any direction, the snake hits its tail automatically and the user loses the game. Using the switch method, declaring a new function called newMove with a parameter, and variable definitions for the movement keys, I was able to accomplish that task. The code block below shows how it the blocker was passed.

const up_arrow = 38;
const down_arrow = 40;
const right_arrow = 39;
const left_arrow = 37;

this.newMove = function(newDirection) {
    switch(newDirection) {
        case (up_arrow):
           if (this.speedY !== 10) {
            this.speedX = 0;
            this.speedY = -10;
           }
            break;
        case (down_arrow):
            if (this.speedY !== -10){
                this.speedX = 0; 
                this.speedY = 10;
            }
            break;

        case (right_arrow):
            if (this.speedX !== -10){
                this.speedX = 10;
                this.speedY = 0;
            }
            break;

        case(left_arrow):
        if (this.speedX !== 10){
            this.speedX = -10;
            this.speedY = 0;  
        }
            break;  
        }
    }
}

The snake game reminded me of my childhood when I played the game with my parents phone. Another important blocker is in the design of the game and canvas. I wanted to use the picture of the classic nokia phone with the screen as the canvas for the game. I was able to achieve this by using a phone image as the body, crop another image and set it as the background canvas, and implement apple and snake animations.
I used the method ctx.drawImage() to fill in the images from the html file.
The approach taken to creating the game is by declaring global variables, creating class for the snake, and the food, using functions newMove(), appleSpot(), detectHit() and gameInit() to run code to render() on html. Use array to make the snake grow, and Math.floor(Math.random()) to respawn the apple each time it is eaten.
I plan on implementing a timer to the game. This will give it a different mode where the user can play for a certain amount of time to determine the score. Or play until the user reaches a certain score. I would also like to implement the game in a way that can be played with the W-A-S-D keys as well.
![Alt text](<Screen Shot 2023-10-08 at 11.37.15 AM.png>)
![Alt text](<Screen Shot 2023-10-08 at 11.37.54 AM.png>)
![Alt text](<Screen Shot 2023-10-08 at 11.40.31 AM.png>)
![Alt text](<Screen Shot 2023-10-08 at 11.41.48 AM.png>)