'use-strict'

function displayRightClick() {

    var board = document.querySelector('.board')

    board.addEventListener('contextmenu', function (event) {
        event.preventDefault()
    })
}