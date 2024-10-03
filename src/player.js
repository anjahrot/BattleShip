import Gameboard from "./gameboard.js";

export default class Player {
    constructor(type){
        this.type = type;
        this.playerBoard = new Gameboard();
    }
}