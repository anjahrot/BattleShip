import Ship from "./ship";
import Gameboard from "./gameboard";

let testGameboard;
let testShip;

beforeEach(() => {
    testGameboard = new Gameboard();
    testShip = new Ship(3);
})


test('Place ship on board horizontally', () => {
    testGameboard.placeShip(testShip, [2,3]);
    expect(testGameboard.board[2][3]).toBe(1);
    expect(testGameboard.board[2][4]).toBe(1);
    expect(testGameboard.board[2][5]).toBe(1);
    expect(testGameboard.board[2][6]).toBe(0);
})

test('Place ship on board vertically', () => {
    testShip.turn();
    testGameboard.placeShip(testShip, [2,3]);
    expect(testGameboard.board[2][3]).toBe(1);
    expect(testGameboard.board[3][3]).toBe(1);
    expect(testGameboard.board[4][3]).toBe(1);
})

test('Error when placed outside board', () => {
    expect(() => {testGameboard.placeShip(testShip, [7,8])}).toThrow('ship is outside board');
    expect(testGameboard.board[7][8]).toBe(0);
})

test('Error when spot is already occupied', () => {
    testGameboard.placeShip(testShip, [2,3]);
    expect(() => {testGameboard.placeShip(testShip, [2,1])}).toThrow('spot taken');
})

test('Gameboard returning which ship has been placed', () => {
    testGameboard.placeShip(testShip, [2,3]);
    expect(testGameboard.shipCoordinates['[2,3]']).toEqual(testShip);
})

test('Recieve attack that hits ship', () => {
    testGameboard.placeShip(testShip, [2,3]);
    testGameboard.receiveAttack([2,3]);
    expect(testShip.hits).toEqual(1);
})

test('Recieve attack that misses', () => {
    testGameboard.placeShip(testShip, [2,3]);
    testGameboard.receiveAttack([8,3]);
    expect(testShip.hits).toEqual(0);
    expect(testGameboard.missed).toContain('[8,3]');
})

test('Report all ships are not sunk', () => {
    testGameboard.placeShip(testShip, [2,3]);
    testGameboard.receiveAttack([2,3]);
    expect(testGameboard.isAllShipsSunk()).toBeFalsy();
})

test('Report all ships aresunk', () => {
    const mockHits = 5;
    testGameboard.shipsSunk = mockHits;
    expect(testGameboard.isAllShipsSunk()).toBeTruthy();
})







