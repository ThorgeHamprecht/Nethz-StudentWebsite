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

// Between Update Direction
var tempSpeedX = 0;
var tempSpeedY = 0;

// Snake Body
var snakeBody = [];

// Collectables
var foodX = 0;
var foodY = 0;

// Game State
var gameOver = false;
var blinkingHead = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

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

    //update position
    snakeX += tempSpeedX * blockSize;
    snakeY += tempSpeedY * blockSize;
    //reassign speed, so snake cant turn into itself
    xSpeed = tempSpeedX;
    ySpeed = tempSpeedY;

    //collision detection (with food)
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([snakeX, snakeY]);
        placeCollectables();
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
    if (snakeX < 0 && snakeX >= columns * blockSize && snakeY < 0 && snakeY >= rows * blockSize) {
        gameOver = true;
    }

    //draw snake head
    context.fillStyle = "lightseagreen";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

}

function placeCollectables() {
    var available = false;

    //first assignment of random position
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    //free space check
    /*while (!available) {
        var counter = 0;
        for (let i = 0; i < snakeBody.length; i++) {
            if (foodX === snakeBody[i][0] && foodY === snakeBody[i][1]) {
            }
            else {
                counter++;
            }
        }
        if (counter === snakeBody.length - 1) {
            available = true;
        }
    }*/
}

function movement(o) {
    if ((o.code === "KeyW" || o.code === "ArrowUp") && ySpeed !== 1){
        tempSpeedX = 0;
        tempSpeedY = -1;
    }
    else if ((o.code === "KeyS" || o.code === "ArrowDown") && ySpeed !== -1) {
        tempSpeedX = 0;
        tempSpeedY = 1;
    }
    else if ((o.code === "KeyA" || o.code === "ArrowLeft") && xSpeed !== 1) {
        tempSpeedX = -1;
        tempSpeedY = 0;
    }
    else if ((o.code === "KeyD" || o.code === "ArrowRight") && xSpeed !== -1) {
        tempSpeedX = 1;
        tempSpeedY = 0;
    }

}