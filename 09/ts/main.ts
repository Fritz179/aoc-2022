import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(e => e.split(' '))

const dirMap = {
    R: [1, 0],
    D: [0, -1],
    L: [-1, 0],
    U: [0, 1]
} as const;


{
    let x = 0, px = 0
    let y = 0, py = 0
    const space: string[][] = []

    for (const [dir, count] of input) {
        

        if (!dir || !count) throw 'Error'

        const [xDir, yDir] = dirMap[dir as 'R']

        
        for (let i = 0; i < Number(count); i++) {
            x += xDir
            y += yDir

            if (Math.abs(px - x) >= 2 || Math.abs(py - y) >= 2) {
                if (px < x) px++
                if (px > x) px--
                if (py < y) py++
                if (py > y) py--
            }

            if (!space[py]) space[py] = []
            space[py]![px] = '#'
        }
    }

    let answer = 0

    Object.keys(space).forEach(lineI => {
        const line = space[Number(lineI)]!
        Object.keys(line).forEach(i => {
            const val = line[Number(i)]!
            answer++
        })
    })

    console.log(`Answer 1: ${answer}`);
}

type pos = [number, number]

const space: string[][] = []
let positions: pos[] = []

for (let i = 0; i < 10; i++) positions[i] = [0, 0]

for (const [dir, count] of input) {
        

    if (!dir || !count) throw 'Error'

    const [xDir, yDir] = dirMap[dir as 'R']

    
    for (let i = 0; i < Number(count); i++) {
        positions[0]![0] += xDir
        positions[0]![1] += yDir

        for (let i = 1; i < positions.length; i++) {
            const pos = positions[i - 1]!
            const pre = positions[i]!
        
            if (Math.abs(pre[0] - pos[0]) >= 2 || Math.abs(pre[1] - pos[1]) >= 2) {
                if (pre[0] < pos[0]) pre[0]++
                if (pre[0] > pos[0]) pre[0]--
                if (pre[1] < pos[1]) pre[1]++
                if (pre[1] > pos[1]) pre[1]--
            }
        }

        const [px, py] = positions[positions.length - 1]!

        if (!space[py]) space[py] = []
        space[py]![px] = '#'
    }
}

let answer = 0

Object.keys(space).forEach(lineI => {
    const line = space[Number(lineI)]!
    Object.keys(line).forEach(i => {
        const val = line[Number(i)]!
        answer++
    })
})

console.log(`Answer 2: ${answer}`);