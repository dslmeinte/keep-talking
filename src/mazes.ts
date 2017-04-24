import {question} from "readline-sync";


const mazes: number[][][] = [
    [ [1, 2], [6, 3] ], [ [2, 4], [5, 2] ], [ [4, 4], [6, 4] ],
    [ [1, 1], [1, 4] ], [ [4, 6], [5, 3] ], [ [3, 5], [5, 1] ],
    [ [2, 1], [2, 6] ], [ [3, 4], [4, 1] ], [ [1, 5], [3, 2] ]
];


console.log(`Coordinate system:

+---------------------> x
| (1, 1) (2, 1), etc.
| (1, 2)
|        (2, 3)
V
y

First coordinate is left-to-right,
second coordinate is top-to-bottom,
both starting at 1.

Top-left is (1, 1), bottom-right is (6, 6).


`);


function asCoord(str: string): number[] {
    return str.split(" ").map(num => parseInt(num, 10));
}

const green1 = asCoord(question("first green (in the format '<x> <y>') ? "));
const green2 = asCoord(question("second green (in the format '<x> <y>') ? "));

function coordEqual(arr1: number[], arr2: number[]): boolean {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

let found = false;
mazes.forEach((maze, idx) => {
    if (   (coordEqual(maze[0], green1) && coordEqual(maze[1], green2))
        || (coordEqual(maze[1], green1) && coordEqual(maze[0], green2))
    ) {
        const row = Math.round(idx/3);
        const column = idx%3;
        let str = "";
        for (let i = 0; i < 3; i++ ) {
            for (let j = 0; j < 3; j++) {
                str += (i === row && j === column) ? "*" : ".";
            }
            str += "\n";
        }
        console.log(`Maze location in table in manual:\n${str}`);
        found = true;
    }
});
if (!found) {
    console.log('No maze matching given green locations: erroneous input?');
}

