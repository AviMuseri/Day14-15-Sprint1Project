'use-strict'

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {

            var currCell = board[i][j]

            if (!currCell.isMine) {

                board[i][j].minesAroundCount = countNegsMines(i, j, board)

            }
        }
    }

}


function countNegsMines(cellI, cellJ, board) {

    var minesAroundCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (i === cellI && j === cellJ) continue

            if (j < 0 || j >= board[i].length) continue

            if (board[i][j].isMine) minesAroundCount++

        }

    }

    return minesAroundCount

}


function findNegs(board, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            currCell = board[i][j]

            if (i === cellI && j === cellJ) continue

            if (j < 0 || j >= board[i].length) continue

            if (!currCell.isMine) {
                if (currCell.isShown) {
                    gGame.shownCount--
                }
                // update model
                board[i][j].isShown = true

                // update dom
                updateScore()

            }

        }

    }

}


function showNegs(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {

            var currCell = board[i][j]

            if (currCell.isShown) {
                cellClicked(i, j)
            }

        }

    }

}
