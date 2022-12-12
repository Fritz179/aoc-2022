import fs from 'fs'
import { clearLine } from 'readline';

type Cell = {
    height: number,
    visible: boolean
}

const grid: Cell[][] = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(line => line.split('').map((height): Cell => ({
    height: Number(height),
    visible: false
})))


for (let i = 0; i < grid.length; i++) {
    const col = grid[i]!

    let left = -1
    let right = -1
    for (let j = 0; j < col.length; j++) {
        if (col[j]!.height > left) {
            col[j]!.visible = true
            left = col[j]!.height
        }
        if (col[col.length - 1 - j]!.height > right) {
            col[col.length - 1 - j]!.visible = true
            right = col[col.length - 1 - j]!.height
        }
    }
}

for (let i = 0; i < grid[0]!.length; i++) {
    let up = -1
    let down = -1

    for (let j = 0; j < grid[0]!.length; j++) {
        if (grid[j]![i]!.height > up) {
            grid[j]![i]!.visible = true
            up = grid[j]![i]!.height
        }
        if (grid[grid.length - 1 - j]![i]!.height > down) {
            grid[grid.length - 1 - j]![i]!.visible = true
            down = grid[grid.length - 1 - j]![i]!.height
        }
    }
}

let answer = 0

for (const col of grid) {
    for (const cell of col) {
        if (cell.visible) answer++
    }
}

console.log(`Answer 1: ${answer}`);

let record = 0
for (let ys = 0; ys < grid.length; ys++) {
    const row = grid[ys]!
    for (let xs = 0; xs < row.length; xs++) {
        const cell = row[xs]!;
        const height = cell.height

        if (cell.visible) {
            let left = 0
            while (grid[ys]![xs - left - 1]) {
                left++
                if (grid[ys]![xs - left]!.height >= height) break
            }

            let right = 0
            while (grid[ys]![xs + right + 1]) {
                right++
                if (grid[ys]![xs + right]!.height >= height) break
            }

            let up = 0
            while (grid[ys - up - 1]) {
                up++
                if (grid[ys - up]![xs]!.height >= height) break
            }

            let down = 0
            while (grid[ys + down + 1]) {
                down++
                if (grid[ys + down]![xs]!.height >= height) break
            }

            const points = left * right * down * up
            if (points > record) record = points
        }
        
    }
}

console.log(`Answer 2: ${record}`);
