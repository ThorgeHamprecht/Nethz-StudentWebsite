document.body.style.overflow = "hidden";


//board
var blockSize = 25;
var rows = 20;
var columns = 25;
var board;
var context;

// Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Snake Speed
var xSpeed = 0;
var ySpeed = 0;

// Temporary Speed Values
var tempXspeed = 0;
var tempYspeed = 0;

// Snake Body
var snakeBody = [];

// Collectables
var foodX = 0;
var foodY = 0;

// Game State
var gameOver = false;
var blinkingHead = 0;
var score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = (rows + 1) * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    //push initial values to arrays to avoid null-pointer
    snakeBody.push([snakeX, snakeY]);

    placeCollectables();

    document.addEventListener("keydown", movement);

    //update();
    setInterval(update, 1000/10);
}

function update () {
    //game-over update stop
    if (gameOver) {
        blinkingHead += 1;
        if (blinkingHead > 2) {
            context.fillStyle = "tomato";
            context.fillRect(snakeX, snakeY, blockSize, blockSize);
            if (blinkingHead === 4 ) {
                blinkingHead = 0;
            }
        }
        else {
            context.fillStyle = "gainsboro";
            context.fillRect(snakeX, snakeY, blockSize, blockSize);
        }
        return;
    }

    //fill canvas with black background
    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);
    console.log("got here");
    //update position
    snakeX += tempXspeed * blockSize;
    snakeY += tempYspeed * blockSize;

    //reassign speed values
    xSpeed = tempXspeed;
    ySpeed = tempYspeed;

    //collision detection (with food)
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([snakeX, snakeY]);
        placeCollectables();
        score += 1;
    }
    //remove snake tail
    else {
        snakeBody.push([snakeX, snakeY]);
        snakeBody.shift();
    }

    //draw collectables
    context.fillStyle = "salmon";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //draw snake body
    for (let i = 0; i < snakeBody.length; i++) {
        //gameover check
        if (i !== snakeBody.length - 1 && snakeBody[i][0] === snakeX && snakeBody[i][1] === snakeY) {
            gameOver = true;
        }
        context.fillStyle = "seagreen";
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //out of bounds check
    if ((snakeX < 0 || snakeX >= columns * blockSize) || (snakeY < 0 || snakeY >= rows * blockSize)) {
        gameOver = true;
    }

    //draw snake head
    context.fillStyle = "lightseagreen";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //draw score
    context.fillStyle = "navajowhite";
    context.fillRect(0, rows * blockSize, columns*blockSize, blockSize);

    context.font = "20px Kumbh sans";
    context.textAlign = "start";
    context.fillStyle = "snow";
    context.fillText("Score: " + score, 25, blockSize * rows + 20);

}

function placeCollectables() {

    //first assignment of random position
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    //free space check
    for (let i = 0; i < snakeBody.length; i++) {
        if (foodX === snakeBody[i][0] && foodY === snakeBody[i][1]) {
            placeCollectables();
        }
    }
}

function movement(o) {
    if ((o.code === "KeyW" || o.code === "ArrowUp") && ySpeed !== 1){
        tempXspeed = 0;
        tempYspeed = -1;
    }
    else if ((o.code === "KeyS" || o.code === "ArrowDown") && ySpeed !== -1) {
        tempXspeed = 0;
        tempYspeed = 1;
    }
    else if ((o.code === "KeyA" || o.code === "ArrowLeft") && xSpeed !== 1) {
        tempXspeed = -1;
        tempYspeed = 0;
    }
    else if ((o.code === "KeyD" || o.code === "ArrowRight") && xSpeed !== -1) {
        tempXspeed = 1;
        tempYspeed = 0;
    }

}