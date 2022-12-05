import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map(e => e.split(',').map(e => e.split('-').map(n => Number(n))))



let total = 0
for (const pair of input) {
    const [a, b] = pair

    if ((a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1])) {
        total++
    }
    
}

console.log(`Answer 1: ${total}`);

total = 0
for (const pair of input) {
    const [a, b] = pair

    if ((a[0] <= b[0] && a[1] >= b[0]) || (a[0] <= b[1] && a[1] >= b[1]) || (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1])) {
        total++
    }
    
}

console.log(`Answer 2: ${total}`);