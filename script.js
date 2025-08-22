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
  let total = result.value;

  if (button.id === "clear") {
    result.value = "";
  } else {
    if (button.tagName === "BUTTON") {
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

  if (button.id === "equal") {
    let teste = result.value;
    calculate(teste);
  }
}

function calculate(result) {
  let newResult = result.trim();
  let arr = newResult.split(" ");
  if (arr.includes("=")) {
    arr.pop();
  }

  arr = firstOp(arr);
  console.log(arr);
}

function firstOp(arr) {
  let m = 0;
  let d = 0;
  let newValue = 0;

  while (arr.includes("X") || arr.includes("/")) {
    let indexM = arr.indexOf("X");
    let indexD = arr.indexOf("/");
    let val1M = indexM - 1;
    let val2M = indexM + 1;
    let val1D = indexD - 1;
    let val2D = indexD + 1;

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
