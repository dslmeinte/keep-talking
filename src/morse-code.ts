import {question} from "readline-sync";


const word2frequency: { [word: string]: string } = {
    "shell": "3.505",
    "halls": "3.515",
    "slick": "3.522",
    "trick": "3.532",
    "boxes": "3.535",
    "leaks": "3.542",
    "strobe": "3.545",
    "bistro": "3.552",
    "flick": "3.555",
    "bombs": "3.565",
    "break": "3.572",
    "brick": "3.575",
    "steak": "3.582",
    "sting": "3.592",
    "vector": "3.595",
    "beats": "3.600"
};


const morse2char: { [code: string]: string } = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z"
};

function decodeMorse(ticker: string): string[] {
    return ticker.split(" ").map(encoding => morse2char[encoding]).map(char => char === undefined ? "?" : char);
}


const char2morse: { [char: string]: string } = {};
Object.keys(morse2char).forEach(morse => {
    const char = morse2char[morse];
    char2morse[char] = morse;
});


while (true) {
    const input = question("Morse code (.-[ ]): ");
    const chars = decodeMorse(input);
    console.log(`   decodes to: ${chars.join("")}`);
    const validChars = chars.filter(char => char !== "?");
    const candidates = Object.keys(word2frequency).filter(word => validChars.every(char => word.indexOf(char) > -1));
    if (candidates.length === 0) {
        console.log(`   no candidates!`);
    } else if (candidates.length === 1) {
        console.log(`   solution: ${candidates[0]} ==> ${word2frequency[candidates[0]]}`);
    } else {
        console.log(`   possibilities: `);
        candidates.forEach(candidate => {
            const missingChars = candidate.split("").filter(char => chars.indexOf(char) === -1);
            const missingEncodings = missingChars.map(char => char2morse[char]);
            console.log(`       ${candidate} ==> ${word2frequency[candidate]}; missing: ${missingChars.join("")} <== ${missingEncodings.join(" ")}`);
        });
    }
    console.log();
}

