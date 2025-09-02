const container = document.querySelector(".container");
const result = document.querySelector("#result");
const backspace = document.querySelector("#backspace");
const keyboard = document.querySelector("#keyboard");
const clear = document.querySelector("#clear");
const parenthesis = document.querySelector("#parenthesis");
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
  if (button.id === "parenthesis") {
    // pega a string e transforma num array caso existam parênteses
    let arr = result.value.split(" ").filter((element) => element !== "");
    // o array recebe a função que lida com parênteses e atualiza o resultado
    let updatedArr = addParenthesis(arr);
    result.value = updatedArr.join(" ");
  } else if (button.id === "clear") {
    result.value = "";
  } else if (button.id === "backspace") {
    result.value = result.value.slice(0, -1);
  } else if (button.id === "signal") {
    let signal = result.value.split(" ");
    signal = changeSignal(signal);
    result.value = signal.join(" ");
  } else if (button.id === "parenthesis") {
    result.value += " " + "(" + " ";
  } else {
    if (button.tagName === "BUTTON") {
      // a condição adiciona espaços entre um elemento e outro para melhor desempenho das funcionalidades
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
  console.log(arr);

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

function addParenthesis(arr) {
  let openP = 0;
  let lastIndex = arr[arr.length - 1];

  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      openP++;
    }
  }

  if (
    openP === 0 ||
    lastIndex === "+" ||
    lastIndex === "-" ||
    lastIndex === "X" ||
    lastIndex === "/"
  ) {
    arr.push("(");
  } else if (
    (openP > 0 && !isNaN(parseFloat(lastIndex))) ||
    lastIndex === ")"
  ) {
    arr.push(")");
  }
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
    // variáveis que recebem os valores antes e depois dos operadores
    let val1M = indexM - 1;
    let val2M = indexM + 1;
    let val1D = indexD - 1;
    let val2D = indexD + 1;

    // essa condição permite realizar cálculos independente da ordem dos operadores
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
    // variáveis que recebem os valores antes e depois dos operadores
    let val1SUM = indexSUM - 1;
    let val2SUM = indexSUM + 1;
    let val1SUB = indexSUB - 1;
    let val2SUB = indexSUB + 1;

    // essa condição permite realizar cálculos independente da ordem dos operadores
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
