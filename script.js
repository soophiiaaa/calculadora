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
  console.log(arr);
}
