'use-strict'

function displayRightClick() {

    var board = document.querySelector('.board')

    board.addEventListener('contextmenu', function (event) {
        event.preventDefault()
    })
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
function getRandomUniqueNumbers(range, count) {
    // Create an array with the range of numbers
    let numbers = Array.from({ length: range }, (v, k) => k + 1); // [1, 2, 3, ..., range]

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Return the first 'count' numbers from the shuffled array
    return numbers.slice(0, count);
}