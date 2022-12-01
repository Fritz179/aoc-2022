const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')
input.push('')

let maxs = [0, 0, 0]

let curr = 0
for (element of input) {
  if (!element) {
    if (curr > maxs[0]) {
      maxs.shift()
      maxs.push(curr)
      maxs = maxs.sort((a, b) => a - b)
    }
    curr = 0
    continue
  }

  curr += Number(element)
}

console.log(`Answer 1: ${maxs[2]}`);
console.log(`Answer 2: ${maxs[0] + maxs[1] + maxs[2]}`);