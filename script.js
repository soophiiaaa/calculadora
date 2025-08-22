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
      result.value += button.innerText;
    }
  }

  if (button.id === "equal") {
    if (total.includes("+")) {
      result.value = sum(total);
    } else if (total.includes("-")) {
      result.value = minus(total);
    }
  }
}

function sum(result) {
  let arr = result.split("+");
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += parseInt(arr[i]);
  }

  return total;
}

function minus(result) {
  let arr = result.split("-");
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total -= parseInt(arr[i]);
  }

  return total;
}
