import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(e => e.split(' '))

const values = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

let total = 0
for (const game of input) {
    const [a, b] = [values[game[0]], values[game[1]]]

    total += b

    // draw
    if (a == b) {
        total += 3
        // console.log('draw');
    }

    // Lose
    if ((b % 3) + 1 == a) {
        // console.log('lost');
        total += 0 
    }

    // Win
    if ((a % 3) + 1 == b) {
        // console.log('won');
        total += 6
    }
}

console.log(`Answer 1: ${total}`);

total = 0

for (const game of input) {
    const [a, b] = [values[game[0]], values[game[1]]]

    // lose
    if (b == 1) {
        total += a - 1
        if (a == 1) total += 3
    }

    // draw
    if (b == 2) {
        total += 3
        total += a
    }

    // win
    if (b == 3) {
        total += 6
        total += (a % 3) + 1
    }
}

console.log(`Answer 2: ${total}`);