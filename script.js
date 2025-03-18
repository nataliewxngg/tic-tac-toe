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

    // set the mark of a cell on the board
    const setMark = (row, col, mark) => {
        board[row-1][col-1].setMark(mark);
        console.log('done!');
    }

    // determine if a player has won/loss
    const checkGameStatus = () => {
        // check rows
        for (let i = 0; i < 3; ++i) {
            if (board[i][0].getMark() == board[i][1].getMark() && board[i][1].getMark() == board[i][2].getMark() && board[i][0].getMark() != null)
                return board[i][0].getMark();
        }

        // check columns
        for (let i = 0; i < 3; ++i) {
            if (board[0][i].getMark() == board[1][i].getMark() && board[1][i].getMark() == board[2][i].getMark() && board[0][i].getMark() != null)
                return board[0][i].getMark();
        }

        // check diagonals
        if (
            (board[0][0].getMark() == board[1][1].getMark() && board[1][1].getMark() == board[2][2].getMark() || 
            board[0][2].getMark() == board[1][1].getMark() && board[1][1].getMark() == board[2][0].getMark()) && 
            board[1][1].getMark() != null
        )
            return board[0][0].getMark();

        return null;
    }

    return {
        getBoard,
        displayBoard,
        setMark,
        checkGameStatus
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
        gameboard.setMark(row, col, currentPlayer.getMark());

        // change the current player
        if (gameboard.checkGameStatus() != null) {   
            console.log(`${currentPlayer.getName()} wins!`);
            gameboard.clearBoard();
            return ;
        }
        gameboard.displayBoard();

        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
    }

    return {
        playRound
    }
}

// MAIN
const game = GameController();