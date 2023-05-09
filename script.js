const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let boardUniArray = [];

    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<columns; j++){
            board[i][j] = 0;
        }
    }

    const getBoard = () => board;

    const printBoard = () => console.log(board)

    const markBoard = (row, column, player) => {
        if(checkPosition(row, column)){
            board[row][column] = player.symbol;
            return true;
        }
        else{
            alert('Position already filled');
            return false;
        }
    }

    const checkPosition = (row, column) => {
        if(board[row][column]){
            return false;
        }
        else{
            return true;
        }
    }

    const checkAvailability = () => {
        for(let i=0; i<rows; i++){
            for(let j=0; j<columns; j++){
                if(!board[i][j]){
                    return true;
                    break;
                }
            }
        }
        return false;
    }



    return {
        getBoard,
        printBoard,
        markBoard,
        checkAvailability
        
    }


})();

const Player = (name, symbol) => {
    return {name, symbol}
};

const Fill = (player) => {
    let value = 0;

    const setFill = (player) =>{
        value = player.symbol;
    }

    const getValue = () => value;

    return {
        setFill,
        getValue
    }

}
const gameController = (player1, player2) =>{
    let currentPlayer = player1;
    const winningSpots = [[0,1,2], [3,4,5], [7,8,9], [0,3,7], [1,4,8], [2,5,9], [0,4,9], [2,4,7]];

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === player1? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    const playRound = () => {
        printNewRound()
        let row = getUserInput('Row');
        let column = getUserInput('Column');
        
        let marked = gameBoard.markBoard(row, column, currentPlayer);
        if(!marked) playRound();
        
        console.log(`${currentPlayer.name} marked [${row},${column}]`);
        gameBoard.printBoard();
        
        if(checkWinner()){
            console.log(`${currentPlayer.name} won!`);
        }
        else if(!gameBoard.checkAvailability()){
            alert('Draw!');
        }
        else{
            switchCurrentPlayer()
            playRound()
        }
    }

    const checkWinner = () => {
        if(checkRows()){
            return true;
        }
        if(checkColumns()){
            return true;
        }
        return false;
    }

    const checkRows = () => {
        let board = gameBoard.getBoard()
        let win = false;

        for(let i=0 ; i<3; i++){
            if(win){
                return win;
            }

            for(let j=0; j<2; j++){
                if(board[i][j] && board[i][j] === board[i][j+1]){
                    win = true;
                }
                else{
                    win = false;
                    return win;
                }
            }
        }
        return win;
    }

    const checkColumns = () => {
        let board = gameBoard.getBoard()
        let win = false;

        for(let i=0 ; i<3; i++){
            if(win){
                return win;
            }

            for(let j=0; j<2; j++){
                if(board[j][i] && board[j][i] === board[j+1][i]){
                    win = true;
                }
                else{
                    win = false;
                    return win;
                }
            }
        }
        return win;
    }

    const getUserInput = (label) =>{
        let input = prompt(label);
        if(isNaN(input) || input === "" || Number(input) < 0 || Number(input) > 2){
            alert('Invalid');
            return getUserInput(label);
        }
        else{
            return Number(input);
        }
    }

    const printNewRound = () => {
        console.log(`${currentPlayer.name}'s turn`);
        gameBoard.printBoard();
    }

    return {
        playRound
    }

};

let player1 = Player('Player One', 'X');
let player2 = Player('Player Two', 'O');

let game = gameController(player1, player2);

game.playRound()





