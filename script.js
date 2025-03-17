const gameboard = (function() {
    const rows = 3;
    const cols = 3;
    const board = [];


    // create the 2d array to represent the tic-tac-toe gameboard
    for (let i = 0; i < rows; ++i) {
        board[i] = [];
        for (let j = 0; j < cols; ++j) {
            board[i].push(Cell());
        }
    }

    // display the gameboard in the console
    const displayBoard = () => {
        let displayStr = '';
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                board[i][j].mark == null ? displayStr += ' ' : displayStr += board[i][j].mark;
                if (j!=2) 
                    displayStr += ' | ';
            }
            displayStr += '\n---------\n';
        } 
        console.log(displayStr);
    }

    return {
        displayBoard
    }
})();

function Cell(mark = null) {
    // getter
    const getMark = () => mark;

    // setter
    const setMark = (newMark) => mark = newMark;

    return {
        getMark,
        setMark
    }
}

function Player(name, mark) {

}

function GameController() {
    
}

// MAIN