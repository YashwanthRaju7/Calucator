const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const toggleSignElement = document.getElementById("toggleSign");

let currentExpression = "";

function appendToDisplay(value) {
    if (value == '√') {
        currentExpression += value + '(';
    } else {
        currentExpression += value;
    }
    inputElement.textContent = currentExpression;
}

function calculate() {
    // Replace '√' with 'Math.sqrt' before evaluation
    currentExpression = currentExpression.replace('√', 'Math.sqrt');

    try {
        const result = eval(currentExpression);
        outputElement.textContent = result;
    } catch (error) {
        outputElement.textContent = "Error";
    }
}

function clearLastEntered() {
    currentExpression = currentExpression.replace('Math.sqrt', '√');
    let len = currentExpression.length;
    if (currentExpression.slice(len - 2, len) == '√(') {
        currentExpression = currentExpression.slice(0, len - 2);
    } else if (currentExpression == '') {
        currentExpression = '0';
    } else {
        currentExpression = currentExpression.slice(0, -1);
    }
    inputElement.textContent = currentExpression;
}

function clearResult() {
    currentExpression = "";
    inputElement.textContent = "0";
    outputElement.textContent = "0";
}

function toggleSign() {
    const expression = currentExpression.split('').reverse();

    const func = ['+', '-', '(', ')', '%', '^', '*'];

    let value = "";
    let num = "";
    let change = 0;
    let nestedDepth = 0;

    outerLoop:
    for (let i of expression) {
        for (let j of func) {
            if (i === j) {
                if (i == '+') {
                    value += '-';
                } else if (i == '-') {
                    value += '+';
                } else if (i == '(') {
                    nestedDepth++;
                } else if (i == ')') {
                    nestedDepth--;
                } else {
                    value += i + '-';
                    change += 1;
                }
                break outerLoop;
            }
        }
        num = i + num;
    }

    if (nestedDepth > 0) {
        value = value.slice(0, -1) + '(' + value.slice(-1) + ')';
    }

    value = value + num;

    let len = currentExpression.length;
    valueLen = value.length - change;

    let left = currentExpression.slice(0, len - valueLen);
    currentExpression = left + value;

    inputElement.textContent = currentExpression;
}

const enterButton = document.querySelector(".last-button");
enterButton.addEventListener("click", calculate);