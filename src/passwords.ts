import {question} from "readline-sync"


const allPasswordsAsString = "aboutafteragainbelowcouldeveryfirstfoundgreathouselargelearnneverotherplaceplantpointrightsmallsoundspellstillstudytheirtherethesethingthinkthreewaterwherewhichworldwouldwrite"
    // (copied from manual PDF)

const allPasswords: string[] = []

for (let i = 0; i < allPasswordsAsString.length/5; i++) {
    allPasswords.push(allPasswordsAsString.slice(i * 5, (i + 1) * 5))
}


function filterForPosition(candidates: string[], position: number, possibilities: string): string[] {
    return candidates.filter(candidate => possibilities.indexOf(candidate.charAt(position - 1)) > -1)
}


let position = 1
let candidates = allPasswords
while (candidates.length > 1) {
    candidates = filterForPosition(candidates, position, question(`possibilities for position ${position}: `).toLowerCase())
    position++
}

console.log(candidates.length === 0 ? 'no possibilities found for given input - try again' : `password: ${candidates[0]}`)

