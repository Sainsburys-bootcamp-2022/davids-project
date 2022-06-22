// ['0', '0'] ['0', '1'] ['0', '2'] ['0', '3'] ['0', '4'] ['0', '5'] ['0', '6']
// ['1', '0'] ['1', '1'] ['1', '2'] ['1', '3'] ['1', '4'] ['1', '5'] ['1', '6']
// ['2', '0'] ['2', '1'] ['2', '2'] ['2', '3'] ['2', '4'] ['2', '5'] ['2', '6']
// ['3', '0'] ['3', '1'] ['3', '2'] ['3', '3'] ['3', '4'] ['3', '5'] ['3', '6']
// ['4', '0'] ['4', '1'] ['4', '2'] ['4', '3'] ['4', '4'] ['4', '5'] ['4', '6']
// ['5', '0'] ['5', '1'] ['5', '2'] ['5', '3'] ['5', '4'] ['5', '5'] ['5', '6']



let playerRed = "red";  //changed this from 'red' to 'the winner is' changed impure function so would like to understand how to write this in the setWinner function
let playerYellow = "yellow";
let currentPlayer = playerRed; //always start with red
let gameEnd
let boardState;
let rows = 6;
let columns = 7;
let startPosition = []; //empty array rather than producing a full array

window.onload = function () {    //works with 'this' to load html page. thanks stackoverflow
    setGame();
}

function setGame() {            //setGame creates the conditions for the game to begin. It uses variables to create a framework which builds an array for the game to progress.
    console.log(setGame, "Game is set")
    gameEnd = false;
    boardState = [];
    console.log(boardState) //rather than writing out full individual array, boardState contains the initial array
    startPosition = [5, 5, 5, 5, 5, 5, 5]; //Ground level. Bottom of rows and columns for counters.
    //The array just keeps moving 'upwards' towards zero when a turn is taken.
    console.log(startPosition, "Bottom row"); //Reminder of ground level on console
    removeElementsByClass("tile");
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS using the .push to add to the array
            row.push(' '); //adding ' ' to the array
            // HTML bit
            // create divs using JS instead of pasting multiple divs in hmtl
            let tile = document.createElement("div");
            tile.id = r.toString() + " " + c.toString(); //tile is the html element and .tostring turns r&c from numbers to strings
            tile.classList.add("tile"); //DOMTokenList object. 'whitespace' seperated tokens
            tile.addEventListener("click", setCounter);
            document.getElementById("board").append(tile); //.append linking the string of board to the html.div (tile)
        }
        boardState.push(row); //.push adding new elements to the end of an array
    }
}
function removeElementsByClass(className) {                 //reset function
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function setCounter() {         //setCounter understands the starting positions of the counter. 
    if (gameEnd) {
        console.log(gameEnd + "Game Over")
        return;
    }
    let coordinates = this.id.split(" "); //.split dividing strings into substrings, which puts them into an array
    console.log(this)
    //telling me which mouse pointer div id I'm clicking on
    let r = parseInt(coordinates[0]); //parseInt = string to an integer
    let c = parseInt(coordinates[1]);
    console.log(coordinates);
    //telling me which array I've clicked
    // figure out which row the current column should be on
    r = startPosition[c];
    console.log(startPosition)
    if (r < 0) {
        return;
    }

    boardState[r][c] = currentPlayer;

    let tile = document.getElementById(r.toString() + " " + c.toString());
    console.log(r, c);
    if (currentPlayer === playerRed) {
        tile.classList.add("red-counter");
        currentPlayer = playerYellow;
        console.log(tile);
    }
    else {
        tile.classList.add("yellow-counter");
        currentPlayer = playerRed;
    }
    r -= 1; //update the row height for that column
    startPosition[c] = r; //update the array

    const statusWinner = checkWinner(boardState);
    if (statusWinner) setWinner(statusWinner)
}

function checkWinner(board) {         //checkWinner uses for loops and if statements to show possible winning combinations.
    console.log(board,'checkWinner board')
    for (let r = 0; r < rows; r++) {     // Across
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {           // != ' ' way of doing 'no empty space'
                if (board[r][c] === board[r][c + 1] && board[r][c + 1] === board[r][c + 2] && board[r][c + 2] === board[r][c + 3]) {
                
                    console.log(board[r][c],'across')
                    return board[r][c];
                }
            }
        }
    }
    for (let c = 0; c < columns; c++) {   // Down
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r + 1][c] && board[r + 1][c] === board[r + 2][c] && board[r + 2][c] === board[r + 3][c]) {
                    console.log(board[r][c],'down')
                    return board[r][c];
                }
            }
        }
    }
    for (let r = 0; r < rows - 3; r++) {    // Down diagonal
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r + 1][c + 1] && board[r + 1][c + 1] === board[r + 2][c + 2] && board[r + 2][c + 2] === board[r + 3][c + 3]) {
                    return board[r][c];
                }
            }
        }
    }
    for (let r = 3; r < rows; r++) {         // Upward diagonal
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r - 1][c + 1] && board[r - 1][c + 1] === board[r - 2][c + 2] && board[r - 2][c + 2] === board[r - 3][c + 3]) {
                    return board[r][c];
                }
            }
        }
    }
   
    if (board.filter(parent => parent.filter(child => child === ' ').length > 0).length === 0) {    //parent and child .filter method

        return "nobody";
    }
    
    
    return false;
        }

function setWinner(statusWinner) {      //setWinner is called with regard to the checkWinner parameters being met. When checkWinner finds a winner, an if statement is used to understand if the winner is 'red' or 'yellow'
    let winnerName = document.getElementById("winner-name");  //lifted from connectors code for noughts and crosses
    winnerName.innerText = `The winner is ${statusWinner}`
    gameEnd = true;
    console.log(gameEnd, "Game Over");

}

//The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick() {
    // resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    // clearBoard();
}
document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", setGame);
    resetButton.addEventListener("click", resetClick);
})

module.exports = {
    setWinner,
    setGame,
    checkWinner,
    setCounter,
    removeElementsByClass,

}
