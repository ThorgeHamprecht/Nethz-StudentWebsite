//board
var blockSize = 25;
var rows = 20;
var columns = 25;
var board;
var context;

// Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Collectables
var foodX = blockSize * 8;
var foodY = blockSize * 9;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    placeCollectables();
    document.addEventListener("keyup", movement);

    update();
}

function update () {
    console.log(context);
    context.fillStyle = "midnight";
    context.fillRect(0,0, board.width, board.height);

    //draw snake
    context.fillStyle = "lightseagreen";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //draw collectables
    context.fillStyle = "salmon";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function placeCollectables() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    while (foodX == snakeX && foodY == snakeY) {
        foodX = Math.floor(Math.random() * columns) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
}

function movement() {

}