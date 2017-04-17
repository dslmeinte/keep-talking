import {question} from "readline-sync";


const wires = question("wire colours (z=black): ").toLowerCase();
const nWires = wires.length;

const colourCounts: { [colour: string]: number } = {}; // note: undefined == 0 (!)

for (let i = 0; i < nWires; i++) {
    const colour = wires.charAt(i);
    const times = colourCounts[colour] || 0;
    colourCounts[colour] = times + 1;
}


function isLastDigitSerialNumberOdd(): boolean {
    return question("last digit serial number odd? (y/n)") === 'y';
}


function postfix(n: number) {
    switch (n) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th"
    }
}

const ordinal = (n: number) => `${n}${postfix(n)}`;


function wireToCut(): string {
    switch (nWires) {
        case 3: {
            if (!colourCounts['r']) { return ordinal(2); }
            if (wires.charAt(nWires - 1) === 'w') { return `last = ${ordinal(nWires)}`; }
            if (colourCounts['b'] > 1) { return `last blue = ${ordinal(wires.lastIndexOf('b') + 1)}`; }
            return `last = ${ordinal(nWires)}`;
        }
        case 4: {
            if (colourCounts['r'] > 1 && isLastDigitSerialNumberOdd()) { return `last red = ${ordinal(wires.lastIndexOf('r') + 1)}`; }
            if (wires.charAt(nWires - 1) === 'y' && !colourCounts['r']) { return ordinal(1); }
            if (colourCounts['b'] === 1) { return ordinal(1); }
            if (colourCounts['y'] > 1) { return `last = ${ordinal(nWires)}`; }
            return ordinal(2);
        }
        case 5: {
            if (wires.charAt(nWires - 1) === 'z' && isLastDigitSerialNumberOdd()) { return ordinal(4); }
            if (colourCounts['r'] === 1 && colourCounts['y'] > 1) { return ordinal(1); }
            if (!colourCounts['z']) { return ordinal(2); }
            return ordinal(1);
        }
        case 6: {
            if (!colourCounts['y'] && isLastDigitSerialNumberOdd()) { return ordinal(3); }
            if (colourCounts['y'] === 1 && colourCounts['w'] > 1) { return ordinal(4); }
            if (!colourCounts['r']) { return `last = ${ordinal(nWires)}`; }
            return ordinal(4);
        }
        default: throw new Error();
    }
}

console.log(`wire to cut: ${wireToCut()}`);

