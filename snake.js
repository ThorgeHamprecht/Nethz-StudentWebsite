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

var xSpeed = 0;
var ySpeed = 0;

// Collectables
var foodX = blockSize * 8;
var foodY = blockSize * 9;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    placeCollectables();
    document.addEventListener("keydown", movement);

    //update();
    setInterval(update, 1000/10);
}

function update () {
    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    //update position
    snakeX += xSpeed * blockSize;
    snakeY += ySpeed * blockSize;

    //collision detection
    if (snakeX === foodX && snakeY === foodY) {
        placeCollectables();
    }

    //draw collectables
    context.fillStyle = "salmon";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //draw snake
    context.fillStyle = "lightseagreen";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

}

function placeCollectables() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    while (foodX === snakeX && foodY === snakeY) {
        foodX = Math.floor(Math.random() * columns) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
}

function movement(o) {
    if ((o.code === "KeyW" || o.code === "ArrowUp") && ySpeed !== 1){
        xSpeed = 0;
        ySpeed = -1;
        console.log("test");
    }
    else if ((o.code === "KeyS" || o.code === "ArrowDown") && ySpeed !== -1) {
        xSpeed = 0;
        ySpeed = 1;
    }
    else if ((o.code === "KeyA" || o.code === "ArrowLeft") && xSpeed !== 1) {
        xSpeed = -1;
        ySpeed = 0;
    }
    else if ((o.code === "KeyD" || o.code === "ArrowRight") && xSpeed !== -1) {
        xSpeed = 1;
        ySpeed = 0;
    }

}