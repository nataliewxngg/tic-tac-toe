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

    // getter
    const getBoard = () => board.slice();

    // display the gameboard in the console
    const displayBoard = () => {
        let displayStr = '';
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                board[i][j].getMark() == null ? displayStr += ' ' : displayStr += board[i][j].getMark();
                if (j!=2) 
                    displayStr += ' | ';
            }
            if (i!=2)
                displayStr += '\n---------\n';
        } 
        console.log(displayStr);
    }

    // set the mark of a cell
    const setMark = (row, col, mark) => {
        board[row-1][col-1].setMark(mark);
        console.log('done!');
    }

    return {
        getBoard,
        displayBoard,
        setMark
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
    const getName = () => name;
    const getMark = () => mark;

    const promptTurn = () => {
        let row = prompt('Enter the row number: ');
        let col = prompt('Enter the column number: ');

        return {row, col};
    }

    return {
        getName,
        getMark,
        promptTurn
    }
}

function GameController() {
    const player1 = Player('Natalie', 'X');
    const player2 = Player('Lorraine', 'O');
    let currentPlayer = player1;

    // play a single round
    const playRound = () => {
        gameboard.displayBoard();
        console.log(`It's ${currentPlayer.getName()}'s turn!`)

        // get the current player's move
        const {row, col} = currentPlayer.promptTurn();
        // console.log(row);
        // console.log(col);
        gameboard.setMark(row, col, currentPlayer.getMark());

        // change the current player
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
        gameboard.displayBoard();
        console.log(gameboard.getBoard());
    }

    return {
        playRound
    }
}

// MAIN
const game = GameController();
game.playRound();