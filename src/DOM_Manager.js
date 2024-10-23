const domManager = (() => {

    const modal = document.querySelector(".modal");
    const boardPlaceShips = document.querySelector(".placeShipsBoard");
    const shipToPlace = document.querySelector(".shipToPlace");
    const turnShipBtn = document.querySelector("#turnShipBtn");
    const boardRealPlayer = document.querySelector(".realPlayerBoard");
    const boardComputer = document.querySelector(".computerBoard");
    const winnerText = document.querySelector(".winner");
    const shipsSunkReal = document.querySelector(".shipsSunkRealPlayer");
    const shipsSunkComp = document.querySelector(".shipsSunkComputer");

    const renderPlaceShipBoard = (player, ship) => {
        boardPlaceShips.textContent = '';

        shipToPlace.textContent = `Place your ${ship.name} on the board`;

        turnShipBtn.addEventListener("click", () => ship.turn());

        let board = player.playerBoard.board;
        let rowIndex = 0;
        board.forEach(row => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add('square');

                //need row and column index to choose squares in DOM
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;

                if(board[rowIndex][columnIndex]===1) {
                    squareButton.style.backgroundColor = 'darkgrey';
                }

                //Hovereffect on mouseover to show user selected and direction of ship
                squareButton.addEventListener('mouseover', showShip);

                squareButton.addEventListener('mouseout', removeShip);

                boardPlaceShips.appendChild(squareButton);
            });
            rowIndex++;
        });

        function showShip(e){
            //Get row and column, length and direction of ship to color squares on the board
            const selectedRow = e.target.dataset.row;
            const selectedColumn = e.target.dataset.column;

            const squares = boardPlaceShips.querySelectorAll('.square');
            let direction = ship.getShipDirection();
            
            squares.forEach((square) => {
                if(direction === 'horizontal'){
                    if((square.dataset.row === selectedRow) && (square.dataset.column >= selectedColumn) && (square.dataset.column < (Number(selectedColumn)+ship.length))){
                        square.classList.add('placeShip');
                    }
                }
                else if(direction === 'vertical'){
                    if((square.dataset.column === selectedColumn) && (square.dataset.row >= selectedRow) && (square.dataset.row < (Number(selectedRow)+ship.length))){
                        square.classList.add('placeShip');
                    }
                }
            })
        }

        function removeShip(){
            const squares = boardPlaceShips.querySelectorAll('.square');
            squares.forEach((square) => {
                square.classList.remove('placeShip');
            })
        }
    }

    const renderBoard = (player) => {

        if(player.type === 'real') {
            boardRealPlayer.textContent = '';
        } else {
            boardComputer.textContent = '';
        }

        let board = player.playerBoard.board;
    
        let rowIndex = 0;
        board.forEach(row => {
            row.forEach((square, columnIndex) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add('square');
                const circle = document.createElement('div');
                circle.classList.add('dot');
                squareButton.appendChild(circle);
                //need row and column index to choose squares in DOM
                squareButton.dataset.row = rowIndex;
                squareButton.dataset.column = columnIndex;

                //Append to the right player board
                if(player.type === 'real'){
                    squareButton.classList.add('square_inactive');
                    squareButton.classList.add('realSquare');
                    boardRealPlayer.appendChild(squareButton);
                } else {
                    squareButton.classList.add('compSquare');
                    //Hovereffect on mouseover to show user selected and direction
                    squareButton.addEventListener('mouseover', function () {
                        squareButton.style.backgroundColor = 'darkgrey';
                    });

                    squareButton.addEventListener('mouseout', function () {
                        squareButton.style.backgroundColor = 'buttonface';
                    });
                    boardComputer.appendChild(squareButton);
                }
            });
            rowIndex++;
        });
    }

    const updateBoard = (player) => {
        let board = player.playerBoard.board;
        let squares;
        if(player.type === 'real') {
            squares = document.querySelectorAll('.realSquare');
        } else {
            squares = document.querySelectorAll('.compSquare');
        }
        squares.forEach((square) => {
            let circle = square.querySelector('div');
            let row = square.dataset.row;
            let column = square.dataset.column;
            
            if(board[row][column] === 1 && player.type === 'real'){
                square.classList.add('contain_ship')
            }
            //Show squares that have received attack, and if hit or missed
            if(board[row][column] === 2){
                circle.style.backgroundColor = 'red';
                square.classList.add('square_inactive');
            }
            else if(player.playerBoard.missed.has(`[${row},${column}]`)){
                circle.style.backgroundColor = 'black';
                square.classList.add('square_inactive');
            } 
        })
    }


    const declareWinner = (player) => {
        winnerText.textContent = `${player} won the game this time! Play again?`;
    } 

    const removeWinner = () => {
        winnerText.textContent = '';
    }

    const shipsSunkOnCompBoard = (num) => {
        shipsSunkComp.textContent = `Number of ships sunk: ${num}`;
    }
    
    const shipsSunkOnRealBoard = (num) =>{
        shipsSunkReal.textContent = `Number of ships sunk: ${num}`;
    }

    const openModal = () => {
        document.body.style.overflow = "hidden";
        modal.setAttribute("open", "true");
        let overlay = document.createElement("div");
        overlay.id = "modal-overlay";
        document.body.appendChild(overlay);
      };
    
    const closeModal = () => {
        document.body.style.overflow = "auto";
        modal.removeAttribute("open");
        document.body.removeChild(document.querySelector('#modal-overlay'));
      };

    return {openModal, closeModal, renderBoard, updateBoard, renderPlaceShipBoard, declareWinner, removeWinner, shipsSunkOnCompBoard, shipsSunkOnRealBoard}

})();

export default domManager;
