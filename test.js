const grid = document.querySelector('.app-grid');
const turnInfo = document.querySelector('.player-turn');
const winnerInfo = document.querySelector('.winner');
const alertInfo = document.querySelector('.alert')
const table = document.querySelector('table');
const start = document.querySelector('button')
const squares = grid.children;

const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    const resetBoard = () => {
        for(let i=0; i<rows; i++){
            board[i] = [];
            for(let j=0; j<columns; j++){
                board[i][j] = 0;
            }
        }
    }

    const getBoard = () => board;

    const printBoard = () => console.log(board)

    const markBoard = (row, column, player) => {
        console.log(row + ' ' + column)
        if(checkPosition(row, column)){
            board[row][column] = player.symbol;
            alertInfo.innerText = ``;
            return true;
        }
        else{
            alertInfo.innerText = `Position already filled`;
            return false;
        }
    }

    const checkPosition = (row, column) => {
        if(board[row][column] !== 0){
            return false;
        }
        else{
            return true;
        }
    }

    const checkAvailability = () => {
        for(let i=0; i<rows; i++){
            for(let j=0; j<columns; j++){
                if(board[i][j] === 0){
                    return true;
                }
            }
        }
        return false;
    }

    return {
        getBoard,
        printBoard,
        markBoard,
        checkAvailability,
        resetBoard
    }

})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        name,
        symbol,
        getName,
        getSymbol
    }
};


const gameController = (player1, player2) =>{
    let currentPlayer = player1;

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === player1? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    const playRound = () => {
        printNewRound()
        let row = -1;
        let column = -1;
        let markedAI = false;
        
        if(currentPlayer === player1){
            grid.addEventListener('click', clickListener, true);
        }
        else{
            while(!markedAI){
                row = Math.floor(Math.random() * 3)
                column = Math.floor(Math.random() * 3)
                let marked = gameBoard.markBoard(row, column, currentPlayer);
                
                if (marked) {
                    markedAI = true
                    printMove(table.rows[row].cells[column]);
                    nextRound(row, column, currentPlayer);
                }
            }
        }
        
    }

    const clickListener = (e) => {
        let cell = e.target;
        row = cell.parentNode;
    
        row = Number(row.rowIndex);
        column = Number(cell.cellIndex);
    
        let marked = gameBoard.markBoard(row, column, currentPlayer);
        
        if (marked) {
            printMove(e.target);
            grid.removeEventListener('click', clickListener, true);
            nextRound(row, column, currentPlayer);
        }
      };

    const nextRound = (row, column, currentPlayer) => {
        console.log(`${currentPlayer.name} marked [${row},${column}]`);
        gameBoard.printBoard();
        
        if(checkWinner()){
            winnerInfo.innerText = `${currentPlayer.name} won!`;
            console.log(`${currentPlayer.name} won!`);
        }
        else if(!gameBoard.checkAvailability()){
            winnerInfo.innerText = `Draw!`;
        }
        else{
            switchCurrentPlayer();
            playRound();
        }

    }

    const checkWinner = () => {
        if(checkRows()){
            return true;
        }
        if(checkColumns()){
            return true;
        }
        if(checkDiagonals()){
            return true;
        }
        return false;
    }

    const checkRows = () => {
        let board = gameBoard.getBoard()
        let win = false;

        for(let i=0; i<3; i++){
            for(let j=0; j<2; j++){
                if(board[i][j] && board[i][j] === board[i][j+1]){
                    win = true;
                }
                else{
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            }
        }
        return win;
    }

    const checkColumns = () => {
        let board = gameBoard.getBoard()
        let win = false;

        for(let i=0 ; i<3; i++){
            for(let j=0; j<2; j++){
                if(board[j][i] && board[j][i] === board[j+1][i]){
                    win = true;
                }
                else{
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            }
        }
        return win;
    }

    const checkDiagonals = () => {
        let board = gameBoard.getBoard()

        if(board[0][0] && board [1][1] && board [2][2]){
            if(board[0][0] === board [1][1] && board [1][1] === board [2][2]){
                return true;
            }
        }
        if(board[0][2] && board [1][1] && board [2][0]){
            if(board[0][2] === board [1][1] && board [1][1] === board [2][0]){
                return true;
            }

        }
        return false;
    }

    const printNewRound = () => {
        turnInfo.innerText = `${currentPlayer.name}'s turn`
        console.log(`${currentPlayer.name}'s turn`);
        gameBoard.printBoard();
    }

    const printMove = (square) => {
        square.innerText = currentPlayer.getSymbol();
    }

    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayer = player1;
        grid.removeEventListener('click', clickListener, true);

        turnInfo.innerText = '';
        winnerInfo.innerText = '';
        alertInfo.innerText = '';
        
        let boardRows = Array.from(table.rows);
        let boardCells = [];
        boardRows.forEach(row => {
            let cellsArray = Array.from(row.cells)
            cellsArray.forEach(cell => {
                boardCells.push(cell);
            });
        });

        boardCells.forEach(cell => {
            cell.innerText = '';
        });
    }

    return {
        playRound,
        resetGame
    }

};

let player1 = Player('Player One', 'X');
let player2 = Player('Player Two', 'O');
let game = gameController(player1, player2);

start.onclick = function() {
    game.resetGame();
    game.playRound();
    start.innerText = 'RESET';
}







