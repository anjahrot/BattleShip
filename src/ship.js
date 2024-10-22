export default class Ship {
    constructor (name, length, hits = 0, sunk = false, direction = 'horizontal'){
        this.name = name;
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
        this.direction = direction;
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

    turn () {
        let direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.direction = direction;
    }

    getShipDirection () {
        return this.direction;
    }
}