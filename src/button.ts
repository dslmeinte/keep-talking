import {question} from "readline-sync";


function pressAndReleaseImmediately(): boolean {
    const buttonColour = question("button colour - [b]lue/[r]ed/[y]ellow/[w]hite: ");
    const text = question("button text - [A]bort/[D]etonate/[H]old: ").toLowerCase();

    let batteries_: number | null = null;
    function batteries() {
        if (batteries_ === null) {
            batteries_ = parseInt(question("number of batteries: "), 10);
        }
        return batteries_;
    }

    function litLabel(label: string): boolean {
        return question(`lit label '${label}'? (y/n) `) === 'y';
    }

    // 1:
    if (buttonColour === 'b' && text === 'a') {
        return false;
    }

    // 2:
    if (text === 'd' && batteries() > 1) {
        return true;
    }

    // 3:
    if (buttonColour === 'w' && litLabel('CAR')) {
        return false;
    }

    // 4:
    if (batteries() > 2 && litLabel('FRK')) {
        return true;
    }

    // 5:
    if (buttonColour === 'y') {
        return false;
    }

    // 6:
    if (buttonColour === 'r' && text === 'h') {
        return true;
    }

    // 7:
    return false;
}

if (pressAndReleaseImmediately()) {
    console.log('Press and release the button immediately!');
} else {
    console.log('Press and hold...');
    const stripeColour = question("stripe colour - [b]lue/[y]ellow/otherwise: ");
    const digit = (() => {
        switch (stripeColour) {
            case 'b': return 4;
            case 'y': return 5;
            default: return 1;
        }
    })();
    console.log(`Release when countdown has the following digit in any location: ${digit}`);
}

