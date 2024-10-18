const domManager = (() => {

    const boardPlaceShips = document.querySelector(".placeShipsBoard");
    const shipToPlace = document.querySelector(".shipToPlace");
    const boardRealPlayer = document.querySelector(".realPlayerBoard");
    const boardComputer = document.querySelector(".computerBoard");
    const winnerText = document.querySelector(".winner");
    const shipsSunkReal = document.querySelector(".shipsSunkRealPlayer");
    const shipsSunkComp = document.querySelector(".shipsSunkComputer");

    const renderPlaceShipBoard = (player) => {
        boardPlaceShips.textContent = '';
        let board = player.playerBoard.board;
        let rowIndex = 0;
        board.forEach(row => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add('square');

                //need row and column index to choose squares in DOM
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;

                squareButton.style.backgroundColor = "lightgrey";

                boardPlaceShips.appendChild(squareButton);
            });
            rowIndex++;
        });
    }

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
                    squareButton.classList.add('square_inactive');
                }
                else if(player.playerBoard.missed.has(JSON.stringify([rowIndex, columnIndex]))){
                    circle.style.backgroundColor = 'black';
                    squareButton.appendChild(circle);
                    squareButton.classList.add('square_inactive');
                }

                //Append to the right player board
                if(player.type === 'real'){
                    squareButton.classList.add('square_inactive');
                    boardRealPlayer.appendChild(squareButton);
                } else {
                    boardComputer.appendChild(squareButton);
                }
            //Hovereffect on mouseover on computerboard
            if(player.type === 'computer'){
                squareButton.addEventListener('mouseover', function () {
                    squareButton.style.backgroundColor = 'darkgrey';
                });

                squareButton.addEventListener('mouseout', function () {
                    squareButton.style.backgroundColor = 'lightgrey';
                });
            }
            })
            rowIndex++;
        })
    }

    const declareWinner = (player) => {
        winnerText.textContent = `${player} won the game this time! Play again?`;
    } 

    const shipsSunkOnCompBoard = (num) => {
        shipsSunkComp.textContent = `Number of ships sunk: ${num}`;
    }
    
    const shipsSunkOnRealBoard = (num) =>{
        shipsSunkReal.textContent = `Number of ships sunk: ${num}`;
    }

    return {renderPlaceShipBoard, updateBoard, declareWinner, shipsSunkOnCompBoard, shipsSunkOnRealBoard}

})();

export default domManager;
