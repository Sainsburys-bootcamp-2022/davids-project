// ['0', '0'] ['0', '1'] ['0', '2'] ['0', '3'] ['0', '4'] ['0', '5'] ['0', '6']
// ['1', '0'] ['1', '1'] ['1', '2'] ['1', '3'] ['1', '4'] ['1', '5'] ['1', '6']
// ['2', '0'] ['2', '1'] ['2', '2'] ['2', '3'] ['2', '4'] ['2', '5'] ['2', '6']
// ['3', '0'] ['3', '1'] ['3', '2'] ['3', '3'] ['3', '4'] ['3', '5'] ['3', '6']
// ['4', '0'] ['4', '1'] ['4', '2'] ['4', '3'] ['4', '4'] ['4', '5'] ['4', '6']
// ['5', '0'] ['5', '1'] ['5', '2'] ['5', '3'] ['5', '4'] ['5', '5'] ['5', '6']



let playerRed = "Red";
let playerYellow = "Yellow";
let currentPlayer = playerRed; //always start with red
let gameEnd = false;
let boardState;
let rows = 6;
let columns = 7;
let startPosition = []; //empty array rather than producing a full array

window.onload = function() {    //works with 'this' to load html page. thanks stackoverflow
    setGame();
}

function setGame() {            //setGame creates the conditions for the game to begin. It uses variables to create a framework which builds an array for the game to progress.
    console.log(setGame, "Game is set")
    boardState = []; //rather than writing out full individual array, boardState contains the initial array
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
    console.log (coordinates); 
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

    checkWinner();
}

function checkWinner() {         //checkWinner uses for loops and if statements to show possible winning combinations.

     for (let r = 0; r < rows; r++) {     // Across
     for (let c = 0; c < columns - 3; c++) {
        if (boardState[r][c] != ' ') {           // != ' ' way of doing 'no empty space'
        if (boardState[r][c] === boardState[r][c+1] && boardState[r][c+1] === boardState[r][c+2] && boardState[r][c+2] === boardState[r][c+3]) {
        setWinner(r, c);
        return;
                }
            }
         }
    }
    for (let c = 0; c < columns; c++) {   // Down
    for (let r = 0; r < rows - 3; r++) {
        if (boardState[r][c] != ' ') {      
        if (boardState[r][c] === boardState[r+1][c] && boardState[r+1][c] === boardState[r+2][c] && boardState[r+2][c] === boardState[r+3][c]) {
        setWinner(r, c);
        return;
                }
            }
        }
    }
    for (let r = 0; r < rows - 3; r++) {    // Down diagonal
    for (let c = 0; c < columns - 3; c++) {
        if (boardState[r][c] != ' ') {
        if (boardState[r][c] === boardState[r+1][c+1] && boardState[r+1][c+1] === boardState[r+2][c+2] && boardState[r+2][c+2] === boardState[r+3][c+3]) {
        setWinner(r, c);
        return;
                }
            }
        }
    }
    for (let r = 3; r < rows; r++) {         // Upward diagonal
    for (let c = 0; c < columns - 3; c++) {
        if (boardState[r][c] != ' ') {
        if (boardState[r][c] === boardState[r-1][c+1] && boardState[r-1][c+1] === boardState[r-2][c+2] && boardState[r-2][c+2] === boardState[r-3][c+3]) {
        setWinner(r, c);
        return;
                }
            }
        }
    }
}

function setWinner(r, c) {      //setWinner is called with regard to the checkWinner parameters being met. When checkWinner finds a winner, an if statement is used to understand if the winner is 'red' or 'yellow'
    let winnerName = document.getElementById("winner-name");  //lifted from connectors code for noughts and crosses
    if (boardState[r][c] === playerRed) {
        winnerName.innerText = "The winner is red!";
        console.log(winnerName.innerText);             
    } else {
        winnerName.innerText = "The winner is yellow!";
        console.log(winnerName.innerText);
    }

    gameEnd = true;
    console.log(gameEnd, "Game Over");
    
}

//The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard();
}
document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", setGame);
})

module.exports = {
    setWinner,
    setGame,
    checkWinner,
    setCounter,
    removeElementsByClass,
    
}
