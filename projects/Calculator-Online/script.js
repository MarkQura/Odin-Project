class number {
    constructor(screen) {
        this.number = "";
        this.decimal = false;
        this.operator = "";
        this.screen = screen;
    }

    addNumber(n) {
        if (n == 10 && this.decimal) return;
        
        if (this.operator != "") {
            if (this.operator == "=") {
                number2.clear();
            }
            this.operator = "";
            this.number = "";
        }

        if (n == 10) {
            this.number += ".";
            this.decimal = true;
        } 
        else if (n == 11) { this.number += "0"; } 
        else { this.number += `${n}`; }

        this.screen.innerText = this.number;
    }

    removeNumber() {
        if (this.number.length == 0) return;
        let lastChar = this.number[this.number.length - 1];
        
        if (lastChar == ".") this.decimal = false;

        this.number = this.number.slice(0, -1);
        this.screen.innerText = this.number;
    }

    clear() {
        this.number = "";
        this.decimal = false;
        this.screen.innerText = this.number;
    }
}

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const functionals = Array.from(document.querySelectorAll(".functional"));
const downScreen = document.querySelector(".screen .down");
const upScreen = document.querySelector(".screen .up");

let number1 = new number(downScreen);
let number2 = new number(upScreen);

function addOperator(operator) {
    if ((number2.number != number1.number) && (number2.number != "" && number1.operator != "=")) {
        debugger;
        solve();
    }
    
    number2.operator = number1.operator = operator;
    number2.number = number1.number;
    upScreen.innerText = number2.number + ` ${operator} `;
}

function solve() {

    upScreen.innerText = `${number2.number} ${number2.operator} ${number1.number} = `;

    switch(number2.operator) {
        case "÷": number1.number = (parseInt(number2.number) / parseInt(number1.number)).toString(); break;
        case "×": number1.number = (parseInt(number2.number) * parseInt(number1.number)).toString(); break;
        case "-": number1.number = (parseInt(number2.number) - parseInt(number1.number)).toString(); break;
        case "+": number1.number = (parseInt(number2.number) + parseInt(number1.number)).toString(); break;
    }

    number1.operator = "=";
    downScreen.innerText = number1.number;
}

numbers.map(item => {
    item.addEventListener("click", () => number1.addNumber(numbers.indexOf(item) + 1));
});

functionals[2].addEventListener("click", solve);

functionals[1].addEventListener("click", () => {
    number1.removeNumber();
});

functionals[0].addEventListener("click", () => {
    if(number1.number.length == 0) {
        number2.clear();
        return;
    }

    number1.clear();
});

operators.map(item => {
    let opsArr = ["÷", "×", "-", "+"];
    item.addEventListener("click", () => addOperator(opsArr[operators.indexOf(item)]));
});