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
/////////////////////////////////////////////////////////////

const MINES = '💣'
const FLAG = '🚩'

//modal :
const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0, // set stopwatch
    lives: 0
}

var gLevel = gBginner
var gBoard
var gMinesLocation
var gFirstClicked = 0


function onInit() {

    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.lives = 3
    gMinesLocation = []
    updateLives(true)
    updateSmileyButton('Normal')
    resetScore()
    gBoard = buildBoard(gBoard)
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

function createMines(board, MinesAmount) {

    var location

    for (var i = 0; i < MinesAmount; i++) {
        location = getRandLocation()
        board[location[0]][location[1]].isMine = true
    }

}


function buildBoard(board) {

    var board = []

    for (var i = 0; i < gLevel.SIZE; i++) {

        board[i] = []

        for (var j = 0; j < gLevel.SIZE; j++) {

            board[i][j] = createCellObject()

        }
    }

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
                strHTML += `
                <td oncontextmenu="onCellMarked(this, ${i} , ${j})" 
                onclick="onCellClicked(this, ${i} , ${j})" class="${className}">
                    <span class = "hide">
                        ${MINES}
                    </span>
                </td>`
            } else {
                strHTML += `
                <td oncontextmenu="onCellMarked(this, ${i} , ${j})" onclick="onCellClicked(this, ${i} , ${j})" class="${className}">
                    <span class = "hide">
                        ${currCell.minesAroundCount}
                    </span>
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

    var elCellShow = document.querySelector(`.cell-${i}-${j} > span`)
    if (elCellShow.classList.contains('hide')) {

        elCellShow.classList.remove('hide')

    }

}

function onCellClicked(elCell, i, j) {

    gFirstClicked++

    if (gFirstClicked === 1) {

        gMinesLocation = getAllIndex(i, j)
        createMines(gBoard, gLevel.MINES)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)

    }
    if (!gGame.isOn) return

    //TO-DO !!!:gGame.secsPassed = startStopwatch()
    var currCell = gBoard[i][j]

    if (currCell.isShown) return
    if (currCell.isMarked) return

    if (currCell.isMine) {

        updateLives()
        cellClicked(i, j)
        if (gGame.lives === 0) {
            gameOver()
        }

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
        updateSmileyButton("Win")
        gGame.isOn = false
    }


}

function onCellMarked(elCell, i, j) {

    displayRightClick()
    var currCell = gBoard[i][j]

    if (currCell.isShown) return

    if (currCell.isMarked) {
        currCell.isMarked = false
        removeFlag(elCell, i, j)
        gGame.markedCount--
    } else if (currCell.isMine) {
        currCell.isMarked = true
        elCell.innerHTML = FLAG
        gGame.markedCount++

    } else {
        currCell.isMarked = true
        elCell.innerHTML = FLAG
        gGame.markedCount++
    }


    if (isVictory()) {
        updateSmileyButton("Win")
        gGame.isOn = false
    }
}
function removeFlag(elCell, i, j) {

    if (gBoard[i][j].isMine) {
        elCell.innerHTML = MINES

    } else {

        console.log(gBoard[i][j].minesAroundCount)
        elCell.innerText = ''

    }

}

function isVictory() {

    return (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES)) &&
        (gGame.markedCount === gLevel.MINES)
}

function gameOver() {
    updateSmileyButton('Lose')
    gGame.isOn = false
}


function restart() {
    gFirstClicked = 0
    onInit()
}

function updateScore() {

    gGame.shownCount++

    var score = document.querySelector('.finalScore')
    score.innerText = gGame.shownCount

}

function updateLives(isStarted) {

    if (!isStarted) {
        gGame.lives--

    }

    var score = document.querySelector('.lives')
    score.innerText = gGame.lives
}

function resetScore() {

    gGame.shownCount = 0
    var score = document.querySelector('.finalScore')
    score.innerText = gGame.shownCount
}

function levelPick(elBtnLevel) {

    switch (elBtnLevel.innerHTML) {

        case 'Beginner':
            gLevel = gBginner
            break;

        case 'Medium':
            gLevel = gMedium
            break;

        case 'Expert':
            gLevel = gExpert
            break;

    }

    restart()
}

function updateSmileyButton(smileyStr) {

    var smiley = ''
    switch (smileyStr) {

        case 'Win':
            smiley = '😎'
            break;

        case 'Lose':
            smiley = '🤯'
            break;

        case 'Normal':
            smiley = '😀'
            break;

    }

    var elBtn = document.querySelector(".restart-button")
    elBtn.innerHTML = smiley
}