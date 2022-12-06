import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')

function repeats(str) {
    const set = new Set(str.split(''))
    return set.size == str.length
}

for (let i = 0; i < input.length - 4; i++) {
    const str = input.slice(i, i + 4)
    if (repeats(str)) {
        console.log(`Answer 1: ${i + 4}`);
        break
    }
}

const size = 14
for (let i = 0; i < input.length - size; i++) {
    const str = input.slice(i, i + size)
    if (repeats(str)) {
        console.log(`Answer 2: ${i + size}`);
        break
    }
}