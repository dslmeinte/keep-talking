import {question} from "readline-sync"


const cutMap: { [colour: string]: string[] } = {
    "b": [ "B", "AC", "B", "A", "B", "BC", "C", "AC", "A" ],
    "r": [ "C", "B", "A", "AC", "B", "AC", "ABC", "AB", "B" ],
    "z": [ "ABC", "AC", "B", "AC", "B", "BC", "AB", "C", "C" ]
}


const colourCount: { [colour: string]: number } = { "b": 0, "r": 0, "z": 0 }


console.log(`Example panel layout input format: 1zC azA 3bB.`)
console.log(`I.e.: <wire#><colour><connected-to> separated by spaces,`)
console.log(`with b=blue, r=red, z=black for the colour, and A-C for the connected-to.`)


let round = 1

const getInput = () => question(`panel layout round ${round} ([Enter]=done)?: `)

let input = getInput()
while (input !== "") {
    const wires = input.split(" ")
    wires.forEach(wireStr => {
        const wireNo = wireStr.charAt(0)
        const colour = wireStr.charAt(1)
        const connectedTo = wireStr.charAt(2)
        const nOccurrences = ++colourCount[colour]
        const cut = cutMap[colour][nOccurrences - 1].indexOf(connectedTo) > -1
        console.log(`${cut ? "" : "do not "}cut wire ${wireNo}`)
    })

    round++
    input = getInput()
}

