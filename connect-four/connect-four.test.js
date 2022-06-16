const functions = require("./connect-four")

test('Testing a function and seeing what happens',() => {
console.log(functions.resetGame)
const expectedResult = undefined

const result = functions.removeElementsByClass("tile")

expect(result).toEqual(expectedResult)
})

test(' ',() => {
    console.log(functions.resetGame)
    const board = 
            [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', 'Red'],
            [' ', ' ', ' ', ' ', ' ', ' ', 'Red'],
            [' ', ' ', ' ', ' ', ' ', ' ', 'Red'],
            [' ', ' ', ' ', ' ', ' ', ' ', 'Red']]
            
    const expectedResult = 'Red'

    const result = functions.checkWinner(board)

    expect(result).toMatch(expectedResult)
})
    
    



