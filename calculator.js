const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const toggleSignElement = document.getElementById("toggleSign");

let currentExpression = "";

function appendToDisplay(value) {
    const lastChar = currentExpression.slice(-1);
    if (!isNaN(lastChar) && value === '%') {
        currentExpression = `${currentExpression} * 0.01`;
    } else {
        currentExpression += value;
    }
    inputElement.textContent = currentExpression;
}

function calculate() {
    try {
        const result = eval(currentExpression);
        outputElement.textContent = result;
    } catch (error) {
        outputElement.textContent = "Error";
    }
}

function clearLastEntered() {
    currentExpression = currentExpression.slice(0, -1);
    inputElement.textContent = currentExpression;
}

function clearResult() {
    currentExpression = "";
    inputElement.textContent = "0";
    outputElement.textContent = "0";
}

function appendSqrt() {
    currentExpression += "Math.sqrt(";
    inputElement.textContent = currentExpression;
}

function toggleSign() {
    toggleSignElement.classList.toggle("toggled");
    const sliced = currentExpression.slice(-4,-1);
    // console.log(sliced)
    if (toggleSignElement.classList.contains("toggled")) {
        currentExpression += "* -1";
    } else if (sliced === "* -") {
        currentExpression = currentExpression.slice(0,-4);
    }
    inputElement.textContent = currentExpression;
}
const enterButton = document.querySelector(".last-button");
enterButton.addEventListener("click", calculate);