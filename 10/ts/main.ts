import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')

let inst = 0
let regX = 1
let answer = 0

const crt: string[][] = []

function addIfNeeded() {
    if ((inst - 20) % 40 == 0) {
        answer += regX * inst
    }

    let x = (inst - 1) % 40
    let y = (inst - 1 - x) / 40 

    if (!crt[y]) crt[y] = []
    
    if (Math.abs(x - regX) <= 1) {
        crt[y]![x] = '#'
    } else {
        crt[y]![x] = '.'
    }
}

for (const line of input) {
    if (line == 'noop') {
        inst++
        addIfNeeded()
        continue
    }

    const value = Number(line.split(' ')[1])
    inst++
    addIfNeeded()
    inst++
    addIfNeeded()
    regX += value
}

console.log(`Answer 1: ${answer}`);

console.log(crt.map(e => e.join('')).join('\n'));


