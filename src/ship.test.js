import Ship from "./ship";

let testShip;

beforeEach(() => {
    testShip = new Ship(3);
})


test('Ship was hit', () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(2);
})

test('Ship is sunk', () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.isSunk();
    expect(testShip.sunk).toBe(true);
})