const domManager = (() => {

    const boardDiv = document.querySelector(".board");
    const boardRealPlayer = document.querySelector(".realPlayerBoard");
    const boardComputer = document.querySelector(".computerBoard");

    //update board after turn
    const updateBoard = (board) => {
        //clear content before rendering updated screen
        boardRealPlayer.textContent = '';
        
        //render board
        let rowIndex = 0;
        board.forEach(row => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add('square');
                //need row and column index to choose squares in DOM
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;
                
                if(board[rowIndex][columnIndex] === 0){
                    squareButton.style.backgroundColor = "grey";
                }
                else {
                     squareButton.style.backgroundColor = "black";
                }
                boardRealPlayer.appendChild(squareButton);
            })
            rowIndex++;
        })
    }


    return {updateBoard}

})();

export default domManager;
