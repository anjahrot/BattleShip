const domManager = (() => {

    const boardRealPlayer = document.querySelector(".realPlayerBoard");
    const boardComputer = document.querySelector(".computerBoard");

    //update board after turn
    const updateBoard = (player) => {
        //clear content before rendering updated screen
        if(player.type === 'real') {
            boardRealPlayer.textContent = '';
        } else {
            boardComputer.textContent = '';
        }
        
        let board = player.playerBoard.board;

        //render board
        let rowIndex = 0;
        board.forEach(row => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add('square');
                //need row and column index to choose squares in DOM
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;
                
                if(board[rowIndex][columnIndex] === 0 || player.type === 'computer'){
                    squareButton.style.backgroundColor = "lightgrey";
                }
                else {
                     squareButton.style.backgroundColor = "darkgrey";
                }

                //Show squares that have received attack, and if hit or missed
                if(board[rowIndex][columnIndex] === 2){
                    console.log('add red circle to square');
                    //Add red circle to square
                }
                else if(player.playerBoard.missed.has(JSON.stringify([rowIndex, columnIndex]))){
                    console.log('add black circle to square');
                    //Add black circle
                }

                //Append to the right player board
                if(player.type === 'real'){
                    boardRealPlayer.appendChild(squareButton);
                } else {
                    boardComputer.appendChild(squareButton);
                }
            })
            rowIndex++;
        })
    }


    return {updateBoard}

})();

export default domManager;
