export default class Gameboard {
    constructor (ships=0){
        this.ships = ships;  //number of ships on the board
        this.shipsSunk = 0;
        this.board = create2DOfZeroes(); 
        this.shipCoordinates = {};  //object to store coordinates and ship
        this.missed = new Set();  
        this.hitCoordinates = new Set();    
    }

    placeShip(ship, coordinate) {
        const length = ship.length;
        const direction = ship.direction;
        let [x, y] = coordinate;
        if(this.ships === 5){
            throw new Error('all ships on board');
        }
        else if(direction === 'horizontal' && (Number(y)+length)>10 || direction === 'vertical' && (Number(x)+length)>10){
            throw new Error('ship is outside board');
            }
        else if(this.containShip(x, y, length, direction)) {
            throw new Error('spot taken');
        } else {
        for(let i=0; i<length;i++){
            this.board[x][y] = 1;
            this.shipCoordinates[`[${x},${y}]`]=ship;
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

    //Method to place ships randomly on the computer's board:
    placeShipRandom (ship) {
        const x = Math.floor(Math.random()*10);
        const y = Math.floor(Math.random()*10);
        try{
            this.placeShip(ship, [x,y]);
        }
        catch(e){
            if(e.message === 'spot taken' || e.message === 'ship is outside board') {
                this.placeShipRandom(ship);
            } else {
                console.log('Error');
            }
        }
    }

    receiveAttack(coordinate) {
        let [x,y] = coordinate;
        if(this.board[x][y] === 1){
            this.board[x][y] = 2;  //Set value to 2 if ship is hit, to use in DOM
            this.hitCoordinates.add([x,y]);
            const shipHit = this.shipCoordinates[`[${x},${y}]`];      
            shipHit.hit();
            if(shipHit.isSunk()){
                this.shipsSunk++;
            }
        }
        else {
            this.missed.add(`[${x},${y}]`);
        }
    }

    //Method to check if spot on board has already received attack
    isCoordinateAttacked(coordinate) {
        let [x,y] = coordinate;
        let boolean = false;
        if(this.missed.has(`[${x},${y}]`) || this.board[x][y] === 2){
            boolean = true;
        }
        return boolean;
    }

    isAllShipsSunk() {
        let boolean = false;
        if(this.shipsSunk === 5){
            boolean = true;
        }
        return boolean;
    }

    getLastHitCoordinates () {
        const list =  this.hitCoordinates;
        console.log(list);
        const elements = list.values().toArray();
        const last = elements[elements.length-1];
        return last;
    }

    deleteLastHitCoordinate () {
        const last = this.getLastHitCoordinates();
        console.log('Delete', last);
        this.hitCoordinates.delete(last);
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