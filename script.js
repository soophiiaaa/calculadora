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

keyboard.addEventListener("click", showValues);

function showValues(event) {
  let button = event.target;

  if (button.id === "clear") {
    result.value = "";
  } else {
    if (button.tagName === "BUTTON") {
      result.value += button.innerText;
    }
  }
}
