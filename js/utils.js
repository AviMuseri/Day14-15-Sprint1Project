'use-strict'

function displayRightClick() {

    var board = document.querySelector('.board')

    board.addEventListener('contextmenu', function (event) {
        event.preventDefault()
    })

}
function getRandomIntInclusive(min, max) {

    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)

}

function getAllIndex(currI, currJ) {

    for (var i = 0; i < gLevel.SIZE; i++) {

        for (var j = 0; j < gLevel.SIZE; j++) {
            if (i === currI && j === currJ) continue

            gMinesLocation.push([i, j])

        }

    }
    return gMinesLocation
}

function getRandLocation() {

    var randomIdx = getRandomIntInclusive(0, gMinesLocation.length - 1)
    var location = gMinesLocation[randomIdx]

    gMinesLocation.splice(randomIdx, 1)

    return location
}

