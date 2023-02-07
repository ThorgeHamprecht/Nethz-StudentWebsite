//board
var blockSize = 25;
var rows = 20;
var columns = 25;
var board;
var context;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    board.getContext("2d")
}