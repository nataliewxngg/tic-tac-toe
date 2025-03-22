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
    const printBoard = () => {
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
        board[row][col].setMark(mark); 
    }

    // determine if a player has won/loss
    const checkGameStatus = () => {
        // check rows
        for (let i = 0; i < 3; ++i) {
            if (
                board[i][0].getMark() == board[i][1].getMark() && 
                board[i][1].getMark() == board[i][2].getMark() && 
                board[i][0].getMark() != null
            )
                return board[i][0].getMark();
        }

        // check columns
        for (let i = 0; i < 3; ++i) {
            if (
                board[0][i].getMark() == board[1][i].getMark() && 
                board[1][i].getMark() == board[2][i].getMark() && 
                board[0][i].getMark() != null
            )
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

    // clear the gameboard
    const clearBoard = () => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) 
                board[i][j].setMark(null);
        }
    }

    return {
        getBoard,
        printBoard,
        setMark,
        checkGameStatus,
        clearBoard
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

    return {
        getName,
        getMark
    }
}

const game = (function() {
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    console.log(`It's ${currentPlayer.getName()}'s turn!`);

    // play a single round
    const playRound = (row, col) => {

        // set the mark according to current parameters and player mark
        gameboard.setMark(row, col, currentPlayer.getMark());

        gameboard.printBoard();

        // check if the game is over
        if (gameboard.checkGameStatus() != null) {   
            console.log(`${currentPlayer.getName()} wins!`);
            // restartGame();
            return;
        }

        // update the current player
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
    }

    // refresh variables for a new game
    const restartGame = () => {
        gameboard.clearBoard();
        currentPlayer = player1;    
    }

    const setPlayerName = (playerNum, newName) => {
        playerNum == 1 ? player1 = Player(newName, 'X') : player2 = Player(newName, 'O');
        currentPlayer = player1;
    }
    
    const getCurrentPlayer = () => currentPlayer;

    return {
        playRound,
        getCurrentPlayer,
        setPlayerName,
        restartGame
    }
})();

const displayController = (function() {
    const boardDiv = document.getElementById('board');
    const playerDiv = document.querySelector('p');
    const form = document.querySelector('form');
    const restartButton = document.getElementById('restart');

    // updates the message depending on game status
    const updateText = () => {
        if (gameboard.checkGameStatus() != null) {
            playerDiv.textContent = `${game.getCurrentPlayer().getName()} wins!`;
            console.log('wow!');
        }
        else
            playerDiv.textContent = `It's ${game.getCurrentPlayer().getName()}'s turn!`;
    }

    // add an event listener to respond to game restart
    restartButton.addEventListener('click', () => {
        game.restartGame();
        updateBoard();
        updateText();
    })

    // add an event listener to respond to the click of each individual cell
    const addEventListeners = (cells) => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                console.log(cell.textContent);
                if (cell.textContent == '') {
                    cell.textContent = game.getCurrentPlayer().getMark();
                    game.playRound(cell.getAttribute('row'), cell.getAttribute('col'));
                    updateBoard();
                    updateText();
                } 
            });
        });   
    }

    // add an event listener to respond to game start
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // set the names of the players
        game.setPlayerName(1, data.get('player-1'));
        game.setPlayerName(2, data.get('player-2'));

        updateBoard();
    });
    
    // display the most updated version of the gameboard in the DOM
    const updateBoard = () => {
        boardDiv.textContent = '';

        for (let i = 0; i < 9; ++i) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('row', Math.floor(i/3));
            cell.setAttribute('col', i%3);

            // set the mark of each cell
            cell.textContent = gameboard.getBoard()[Math.floor(i/3)][i%3].getMark();
            boardDiv.appendChild(cell);
        }

        addEventListeners(document.querySelectorAll('.cell'));
        updateText();
    }
})();