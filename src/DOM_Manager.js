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
                const circle = document.createElement("div");
                squareButton.classList.add('square');
                circle.classList.add('dot');
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
                    circle.style.backgroundColor = 'red';
                    squareButton.appendChild(circle);
                }
                else if(player.playerBoard.missed.has(JSON.stringify([rowIndex, columnIndex]))){
                    circle.style.backgroundColor = 'black';
                    squareButton.appendChild(circle);
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
