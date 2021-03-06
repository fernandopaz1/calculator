const display = document.querySelector("div#screen");

const buttons = document.querySelectorAll("button.btnNumber");

const btnPoint = document.querySelector("button.btnPoint");

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operationKeys = ["+", "-", "*", "/"];

var input1 = "";
var input2 = "";
var operation = "";
var showResult = false;

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        addNumberToDisplay(e.target.textContent);
    });
});

document.addEventListener("keydown", (e) => {
    if (numberKeys.includes(e.key)) {
        addNumberToDisplay(e.key);
    }
});

function addNumberToDisplay(num) {
    if (showResult == true) {
        display.innerHTML = "";
    }
    if (display.textContent.length >= 7) {
        clear();
        display.innerHTML = "Error";
        showResult = true;
        return;
    }
    display.innerHTML += num;
    input2 = parseFloat(display.textContent);
    showResult = false;
}

btnPoint.addEventListener("click", addPoint);

document.addEventListener("keypress", (e) => {
    if (e.key == ".") {
        addPoint();
    }
});

document.querySelectorAll("button.btnOperation").forEach((button) => {
    button.addEventListener("click", (e) => {
        let content = e.target.textContent;
        operationPress(content);
    });
});

document.querySelector("button#btnEqual").addEventListener("click", equalPress);

document.addEventListener("keypress", (e) => {
    if (e.key === "=" || e.key === "Enter") {
        equalPress();
    }
});

document.querySelector("button#btnClear").addEventListener("click", clear);

document.addEventListener("keypress", (e) => {
    if (e.key == "c" || e.key == "C") {
        clear();
    }
});

document.querySelector("button#btnDel").addEventListener("click", deleteInput);

document.addEventListener("keydown", (e) => {
    if (e.key == "Backspace") {
        deleteInput();
    }
});

document
    .querySelector("button#btnMinPlus")
    .addEventListener("click", changeSign);

document.addEventListener("keypress", (e) => {
    if (e.key === "s" || e.key === "S") {
        changeSign();
    }
});

document.addEventListener("keypress", (e) => {
    if (operationKeys.includes(e.key)) {
        operationPress(e.key);
    }
});

function hasPoint(s) {
    return s.includes(".");
}

function isAValidNumber(s) {
    if (s == "" || s == "Nan" || isNaN(s)) return false;
    return true;
}

function deleteInput() {
    if (showResult) {
        clear();
        return;
    }
    display.textContent = display.textContent.slice(0, -1);
}

function changeSign() {
    if (display.textContent.charAt(0) == "-") {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = "-" + display.textContent;
    }
    input2 = parseFloat(display.textContent);
}

function addPoint() {
    if (showResult) {
        display.innerHTML = "";
        display.innerHTML += ".";
    }
    if (!hasPoint(display.textContent)) {
        display.innerHTML += ".";
    }
}

function clear() {
    input1 = "";
    input2 = "";
    operation = "";
    display.innerHTML = "";
}

function resolve() {
    if (input1 == "" || input2 == "") return "Nan";
    let int1 = parseFloat(input1);
    let int2 = parseFloat(input2);

    switch (operation) {
        case "+":
            return Number((int1 + int2).toFixed(4));
        case "-":
            return Number((int1 - int2).toFixed(4));
        case "*":
            return Number((int1 * int2).toFixed(4));
        case "/":
            return int2 == 0 ? "Nan" : Number(int1 / int2);
        default:
            return "Nan";
    }
}

function equalPress() {
    if (isAValidNumber(input1) && isAValidNumber(input2) && operation != "") {
        display.innerHTML = resolve(input1, input2, operation);
        if (display.textContent.length >= 7) {
            //  clear();
            display.innerText = toScientific(Number(display.textContent));
            showResult = true;
            return;
        }

        input2 = parseFloat(display.textContent);
        input1 = "";
        operation = "";
        showResult = true;
    }
    return;
}

function toScientific(number) {
    let sign = number < 0 ? "-" : "";
    let exponent = 0;
    let module = Math.abs(number);
    if (module == 0) return "";
    if (module < 1) {
        do {
            number *= 10;
            exponent--;
        } while (number < 1);
        number = Math.floor(number * 100) / 100;
        return `${sign}${number}x10^${exponent}`;
    }
    if (module > 1) {
        while (number > 1) {
            number /= 10;
            exponent++;
        }
        number = Math.floor(number * 100) / 100;
        return `${sign}${number * 10}x10^${exponent - 1}`;
    }
}

function operationPress(content) {
    if (
        showResult &&
        display.textContent != "Error" &&
        display.textContent != "Nan"
    ) {
        input1 = display.textContent;
        display.innerHTML = "";
        input2 = "";
        operation = content;
    }

    if (isAValidNumber(input2) && input1 == "" && operation == "") {
        input1 = input2;
        input2 = "";
        display.innerHTML = "";
        operation = content;
    }

    if (isAValidNumber(input1) && isAValidNumber(input2) && operation != "") {
        input2 = resolve(input1, input2, operation);
        display.innerHTML = input2;
        input1 = input2;
        input2 = "";
        operation = content;
        showResult = true;
    }
}
