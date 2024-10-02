export default class Gameboard {
    constructor (ships=0){
        this.ships = ships;
        this.board = create2DOfZeroes();        
    }

    placeShip(ship, coordinate) {
        const length = ship.length;
        const direction = ship.direction;
        let [x, y] = coordinate;
        if(this.ships === 5){
            throw new Error('all ships on board');
        }
        else if(direction === 'horizontal' && (y+length)>9 || direction === 'vertical' && (x+length)>9){
            throw new Error('ship is outside board');
            }
        else if(this.containShip(x, y, length, direction)) {
            throw new Error('spot taken');
        } else {
        for(let i=0; i<length;i++){
            this.board[x][y] = 1;
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
                column++;  //Increase y-coordinate by 1 to check next 
            } else {
                row++; 
            }
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