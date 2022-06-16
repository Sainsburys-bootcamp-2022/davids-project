// Make your changes to store and update game state in this file

// Take the row and column number between 0 and 2
// (inclusive) and update the game state.
// O and X will take turns - How do I make this happen?
// row and column grid appears to look like - (row:0, column:0;) (row:0, column:1;) (row:0, column:2)
//                                            (row:1, column:0;) (row:1, column:1;) (row:1, column:2)
//                                            (row:2, column:0;) (row:2, column:1;) (row:2, column:2)
// using chrome:inspect:console the grid currently appears set up this way ^^^^^

let boardState = 
[[null, null, null],
[null, null, null],
[null, null, null]];

//comma between arrays
// Introduced a new variable 'boardState' Remember camelCase!!
// could introduce another variable for after takeTurn
let noughtCross = true; //another variable for noughts and crosses

function takeTurn(row, column) {
    console.log("takeTurn was called with row: " + row + ", column:" + column);
    console.log(`takeTurn was called with row: ${row}, column: ${column}`);

    if (boardState[row][column] === null && checkWinner() === null) {
        boardState[row][column] = noughtCross ? "cross" : "nought";
        noughtCross = !noughtCross;
    }
}

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {
    console.log("checkWinner was called");
    //if statement for the 3 requirements. js-connectors seems to show this 
    // if (typeof winner !== "string" || !["noughts", "crosses", "nobody"].includes(winner)) {
    // !== is not equal
    if (boardState[0][0] === boardState[0][1] && boardState[0][0] === boardState[0][2] && boardState[0][0] != null) {
        return boardState[0][0] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[1][0] === boardState[1][1] && boardState[1][0] === boardState[1][2] && boardState[1][0] != null) {
        return boardState[1][0] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[2][0] === boardState[2][1] && boardState[2][0] === boardState[2][2] && boardState[2][0] != null) {
        return boardState[2][0] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[0][0] === boardState[1][0] && boardState[0][0] === boardState[2][0] && boardState[0][0] != null) {
        return boardState[0][0] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[0][1] === boardState[1][1] && boardState[0][1] === boardState[2][1] && boardState[0][1] != null) {
        return boardState[0][1] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[0][2] === boardState[1][2] && boardState[0][2] === boardState[2][2] && boardState[0][2] != null) {
        return boardState[0][2] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[0][0] === boardState[1][1] && boardState[0][0] === boardState[2][2] && boardState[0][0] != null) {
        return boardState[0][0] === "cross" ? "crosses" : "noughts";
    }
    if (boardState[0][2] === boardState[1][1] && boardState[0][2] === boardState[2][0] && boardState[0][2] != null) {
        return boardState[0][2] === "cross" ? "crosses" : "noughts";
    }

    if (boardState.filter(parent => parent.filter(child => child === null).length > 0).length === 0) {    //parent and child .filter method

        return "nobody";
    }
    return null;
}

// Set the game state back to its original state to play another game. // use variable 'boardState' 
function resetGame() {
    console.log("resetGame was called");
    boardState = [[null, null, null], [null, null, null], [null, null, null]];
    // There are 9 nulls so there must be a max of 9 'goes' // 9 goes would be a tie
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return boardState; 
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,

    }
} else {
    console.log("Running in Browser")
}
