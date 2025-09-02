const container = document.querySelector(".container");
const result = document.querySelector("#result");
const backspace = document.querySelector("#backspace");
const keyboard = document.querySelector("#keyboard");
const clear = document.querySelector("#clear");
const parentheses = document.querySelector("#parentheses");
const porcentage = document.querySelector("#porcentage");
const division = document.querySelector("#division");
const multiplication = document.querySelector("#multiplication");
const subtraction = document.querySelector("#subtraction");
const addition = document.querySelector("#addition");
const signal = document.querySelector("#signal");
const comma = document.querySelector("#comma");
const equal = document.querySelector("#equal");

container.addEventListener("click", main);

function main(event) {
  let button = event.target.closest("button");

  if (!button) {
    return;
  }

  if (button.id === "clear") {
    result.value = "";
  } else if (button.id === "backspace") {
    result.value = result.value.slice(0, -1);
  } else if (button.id === "signal") {
    let signal = result.value.split(" ");
    signal = changeSignal(signal);
    result.value = signal.join(" ");
  } else {
    if (button.tagName === "BUTTON") {
      // this condition adds spaces between operators for better performance of functions
      if (
        button.innerText === "+" ||
        button.innerText === "-" ||
        button.innerText === "X" ||
        button.innerText === "/" ||
        button.innerText === "%"
      ) {
        result.value += " " + button.innerText + " ";
      } else {
        result.value += button.innerText;
      }
    }
  }

  if (button.id === "equal") {
    let final = calculate(result.value);
    result.value = final;
  }
}

function calculate(result) {
  let newResult = result.trim();

  newResult = newResult.replace(/,/g, ".");

  let arr = newResult.split(" ").filter((element) => element !== "");

  if (arr.includes("=")) {
    arr.pop();
  }

  arr = percentage(arr);
  arr = firstOp(arr);
  arr = secondOp(arr);
  //console.log(arr);

  let finalResult = arr[0];

  return finalResult.toString().replace(".", ",");
}

function percentage(arr) {
  let index = arr.indexOf("%");

  if (index === -1) {
    return arr;
  }

  let p = parseFloat(arr[index - 1]);
  let finalValue;

  if (index > 1 && (arr[index - 2] === "+" || arr[index - 2] === "-")) {
    let baseValue = parseFloat(arr[index - 3]);
    finalValue = baseValue * (p / 100);
    arr.splice(index - 1, 2, finalValue);
  } else {
    finalValue = p / 100;
    arr.splice(index - 1, 2, finalValue);
  }

  if (arr.includes("%")) {
    return percentage(arr);
  }

  return arr;
}

function changeSignal(arr) {
  let number = parseFloat(arr[arr.length - 1]) * -1;
  arr[arr.length - 1] = number;
  return arr;
}

function firstOp(arr) {
  "";
  let m = 0;
  let d = 0;
  let newValue = 0;

  while (arr.includes("X") || arr.includes("/")) {
    let indexM = arr.indexOf("X");
    let indexD = arr.indexOf("/");
    // these variables receive the values before and after the operator
    let val1M = indexM - 1;
    let val2M = indexM + 1;
    let val1D = indexD - 1;
    let val2D = indexD + 1;

    // this conditional is used to perform operations regardless of the order of operators
    if (indexM !== -1 && (indexD === -1 || indexM < indexD)) {
      newValue = parseFloat(arr[val1M]) * parseFloat(arr[val2M]);
      arr.splice(val1M, 3, newValue);
      m++;
    } else if (indexD !== -1) {
      newValue = parseFloat(arr[val1D]) / parseFloat(arr[val2D]);
      arr.splice(val1D, 3, newValue);
      d++;
    }
  }
  return arr;
}

function secondOp(arr) {
  let sum = 0;
  let sub = 0;
  let newValue = 0;

  while (arr.includes("+") || arr.includes("-")) {
    let indexSUM = arr.indexOf("+");
    let indexSUB = arr.indexOf("-");
    // these variables receive the values before and after the operator
    let val1SUM = indexSUM - 1;
    let val2SUM = indexSUM + 1;
    let val1SUB = indexSUB - 1;
    let val2SUB = indexSUB + 1;

    // this conditional is used to perform operations regardless of the order of operator
    if (indexSUM !== -1 && (indexSUB === -1 || indexSUM < indexSUB)) {
      newValue = parseFloat(arr[val1SUM]) + parseFloat(arr[val2SUM]);
      arr.splice(val1SUM, 3, newValue);
      sum++;
    } else if (indexSUB !== -1) {
      newValue = parseFloat(arr[val1SUB]) - parseFloat(arr[val2SUB]);
      arr.splice(val1SUB, 3, newValue);
      sub++;
    }
  }
  return arr;
}
