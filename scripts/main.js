const BUFFER_MAX_SIZE = 19;
const bufferContent = document.getElementById("buffer-content");

// Clear the input field and insert a zero.
function clearBuffer() {
  bufferContent.textContent = 0;
}

// Warn the user for common bugs.
function errorCheck(buffer, index) {
  if (bufferContent.textContent.length > BUFFER_MAX_SIZE) {
    alert("Error: number is too big");
    clearBuffer();
  }
  for (let i = j = 0; i < bufferContent.textContent.length; i++) {
    if (bufferContent.textContent[i] === ".") {
      ++j;
    }
    if (j > 1) {
      alert("Error: more than one dot");
      clearBuffer();
    }
  }
  if (buffer && index) {
    if (buffer[index + 1] === "0") {
      alert("Error: division by zero");
      clearBuffer();
      return true;
    }
  }
}

// Order data on the buffer about operators and numbers to operate on.
function calculate(operator, buffer, index) {
  buffer[index++] = bufferContent.textContent;
  buffer[index++] = operator;
  clearBuffer();
  return index;
}

// If the user clicks on numbers or on the dot, put them in the input field.
function getNumberInput() {
  for (let i = 0; i < 10; i++) {
    document.getElementById(i).onclick = () => {
      errorCheck();
      if (bufferContent.textContent === "0") {
        bufferContent.textContent = "";
      }
      bufferContent.textContent += i;
    }
  }
  document.getElementById("dot").onclick = () => {
    errorCheck();
    bufferContent.textContent += ".";
  }
}

// If the user clicks on operator buttons, allocate and execute the operations.
function getOperatorInput() {
  let i = 0;
  let buffer = [];

  document.getElementById("plus").onclick = () => {
    i = calculate("+", buffer, i);
  }
  document.getElementById("minus").onclick = () => {
    i = calculate("-", buffer, i);
  }
  document.getElementById("multiply").onclick = () => {
    i = calculate("*", buffer, i);
  }

  document.getElementById("divide").onclick = () => {
    i = calculate("/", buffer, i);
  }

  document.getElementById("remain").onclick = () => {
    i = calculate("%", buffer, i);
  }

  document.getElementById("equals").onclick = () => {
    buffer[i] = bufferContent.textContent;
    for (let j = 0; j < i; j++) {
      if (buffer[j] === "+") {
        buffer[j+1] = Number(buffer[j-1]) + Number(buffer[j+1]);
      } else if (buffer[j] === "-") {
        buffer[j+1] = Number(buffer[j-1]) - Number(buffer[j+1]);
      } else if (buffer[j] === "*") {
        buffer[j+1] = Number(buffer[j-1]) * Number(buffer[j+1]);
      } else if (buffer[j] === "/") {
        if (errorCheck(buffer, j)) continue;
        buffer[j+1] = Number(buffer[j-1]) / Number(buffer[j+1]);
      } else if (buffer[j] === "%") {
        if (errorCheck(buffer, j)) continue;
        buffer[j+1] = Number(buffer[j-1]) % Number(buffer[j+1]);
      }
    }
    bufferContent.textContent = buffer[i];
    errorCheck();
    buffer = [];
  }

  document.getElementById("clear").onclick = () => {
    clearBuffer();
    buffer = [];
  }
}

getNumberInput();
getOperatorInput();
