import fs from 'fs'

const string = fs.readFileSync('./input.txt', 'utf-8')
const input = string.split('\n').map(e => e.split(''))

function value(char) {
    const code = char.charCodeAt(0)

    // A-Z
    if (code <= 90) {
        return code - 65 + 27
    } else {
        return code - 96
    }
}

let total = 0
for (const pack of input) {
    const left = pack.splice(0, pack.length / 2)
    const right = new Set(pack)

    const found = left.find(e => right.has(e))
    
    total += value(found)
}

console.log(`Answer 1: ${total}`);

total = 0
const groups = string.split('\n')

while (groups.length) {
    const [a, b, c] = groups.splice(0, 3).map(e => new Set(e))
    
    for (const [entry] of a.entries()) {
        if (b.has(entry) && c.has(entry)) {
            total += value(entry)
            break
        }
    }
}

console.log(`Answer 2: ${total}`);
