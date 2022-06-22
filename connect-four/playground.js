// let rows = 0
// let columns = 0
// let boarda = [
// ["yellow", "red", "red", "yellow", "yellow", "red", "yellow"],
// ["red", "yellow", "yellow", "red", "red", "yellow", "red"], 
// ["yellow", "red", "red", "yellow", "yellow", "red", "yellow"], 
// ["red", "yellow", "yellow", "red", "red", "yellow", "red"], 
// ["yellow", "red", "red", "yellow", "yellow", "red", "yellow"],
// ["red", "yellow", "yellow", "red", "red", "yellow", "red"]
// ]
// function checkWinner(board) {
// for (let r = 0; r < rows; r++) {     // Across
//     for (let c = 0; c < columns - 3; c++) {
//         if (board[r][c] !== ' ') {           // != ' ' way of doing 'no empty space'
//             if (board[r][c] === board[r][c + 1] && board[r][c + 1] === board[r][c + 2] && board[r][c + 2] === board[r][c + 3]) {
            
//                 console.log(board[r][c],'across')
//                 return board[r][c];
//             }
//         }
//     }
//     return null
// }
// }
// console.log(checkWinner(boarda))
