'use-strict'
const gLevel = {
    SIZE: 4,
    MINES: 2
}
const MINES = '💣'
const countSHOWN = 14
const countMarked = 2
const FLAG = '🚩'

//modal :
var gBoard
const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gBoard = buildBoard(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)

}

function createCellObject() {
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}

function buildBoard(board) {
    var board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCellObject()
        }
    }


    board[2][2].isMine = true
    board[1][1].isMine = true
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'

        for (var j = 0; j < board[0].length; j++) {

            const currCell = board[i][j]
            const className = `cell cell-${i}-${j}`

            if (currCell.isMine) {
                strHTML += `<td oncontextmenu="onCellMarked(this, ${i} , ${j})" 
                onclick="onCellClicked(this, ${i} , ${j})" class="${className}">
                ${MINES}
                </td>`
            } else {
                strHTML += `<td oncontextmenu="onCellMarked(this, ${i} , ${j})" 
                onclick="onCellClicked(this, ${i} , ${j})" class="${className}">
                ${currCell.minesAroundCount}
                </td>`
            }
        }

        strHTML += '</tr>'

    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCell(i, j) {
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.classList.add('clicked')

}

function onCellClicked(elCell, i, j) {
    //TO-DO !!!:gGame.secsPassed = startStopwatch()

    var currCell = gBoard[i][j]
    if (elCell.innerHTML === FLAG) return
    if (currCell.isMine) {
        renderCell(i, j)
        gameOver()
    } else if (currCell.minesAroundCount === 0) {
        currCell.isShown = true
        gGame.shownCount++
        findNegs(gBoard, i, j)
        showNegs(gBoard)


    } else if (currCell.minesAroundCount > 0) {
        currCell.isShown = true
        gGame.shownCount++
        renderCell(i, j)
    }
    if (isVictory()) {
        console.log("Victory")
    }


}

function onCellMarked(elCell, i, j) {
    displayRightClick()
    elCell.innerHTML = FLAG
    gGame.markedCount++
    if (isVictory()) {
        console.log("Victory")
        gGame.isOn = false
    }
}

function isVictory() {

    return (gGame.shownCount === countSHOWN) &&
        (gGame.markedCount === countMarked)
}

function gameOver() {
    console.log("game over")
}
