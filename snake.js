//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    update();
}

function update () {
    console.log(context);
    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);
}