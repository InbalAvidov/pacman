'use strict'

const PACMAN = '😮'
var gPacman
var gEmptyCells = []
var gRemovedGhosts = []
var gRemovedGhost


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('nextCell:', nextCell)
    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var x = 0; x < gGhosts.length; x++) {

                if (gGhosts[x].location.i === nextLocation.i && gGhosts[x].location.j === nextLocation.j) {
                    if (gGhosts[x].currCellContent === FOOD) updateScore(1)
                    gRemovedGhost = gGhosts.splice(x, 1)
                    gRemovedGhosts.push(gRemovedGhost[0])
                }
            }
        }
        else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--
        if (isVictory(gBoard)) victory()
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }


    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            for (var i = 0; i < gRemovedGhosts.length; i++) gGhosts.push(gRemovedGhosts[i])
            console.log(gGhosts);
            gRemovedGhosts = []
        }, 5000)
    }



    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    if (!gEmptyCells.includes(gPacman.location)) gEmptyCells.push(gPacman.location)
    renderCell(gPacman.location, EMPTY)
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
