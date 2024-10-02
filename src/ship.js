export default class Ship {
    constructor (length, hits = 0, sunk = false){
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        return this.hits++;
    }

    isSunk() {
        if(this.length === this.hits) {
            this.sunk = true;
        }
        return this.sunk;
    }
}