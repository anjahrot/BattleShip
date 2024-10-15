import Ship from "./ship.js";
import Player from "./player.js";
import domManager from "./DOM_Manager.js";


export function GameController() {

    //Initiating players
    const player = new Player('real');
    const computer = new Player('computer');

    //Ships real player
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrol_boat = new Ship(2);

    //Ships computer
    const carrier_comp = new Ship(5);
    const battleship_comp = new Ship(4);
    const destroyer_comp = new Ship(3);
    const submarine_comp = new Ship(3);
    const patrol_boat_comp = new Ship(2);

    //Place ships, predetermined coordinates
    player.playerBoard.placeShip(carrier, [1,0]);
    player.playerBoard.placeShip(battleship, [9,0]);
    player.playerBoard.placeShip(destroyer, [3,0]);
    player.playerBoard.placeShip(submarine, [7,7]);
    player.playerBoard.placeShip(patrol_boat, [6,2]);
    computer.playerBoard.placeShip(carrier_comp, [1,0]);
    computer.playerBoard.placeShip(battleship_comp, [9,0]);
    computer.playerBoard.placeShip(destroyer_comp, [3,0]);
    computer.playerBoard.placeShip(submarine_comp, [0,2]);
    computer.playerBoard.placeShip(patrol_boat_comp, [6,2]);

    //Render boards, showing ships on real players board
    domManager.updateBoard(player);
    domManager.updateBoard(computer);

    //Add eventlisteners for the computer board
    const computerBoard = document.querySelector(".computerBoard");
    computerBoard.addEventListener("click", clickHandlerBoard);

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        //console.log(`Selected: row ${selectedRow} and column ${selectedColumn}`);

        //If hit gap between squares
        if(!selectedColumn) return;

        
    }
    //player.playerBoard.receiveAttack([0,1]);

} 

