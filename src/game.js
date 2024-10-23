import Ship from "./ship.js";
import Player from "./player.js";
import domManager from "./DOM_Manager.js";

const newGame = document.querySelector('#startBtn');

const GameController = () => {

    let gameOver = false;

    //Initiating players
    const player = new Player('real');
    const computer = new Player('computer');

    //Ships real player
    const carrier = new Ship('Carrier', 5);
    const battleship = new Ship('Battleship', 4);
    const destroyer = new Ship('Destroyer', 3);
    const submarine = new Ship('Submarine', 3);
    const patrol_boat = new Ship('Patrol Boat', 2);
    const playerShips = [carrier, battleship, destroyer, submarine, patrol_boat];

    //Ships computer
    const carrier_comp = new Ship('Carrier', 5);
    const battleship_comp = new Ship('Battleship', 4);
    const destroyer_comp = new Ship('Destroyer', 3);
    destroyer_comp.turn();
    const submarine_comp = new Ship('Submarine', 3);
    const patrol_boat_comp = new Ship('Patrol Boat', 2);

    //Place ships, predetermined coordinates
    // player.playerBoard.placeShip(carrier, [1,0]);
    // player.playerBoard.placeShip(battleship, [9,0]);
    // player.playerBoard.placeShip(destroyer, [3,0]);
    // player.playerBoard.placeShip(submarine, [7,7]);
    // player.playerBoard.placeShip(patrol_boat, [6,2]);

    //Place computer ships with random method in gameboard-class
    computer.playerBoard.placeShipRandom(carrier_comp);
    computer.playerBoard.placeShipRandom(battleship_comp);
    computer.playerBoard.placeShipRandom(destroyer_comp);
    computer.playerBoard.placeShipRandom(submarine_comp);
    computer.playerBoard.placeShipRandom(patrol_boat_comp);
    
    //domManager.renderPlaceShipBoard(player, playerShips[0]);
    domManager.renderBoard(player);
    domManager.renderBoard(computer);
    domManager.openModal();
    //Real player placing ships in pop-up modal, initiate placing first ship
    placePlayerShip(0);

    function placePlayerShip(num) {
        let ship = playerShips[num];
        domManager.renderPlaceShipBoard(player, ship);

        const playerBoard = document.querySelector(".placeShipsBoard");
        playerBoard.addEventListener("click", placeShipOnBoard);
    
        function placeShipOnBoard(e) {
            const selectedRow = e.target.dataset.row;
            const selectedColumn = e.target.dataset.column;

            if(!selectedColumn) return;

            try {
                player.playerBoard.placeShip(ship, [selectedRow, selectedColumn]);
                num++;
                playerBoard.removeEventListener("click", placeShipOnBoard);
                //Call method again until all ships are placed
                if(num < 5){
                    placePlayerShip(num);
                }
                else {
                    domManager.closeModal();
                    domManager.updateBoard(player);
                }
            }
            catch(e) {
                console.log('Can not place here: ', e.message);
            }          
        }

    };

    //Render boards, showing ships on real players board
    domManager.shipsSunkOnRealBoard(player.playerBoard.shipsSunk);
    domManager.shipsSunkOnCompBoard(computer.playerBoard.shipsSunk);

    //Add eventlisteners for the computer board
    const computerBoard = document.querySelector(".computerBoard");
    const buttons = computerBoard.querySelectorAll("button");

    buttons.forEach((btn) => btn.addEventListener("click", clickHandlerBoard));

    function clickHandlerBoard(e) {
        const selectedRow = e.currentTarget.dataset.row;
        const selectedColumn = e.currentTarget.dataset.column;

        if(!selectedColumn) return;

        if(computer.playerBoard.isCoordinateAttacked([selectedRow,selectedColumn])){
            console.log('Already guessed, try different one...');
        }
        else {
            computer.playerBoard.receiveAttack([selectedRow,selectedColumn]);
            domManager.updateBoard(computer);
            domManager.shipsSunkOnCompBoard(computer.playerBoard.shipsSunk);
            if(computer.playerBoard.isAllShipsSunk()) {
                gameOver = true;
                domManager.declareWinner('Congratulations! You');
                buttons.forEach((btn) => btn.removeEventListener("click", clickHandlerBoard));
            }
            else {
                computerPlay();
            }
        }  
    }


    function computerPlay() {
        let x_hit = -1;
        let y_hit = -1;
        playerShips.forEach((ship) => {
            if(ship.hits > 0 && !ship.isSunk()){
                const coordinateHit = player.playerBoard.getLastHitCoordinates();
                [x_hit, y_hit] = coordinateHit;
            }
        });
        //Attack nearby coordinate if ship is hit or select random
        let x;
        let y;
        if(x_hit != -1){
            const newCoordinate = findNeighborCoordinate(x_hit, y_hit);
            [x,y] = newCoordinate;
            //use method to go through nearest coordinates not tried (attackNeighbor);
        } else {
            x = Math.floor(Math.random()*10);
            y = Math.floor(Math.random()*10);
        }

        if(player.playerBoard.isCoordinateAttacked([x,y])){
            computerPlay();
        }
        else {
            player.playerBoard.receiveAttack([x,y]);
            domManager.updateBoard(player);
            domManager.shipsSunkOnRealBoard(player.playerBoard.shipsSunk);
            if(player.playerBoard.isAllShipsSunk()) {
                gameOver = true;
                domManager.declareWinner('Computer');
                buttons.forEach((btn) => btn.removeEventListener("click", clickHandlerBoard));
            }
        }
    }

    function findNeighborCoordinate(x,y) {
        if(y<9 && !player.playerBoard.isCoordinateAttacked([x,y+1])){
                y = y + 1;
        } else if (y>0 && !player.playerBoard.isCoordinateAttacked([x,y-1])){
            y = y - 1;
        } else if (x<9 && !player.playerBoard.isCoordinateAttacked([x+1,y])){
            x = x + 1;
        } else if (x>0 && !player.playerBoard.isCoordinateAttacked([x-1,y])){
            x = x - 1;
        //Tried all immediate neighbors - go back to hit before last
        } else {
            player.playerBoard.deleteLastHitCoordinate();
            let newCoordinate = player.playerBoard.getLastHitCoordinates();
            let [x_hit,y_hit] = newCoordinate;
            findNeighborCoordinate(x_hit,y_hit);
        }
        return [x,y];
    }

    newGame.addEventListener('click', startNewGame);
       
    function startNewGame() {
        if(gameOver) {
            domManager.removeWinner();
            GameController();
        }
        else if(confirm('Are you sure you want to quit ongoing game?')) {
            newGame.removeEventListener('click', startNewGame);
            GameController();
        }
    };

   
};

export default GameController;

