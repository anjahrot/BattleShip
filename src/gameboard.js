export default class Gameboard {
    constructor (ships=0){
        this.ships = ships;  //number of ships on the board
        this.shipsSunk = 0;
        this.board = create2DOfZeroes(); 
        this.shipCoordinates = {};  //object to store coordinates and ship
        this.missed = new Set();       
    }

    placeShip(ship, coordinate) {
        const length = ship.length;
        const direction = ship.direction;
        let [x, y] = coordinate;
        if(this.ships === 5){
            throw new Error('all ships on board');
        }
        else if(direction === 'horizontal' && (y+length)>10 || direction === 'vertical' && (x+length)>10){
            throw new Error('ship is outside board');
            }
        else if(this.containShip(x, y, length, direction)) {
            throw new Error('spot taken');
        } else {
        for(let i=0; i<length;i++){
            this.board[x][y] = 1;
            this.shipCoordinates[JSON.stringify([x,y])]=ship;
            if(ship.direction === 'horizontal'){
                y++;  //Increase y-coordinate by 1 to place next part of ship
            } else {
                x++; 
            }
        }
        this.ships++;
        }
    }

    //Helper method for placeShip to check if spot available
    containShip(row, column, shiplength, direction){
        let boolean = false;
        for(let i=0; i<shiplength;i++){
            if(this.board[row][column] != 0){
                boolean = true;
                return boolean;
            }
            if(direction === 'horizontal'){
                column++;  //Increase y-coordinate by 1 to check next coordinate
            } else {
                row++; 
            }
        }
        return boolean;
    }

    receiveAttack(coordinate) {
        let [x,y] = coordinate;
        if(this.board[x][y] === 1){
            const shipHit = this.shipCoordinates[JSON.stringify(coordinate)];
            shipHit.hit();
            if(shipHit.sunk){
                this.shipsSunk++;
            }
        }
        else {
            this.missed.add(JSON.stringify(coordinate));
            this.board[x][y] === 2;
        }
    }

    isAllShipsSunk() {
        let boolean = false;
        if(this.shipsSunk === 5){
            boolean = true;
        }
        return boolean;
    }
        
}




//Helper function creating a 2D array 10x10 containing 0's
function create2DOfZeroes () {
    const board = Array.from(Array(10), () => Array(10));
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            board[i][j]=0;
        }
    }
    return board;
}