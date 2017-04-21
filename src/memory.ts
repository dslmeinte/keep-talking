import {question} from "readline-sync";


enum Indicator {
    label, position
}

interface IButtonPress {
    position: number;
    label: number;
}

class ButtonToPress {

    constructor(private indicator: Indicator, private rank: number) {}

    transition(askQuestion = true): IButtonPress | undefined {
        switch (this.indicator) {
            case Indicator.label: {
                console.log(`\t==> press the button with LABEL: ${this.rank}`);
                return askQuestion ? { label: this.rank, position: parseInt(question(`\tPOSITION=`), 10) } : undefined;
            }
            case Indicator.position: {
                console.log(`\t==> press the button in POSITION: ${this.rank}`);
                return askQuestion ? { label: parseInt(question(`\tLABEL=`), 10), position: this.rank } : undefined;
            }
        }
    }

}


interface IStage {
    display: number;
    buttonPress: IButtonPress;
}


const _previousStages: IStage[] = [];

function previousStage(n: number): IStage {
    return _previousStages[n - 1];
}

function buttonToPress(currentStage: number, display: number): ButtonToPress {
    switch (currentStage) {
        case 1: {
            const position = (() => {
                switch (display) {
                    case 1: return 2;
                    case 2: return 2;
                    case 3: return 3;
                    case 4: return 4;
                    default: throw new Error();
                }
            })();
            return new ButtonToPress(Indicator.position, position);
        }
        case 2: {
            switch (display) {
                case 1: return new ButtonToPress(Indicator.label, 4);
                case 2: return new ButtonToPress(Indicator.position, previousStage(1).buttonPress.position);
                case 3: return new ButtonToPress(Indicator.position, 1);
                case 4: return new ButtonToPress(Indicator.position, previousStage(1).buttonPress.position);
                default: throw new Error();
            }
        }
        case 3: {
            switch (display) {
                case 1: return new ButtonToPress(Indicator.label, previousStage(2).buttonPress.label);
                case 2: return new ButtonToPress(Indicator.label, previousStage(1).buttonPress.label);
                case 3: return new ButtonToPress(Indicator.position, 3);
                case 4: return new ButtonToPress(Indicator.label, 4);
                default: throw new Error();
            }
        }
        case 4: {
            const position = (() => {
                switch (display) {
                    case 1: return previousStage(1).buttonPress.position;
                    case 2: return 1;
                    case 3: return previousStage(2).buttonPress.position;
                    case 4: return previousStage(2).buttonPress.position;
                    default: throw new Error();
                }
            })();
            return new ButtonToPress(Indicator.position, position);
        }
        case 5: {
            const label = (() => {
                switch (display) {
                    case 1: return previousStage(1).buttonPress.label;
                    case 2: return previousStage(2).buttonPress.label;
                    case 3: return previousStage(4).buttonPress.label;
                    case 4: return previousStage(3).buttonPress.label;
                    default: throw new Error();
                }
            })();
            return new ButtonToPress(Indicator.label, label);
        }
        default: throw new Error();
    }
}


for (const currentStage of [1, 2, 3, 4, 5]) {
    console.log(`stage=${currentStage}:`);
    const display = parseInt(question("\tdisplay="), 10);
    const buttonPress = buttonToPress(currentStage, display).transition(currentStage < 5);
    if (currentStage < 5) {
        _previousStages.push({ display, buttonPress: buttonPress! });
    }
    console.log();
}

