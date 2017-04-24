import {question} from "readline-sync";


console.log(`Specify from left to right: `);
console.log();
console.log();


let _lastDigitSerialEven: boolean | undefined = undefined;
function lastDigitSerialEven() {
    if (_lastDigitSerialEven === undefined) {
        _lastDigitSerialEven = question("Is the last digit of the serial number even (y/n)? ") === "y";
    }
    return _lastDigitSerialEven;
}

let _hasParallelPort: boolean | undefined = undefined;
function hasParallelPort() {
    if (_hasParallelPort === undefined) {
        _hasParallelPort = question("Does the bomb have a parallel port (y/n)? ") === "y";
    }
    return _hasParallelPort;
}


let _hasMoreThan1Battery: boolean | undefined = undefined;
function hasMoreThan1Battery() {
    if (_hasMoreThan1Battery === undefined) {
        _hasMoreThan1Battery = question("Does the bomb have 2 or more batteries (y/n)? ") === "y";
    }
    return _hasMoreThan1Battery;
}




function cutWire(led: boolean, hasBlue: boolean, hasRed: boolean, star: boolean) {
    // C:
    if (!led && !hasBlue && !hasRed && !star) {
        return true;
    }
    if (!led && !hasBlue && !hasRed && star) {
        return true;
    }
    if (!led && !hasBlue && hasRed && star) {
        return true;
    }
    // D:
    if (led && !hasBlue && !hasRed && !star) {
        return false;
    }
    if (led && hasBlue && hasRed && star) {
        return false;
    }
    if (!led && hasBlue && !hasRed && star) {
        return false;
    }
    // S:
    if (!led && hasBlue && hasRed && !star && lastDigitSerialEven()) {
        return true;
    }
    if (!led && !hasBlue && hasRed && !star && lastDigitSerialEven()) {
        return true;
    }
    if (!led && hasBlue && !hasRed && !star && lastDigitSerialEven()) {
        return true;
    }
    if (led && hasBlue && hasRed && !star && lastDigitSerialEven()) {
        return true;
    }
    // P:
    if (!led && hasBlue && hasRed && star && hasParallelPort()) {
        return true;
    }
    if (led && hasBlue && !hasRed && star && hasParallelPort()) {
        return true;
    }
    if (led && hasBlue && !hasRed && !star && hasParallelPort()) {
        return true;
    }
    // B:
    if (led && !hasBlue && hasRed && !star && hasMoreThan1Battery()) {
        return true;
    }
    if (led && !hasBlue && hasRed && star && hasMoreThan1Battery()) {
        return true;
    }
    if (led && !hasBlue && !hasRed && star && hasMoreThan1Battery()) {
        return true;
    }
    throw new Error();
}

let wireNo = 1;
let ledInput: string;
console.log(`wire = ${wireNo}:`);
while ((ledInput = question("\tLED on (y/n, [Enter]=done)? ")) !== "") {
    const led = ledInput === "y";
    const hasBlue = question("\thas wire blue colouring (y/n)? ") === "y";
    const hasRed = question("\thas wire red colouring (y/n)? ") === "y";
    const star = question("\tstar or not (y/n)? ") === "y";
    console.log(`   ==> ${cutWire(led, hasBlue, hasRed, star) ? "" : "do not "}cut wire`);
    console.log();
}

