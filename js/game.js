'use-strict'

const gBginner = {
    SIZE: 4,
    MINES: 2
}

const gMedium = {
    SIZE: 8,
    MINES: 14
}

const gExpert = {
    SIZE: 12,
    MINES: 32
}

const MINES = '💣'
const countSHOWN = 14
const countMarked = 2
const FLAG = '🚩'

//modal :
const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = gBginner
var gBoard


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
    console.log(gLevel.SIZE)
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCellObject()
        }
    }
    createMines(board, gLevel.MINES)
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

function cellClicked(i, j) {
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.classList.add('clicked')

}

function onCellClicked(elCell, i, j) {
    //TO-DO !!!:gGame.secsPassed = startStopwatch()
    var currCell = gBoard[i][j]
    if (currCell.isShown) return
    if (elCell.innerHTML === FLAG) return
    if (currCell.isMine) {

        cellClicked(i, j)
        gameOver()
    } else if (currCell.minesAroundCount === 0) {
        // update model 
        currCell.isShown = true

        findNegs(gBoard, i, j)
        showNegs(gBoard)
        // update dom 
        updateScore()


    } else if (currCell.minesAroundCount > 0) {
        // update model
        currCell.isShown = true
        // update dom 

        updateScore()

        cellClicked(i, j)
    }

    if (isVictory()) {
        console.log("Victory")
    }


}

function onCellMarked(elCell, i, j) {
    displayRightClick()
    if (elCell.innerHTML === FLAG) {

        removeFlag(elCell, i, j)
    } else {

        elCell.innerHTML = FLAG
        gGame.markedCount++
    }
    if (isVictory()) {

        console.log("Victory")
        gGame.isOn = false
    }

}

function isVictory() {

    return (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES)) &&
        (gGame.markedCount === gLevel.MINES)
}

function gameOver() {
    alert("Game over!!")
    restart()
}

function removeFlag(elCell, i, j) {

    if (gBoard[i][j].isMine) {

        elCell.innerHTML = MINES
        gGame.markedCount--
    } else {

        console.log(gBoard[i][j].minesAroundCount)
        elCell.innerHTML = gBoard[i][j].minesAroundCount
    }

}

function randomMinesLocation() {
    var locationExist = []
    const location = {
        i: getRandomIntInclusive(0, gLevel.SIZE - 1),
        j: getRandomIntInclusive(0, gLevel.SIZE - 1)
    }
    locationExist.push(location)


    return location
}

function createMines(board, MinesAmount) {
    var location = {}
    for (var i = 0; i < MinesAmount; i++) {
        location = randomMinesLocation()
        if (board[location.i][location.j].isMine) {
            location = randomMinesLocation()
        } else {
            board[location.i][location.j].isMine = MINES
        }
    }
}
function restart() {
    onInit()
}

function updateScore() {
    gGame.shownCount++
    var score = document.querySelector('.finalScore')
    score.innerText = gGame.shownCount
}

function levelPick(elBtnLevel = document.querySelector(".default")) {
    switch (elBtnLevel.innerHTML) {
        case 'beginner':
            gLevel = gBginner
            console.log(gLevel)
            break;

        case 'Medium':
            gLevel = gMedium
            console.log(gLevel)
            break;
        case 'Expert':
            gLevel = gExpert
            console.log(gLevel)
            break;

    }

    onInit()
    return gLevel
}