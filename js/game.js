'use strict'

const WALL = '🔲'
const FOOD = '🔸'
const SUPERFOOD = '💙'
const EMPTY = ' '
const CHERRY = '🍒'


const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gCherryInterval 

function onInit() {
    const elGameOver = document.querySelector(".gameover")
    elGameOver.style.display = "none"
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval= setInterval(addCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if ((i === 1 && j === 1) || (i === 1 && j === size - 2) || (i === size - 2 && j === 1) || (i === size - 2 && j === size - 2)) board[i][j] = SUPERFOOD
            else {
                board[i][j] = FOOD
            }
        }
    }
    console.log('board:',board)
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}

function addCherry() {
    const idx = getRandomInt(0, gEmptyCells.length)
    const currCell = gEmptyCells[idx]
    renderCell(currCell,CHERRY)
    gBoard[currCell.i][currCell.j] = CHERRY
    console.log( gBoard[currCell.i][currCell.j]);

}

function gameOver() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    const elMsg = document.querySelector(".gameover span")
    const elGameOver = document.querySelector(".gameover")
    elMsg.innerText = "GAME OVER"
    elGameOver.style.display = "inline"
}

function victory() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    const elMsg = document.querySelector(".gameover span")
    const elGameOver = document.querySelector(".gameover")
    elMsg.innerText = "YOU WON!"
    elGameOver.style.display = "inline"
}