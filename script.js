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

keyboard.addEventListener("click", main);

function main(event) {
  let button = event.target;

  if (button.id === "clear") {
    result.value = "";
  } else if (
    button.innerText === "( )" ||
    button.innerText === "%" ||
    button.innerText === "," ||
    button.innerText === "+/-"
  ) {
    window.alert("Melhorias Futuras :)");
    result.value += "";
  } else {
    if (button.tagName === "BUTTON") {
      // this condition adds spaces between operators for better performance of functions
      if (
        button.innerText === "+" ||
        button.innerText === "-" ||
        button.innerText === "X" ||
        button.innerText === "/" ||
        button.innerText === "="
      ) {
        result.value += " " + button.innerText + " ";
      } else {
        result.value += button.innerText;
      }
    }
  }

  if (button.id === "backspace") {
    result.value = backSpace();
  }

  if (button.id === "equal") {
    let final = calculate(result.value);
    result.value = final;
  }
}

// functionality in development
function backSpace() {
  let back = result.value.slice(0, result.value.length - 1);
  return back;
}

function calculate(result) {
  let newResult = result.trim();
  let arr = newResult.split(" ");

  if (arr.includes("=")) {
    arr.pop();
  }

  arr = firstOp(arr);
  arr = secondOp(arr);
  //console.log(arr);
  return arr[0];
}

function firstOp(arr) {
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
      newValue = parseInt(arr[val1M]) * parseInt(arr[val2M]);
      arr.splice(val1M, 3, newValue);
      m++;
    } else if (indexD !== -1) {
      newValue = parseInt(arr[val1D]) / parseInt(arr[val2D]);
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
      newValue = parseInt(arr[val1SUM]) + parseInt(arr[val2SUM]);
      arr.splice(val1SUM, 3, newValue);
      sum++;
    } else if (indexSUB !== -1) {
      newValue = parseInt(arr[val1SUB]) - parseInt(arr[val2SUB]);
      arr.splice(val1SUB, 3, newValue);
      sub++;
    }
  }
  return arr;
}
