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

    transition(): IButtonPress {
        switch (this.indicator) {
            case Indicator.label: {
                console.log(`\t==> press the button labeled: ${this.rank}`);
                const position = parseInt(question(`\tposition=`), 10);
                return { label: this.rank, position };
            }
            case Indicator.position: {
                console.log(`\t==> press the button in position: ${this.rank}`);
                const label = parseInt(question(`\tlabel=`), 10);
                return { label, position: this.rank };
            }
        }
    }

}


interface IStage {
    display: number;
    buttonPress: IButtonPress;
}


const stages: IStage[] = [];


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
                case 2: return new ButtonToPress(Indicator.position, stages[1 - 1].buttonPress.position);
                case 3: return new ButtonToPress(Indicator.position, 1);
                case 4: return new ButtonToPress(Indicator.position, stages[1 - 1].buttonPress.position);
                default: throw new Error();
            }
        }
        case 3: {
            switch (display) {
                case 1: return new ButtonToPress(Indicator.label, stages[2 - 1].buttonPress.label);
                case 2: return new ButtonToPress(Indicator.label, stages[1 - 1].buttonPress.label);
                case 3: return new ButtonToPress(Indicator.position, 3);
                case 4: return new ButtonToPress(Indicator.label, 4);
                default: throw new Error();
            }
        }
        case 4: {
            const position = (() => {
                switch (display) {
                    case 1: return stages[1 - 1].buttonPress.position;
                    case 2: return 1;
                    case 3: return stages[2 - 1].buttonPress.position;
                    case 4: return stages[2 - 1].buttonPress.position;
                    default: throw new Error();
                }
            })();
            return new ButtonToPress(Indicator.position, position);
        }
        case 5: {
            const label = (() => {
                switch (display) {
                    case 1: return stages[1 - 1].buttonPress.label;
                    case 2: return stages[2 - 1].buttonPress.label;
                    case 3: return stages[4 - 1].buttonPress.label;
                    case 4: return stages[3 - 1].buttonPress.label;
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
    stages.push({ display, buttonPress: buttonToPress(currentStage, display).transition() });
    console.log();
}

