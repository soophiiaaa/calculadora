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
  // garante que só funcionará com botões
  let button = event.target.closest("button");

  if (!button) {
    return;
  }

  if (button.id === "clear") {
    result.value = "";
  } else if (button.id === "backspace") {
    // elimina o último caractere do result
    result.value = result.value.slice(0, -1);
  } else if (button.id === "signal") {
    let signal = result.value.split(" ");
    signal = changeSignal(signal);
    result.value = signal.join(" ");
  } else if (button.id === "parenthesis") {
    addParenthesis(result);
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
  // remove espaços em branco do início e fim da string
  let newResult = result.trim();

  // substitui as , da string por .
  newResult = newResult.replace(/,/g, ".");

  // transforma o resultado num array e remove elementos vazios
  let arr = newResult.split(" ").filter((element) => element !== "");
  //console.log(arr);

  if (arr.includes("=")) {
    arr.pop();
  }

  while (arr.includes("(")) {
    let lastP = arr.lastIndexOf("(");
    let lastCP = arr.indexOf(")", lastP);
    let sub = arr.slice(lastP + 1, lastCP);

    sub = percentage(sub);
    sub = firstOp(sub);
    sub = secondOp(sub);
    let subResult = sub[0];

    arr.splice(lastP, lastCP - lastP + 1, subResult);
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
    // essa condição identifica se existe uma operação junto com a porcentagem de determinado valor
    let baseValue = parseFloat(arr[index - 3]); // a variável recebe o valor anterior a porcentagem e seu operador
    finalValue = baseValue * (p / 100);
    arr.splice(index - 1, 2, finalValue);
  } else {
    finalValue = p / 100;
    arr.splice(index - 1, 2, finalValue);
  }

  if (arr.includes("%")) {
    return percentage(arr);
  } // função recursiva para verificar se ainda existe o operador %

  return arr;
}

function changeSignal(arr) {
  let number = parseFloat(arr[arr.length - 1]) * -1;
  arr[arr.length - 1] = number;
  return arr;
}

//funcionalidade utilizada para verificar se existe operador antes de adicionar parênteses
function isOperador(token) {
  if (
    token === "+" ||
    token === "-" ||
    token === "/" ||
    token === "%"
  ) {
    return true;
  }
  return "";
}

function addParenthesis(result) {
  let newResult = result.value.trim();
  // variáveis que contam quantos parênteses existem na string, caso não encontre, retorna null
  let openCount = (newResult.match(/\(/g) || []).length;
  let closeCount = (newResult.match(/\)/g) || []).length;
  // separa o resultado num array dividido por espaços e remove elementos vazios 
  let tokens = newResult.split(" ").filter((t) => t !== "");
  let lastToken = tokens[tokens.length - 1]; // pega o último elemento significativo da expressão, ignorando os espaços
  let lastI = newResult[newResult.length - 1]; // pega o último caractere da string para decidir fechar ou não os parênteses

  if (newResult === "") {
    result.value += " ( ";
  } else if (openCount > closeCount && /\d|\)/.test(lastI) /* verifica se o último caractere é um número ou parêntese */ ) {
    result.value += " ) ";
  } else if (!isOperador(lastToken) && lastToken !== "(") {
    result.value += " X ( ";
  } else {
    result.value += " ( "
  }
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
