import fs from 'fs'

const [start, moves] = fs.readFileSync('./input.txt', 'utf-8').split('\n\n').map(e => e.split('\n'))

const reverse = start.reverse()
reverse.shift()

const stacks = []
const size = 9

for (let i = 0; i < size; i++) {
    stacks[i] = []
}

for (const line of reverse) {
    for (let i = 0; i < size; i++) {
        const char = line[i * 4 + 1]
        if (char != ' ') {
            stacks[i].push(char)
        }
    }
}

const stack1 = JSON.parse(JSON.stringify(stacks))
for (const move of moves) {
    const line = move.split(' ')
    line.shift()
    const count = Number(line.shift())
    line.shift()
    const from = Number(line.shift()) - 1
    line.shift()
    const to = Number(line.shift()) - 1

    for (let i = 0; i < count; i++) {
        stack1[to].push(stack1[from].pop())
    }
}

const answer1 = stack1.map(stack => stack[stack.length - 1]).join('')
console.log(answer1);

const stack2 = JSON.parse(JSON.stringify(stacks))
for (const move of moves) {
    const line = move.split(' ')
    line.shift()
    const count = Number(line.shift())
    line.shift()
    const from = Number(line.shift()) - 1
    line.shift()
    const to = Number(line.shift()) - 1

    stack2[to].push(...stack2[from].splice(stack2[from].length - count, count))
}

const answer2 = stack2.map(stack => stack[stack.length - 1]).join('')
console.log(answer2);