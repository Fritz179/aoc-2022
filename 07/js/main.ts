import fs from 'fs'

const commands = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(e => e.split(' '))

type File = {
    type: 'file',
    name: string,
    readonly size: number,
    readonly parent: Dir,
}

type Dir = {
    type: 'dir'
    sub: (File|Dir)[]
    size: number
    name: string
    readonly parent: Dir | null
}

const top: Dir = {
    type: 'dir',
    sub: [],
    size: 0,
    name: '/',
    parent: null
}

let curr = top

while (commands.length) out: {
    const command = commands.shift()!
    
    if (command[0] == '$') {
        if (command[1] == 'cd') {
            if (command[2] == '/') {
                curr = top
                continue
            }

            if (command[2] == '..') {
                if (!curr.parent) throw 'Error'
                curr = curr.parent
                continue
            }

            for (const sub of curr.sub) {
                
                if (sub.name == command[2]) {
                    
                    if (sub.type != 'dir') throw 'Error'
                    curr = sub
                    break out
                }
            }

            throw 'Error'
        }

        if (command[1] == 'ls') {
            
            while (commands[0] && commands[0][0] != '$') {
                const sub = commands.shift()!

                if (sub[0] == 'dir') {

                    curr.sub.push({
                        type: 'dir',
                        sub: [],
                        name: sub[1]!,
                        size: 0,
                        parent: curr
                    })
                } else {
                    const size = Number(sub[0])
                    
                    curr.sub.push({
                        type: 'file',
                        name: sub[1]!,
                        size: size,
                        parent: curr
                    })
                }
            }

            continue
        }

        console.log('Invalid command! ', command);
    } else {
        console.log('Invalid! ', command);
    }
    
}

let total = 0
function size(dir: Dir) {
    for (const sub of dir.sub) {
        if (sub.type == 'dir') {
            size(sub)
        }

        dir.size += sub.size
    }

    if (dir.size <= 100000 && dir.type == 'dir') {
        total += dir.size
    }
}

size(top)
console.log(`Answer 1: ${total}`);

const toDelete = top.size - 40000000

let record = Infinity
let holder: Dir = top


function check(dir: Dir) {
    const over = dir.size - toDelete

    if (over < 0) return 
    if (over < record) {
        record = over
        holder = dir
    }

    for (const sub of dir.sub) {
        if (sub.type == 'dir') {
            check(sub)
        } 
    }
}
check(top)

console.log(`Answer 2: ${holder.size}`);


function print(dir: Dir, space: string) {
    console.log(`${space} -D- ${dir.name}: ${dir.size}`);
    
    for (const sub of dir.sub) {
        if (sub.type == 'dir') {
            print(sub, space + '  ')
        } else {
            console.log(`${space}   -F- ${sub.name}: ${sub.size}`);
            
        }
    }
}