const display = document.getElementById("display");

dragElement(document.getElementById("top-layer"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("top-layer-header") ||
      document.getElementById("middle-layer")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("top-layer-header").onmousedown = dragMouseDown;
    document.getElementById("middle-layer").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Check for errors and return error messages.
const errorCheck = {
  checkForInfinity: function(buffer, index) {
    if (buffer && index) {
      if (buffer[index + 1] === "0") {
        return "Math ERROR";
      } else {
        return false;
      }
    } else if (buffer[index] === Infinity) {
      return "Math ERROR";
    } else {
      return false;
    }
  },
  checkForNaN: function(buffer) {
    if (typeof(buffer) !== "string" && isNaN(buffer)) {
      return "Syntax ERROR";
    } else {
      return false;
    }
  },
  respondToErrors: function() {
    if (display.textContent === "Syntax ERROR" ||
        display.textContent === "Math ERROR") {
      return true;
    } else {
      return false;
    }
  },
};

// Check the display contents.
const contentCheck = {
  isOperator: function(char) {
  const operators = ["x", "/", "=", "m", "d", "mod"];

  for (let i = 0; i < operators.length; i++) {
    if (char === operators[i]) {
      return true;
    }
  }
  return false;
  },
  isSignOperator: function(char) {
  const operators = ["+", "-"];

  for (let i = 0; i < operators.length; i++) {
    if (char === operators[i]) {
      return true;
    }
  }
  return false;
  },
  reasonableDots: function(string) {
    const index = string.length - 1;
    let dots = true;

    for (let i = index; i >= 0; i--) {
      if (string[i] === ".") {
        dots = false;
        break;
      }
      else if (this.isOperator(string[i]) || this.isSignOperator(string[i])) {
        break;
      }
    }
    return dots;
  },
}

// Clear the display and insert a zero.
function clearDisplay() {
  display.textContent = 0;
}

// Insert a number on the display.
function insertNumber(index) {
  if (errorCheck.respondToErrors()) clearDisplay();
  if (display.textContent === "0") {
    display.textContent = "";
  }
  display.textContent += index;
  display.scrollTo(display.scrollWidth, 0);
}

// Insert a dot on the display.
function insertDot() {
  if (errorCheck.respondToErrors()) clearDisplay();
  if (contentCheck.reasonableDots(display.textContent)) {
    display.textContent += ".";
    display.scrollTo(display.scrollWidth, 0);
  }
}

// Insert a minus on the display.
function insertSignOperator(signOperator) {
  const displayIndex = display.textContent.length - 1;

  if (errorCheck.respondToErrors()) clearDisplay();
  if (display.textContent[displayIndex] === signOperator) {
    return;
  } else {
    display.textContent += signOperator;
    display.scrollTo(display.scrollWidth, 0);
  }
}

// Insert an operator on the display.
function insertOperator(operation) {
  const displayIndex = display.textContent.length - 1;

  if (errorCheck.respondToErrors()) clearDisplay();
  if (contentCheck.isOperator(display.textContent[displayIndex])) {
    if (display.textContent[displayIndex] === "d") {
      display.textContent = display.textContent.slice(0, displayIndex - 2);
    } else {
      display.textContent = display.textContent.slice(0, displayIndex);
    }
    display.textContent += operation;
    display.scrollTo(display.scrollWidth, 0);
  } else {
    display.textContent += operation;
    display.scrollTo(display.scrollWidth, 0);
  }
}

// Delete a character on the display.
function deleteChar() {
  const displayIndex = display.textContent.length - 1;

  if (errorCheck.respondToErrors()) clearDisplay();
  if (display.textContent.length === 1) {
    clearDisplay();
  } else {
    if (display.textContent[displayIndex] === "d") {
      display.textContent = display.textContent.slice(0, displayIndex - 2);
    } else {
      display.textContent = display.textContent.slice(0, displayIndex);
    }
  }
}

// Evaluate the display contents and show the results.
function operate() {
   let buffer = [];

  for (let i = 0, j = 0; j < display.textContent.length; j++) {
    if (typeof(buffer[i]) !== "string") buffer[i] = "";
    if (!(contentCheck.isOperator(display.textContent[j])) &&
        !(contentCheck.isSignOperator(display.textContent[j]))) {
      buffer[i] += display.textContent[j];
    } else if (contentCheck.isSignOperator(display.textContent[j])) {
      if (display.textContent[j] === "-") {
        if (contentCheck.isOperator(display.textContent[j-1]) ||
            contentCheck.isSignOperator(display.textContent[j-1]) ||
            display.textContent[j-1] === "e") {
          buffer[i] += "-";
        } else {
          buffer[++i] = "-";
          i++;
        }
      } else if (display.textContent[j] === "+") {
        if (contentCheck.isOperator(display.textContent[j-1]) ||
            contentCheck.isSignOperator(display.textContent[j-1]) ||
            display.textContent[j-1] === "e") {
          buffer[i] += "+";
        } else {
          buffer[++i] = "+";
          i++;
        }
      }
    } else if (display.textContent[j] === "x") {
      buffer[++i] = "x";
      i++;
    } else if (display.textContent[j] === "/") {
      buffer[++i] = "/";
      i++;
    } else if (display.textContent[j] === "m") {
      buffer[++i] = "mod";
      i++;
      j += 2;
    }
  }
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === "x") {
      buffer[i] = Number(buffer[i-1]) * Number(buffer[i+1]);
      buffer.splice(i+1, 1);
      buffer.splice(i-1, 1);
      i = 0;
    } else if (buffer[i] === "/" || buffer[i] === "mod") {
      if (errorCheck.checkForInfinity(buffer, i)) {
        display.textContent = errorCheck.checkForInfinity(buffer, i);
        return;
      }
      if (buffer[i] === "/") {
        buffer[i] = Number(buffer[i-1]) / Number(buffer[i+1]);
        buffer.splice(i+1, 1);
        buffer.splice(i-1, 1);
        i = 0;
      } else if (buffer[i] === "mod") {
        buffer[i] = Number(buffer[i-1]) % Number(buffer[i+1]);
        buffer.splice(i+1, 1);
        buffer.splice(i-1, 1);
        i = 0;
    }
  }
}
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === "+" || buffer[i] === "-") {
      if (buffer[i] === "+") {
        buffer[i] = Number(buffer[i-1]) + Number(buffer[i+1]);
      } else {
        buffer[i] = Number(buffer[i-1]) - Number(buffer[i+1]);
      }
      buffer.splice(i+1, 1);
      buffer.splice(i-1, 1);
      i = 0;
    }
  }

  if (errorCheck.checkForNaN(buffer[0])) {
    display.textContent = errorCheck.checkForNaN(buffer[0]);
  }
  else if (errorCheck.checkForInfinity(buffer, 0)) {
    display.textContent = errorCheck.checkForInfinity(buffer, 0);
  } else {
    if (String(buffer[0]).length > 14) {
      display.textContent = buffer[0].toPrecision(14);
    } else {
      display.textContent = buffer[0];
    }
  }
}

// Check for user input on numbers, dots and operations.
function getInput() {
  // Check for Number input, either by keyboard or by button click.
  for (let i = 0; i < 10; i++) {
    document.addEventListener("keydown", event => {
      if (event.key === `${i}`) {
        document.getElementById(i).focus();
        insertNumber(i);
      }
    });
    document.getElementById(i).onclick = () => insertNumber(i);

    document.addEventListener("keyup", event => {
      if (event.key === `${i}`) document.getElementById(i).blur();
    });
  }

  // Check for Dot input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === ".") document.getElementById("dot").focus();
  });
  document.getElementById("dot").onfocus = () => insertDot();

  document.addEventListener("keyup", event => {
    if (event.key === ".") document.getElementById("dot").blur();
  });

  // Get Plus sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "+") document.getElementById("plus").focus();
  });
  document.getElementById("plus").onfocus = () => insertSignOperator("+");

  document.addEventListener("keyup", event => {
    if (event.key === "+") document.getElementById("plus").blur();
  });

  // Get Minus sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "-") document.getElementById("minus").focus();
  });
  document.getElementById("minus").onfocus = () => insertSignOperator("-");

  document.addEventListener("keyup", event => {
    if (event.key === "-") document.getElementById("minus").blur();
  });

  // Get the multiply sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "*") document.getElementById("multiply").focus();
  });
  document.getElementById("multiply").onfocus = () => insertOperator("x");

  document.addEventListener("keyup", event => {
    if (event.key === "*") document.getElementById("multiply").blur();
  });

  // Get the Divide sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "/") document.getElementById("divide").focus();
  });
  document.getElementById("divide").onfocus = () => insertOperator("/");

  document.addEventListener("keyup", event => {
    if (event.key === "/") document.getElementById("divide").blur();
  });

  // Get the Remain sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "%") document.getElementById("remain").focus();
  });
  document.getElementById("remain").onfocus = () => insertOperator("mod");

  document.addEventListener("keyup", event => {
    if (event.key === "%") document.getElementById("remain").blur();
  });

  // Get the Equals sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") document.getElementById("equals").focus();
  });
  document.getElementById("equals").onfocus = () => operate();

  document.addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("equals").blur();
  });

  // Get the Delete sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Backspace") document.getElementById("delete").focus();
  });
  document.getElementById("delete").onfocus = () => deleteChar();

  document.addEventListener("keyup", event => {
    if (event.key === "Backspace") document.getElementById("delete").blur();
  });

  // Get the Clear sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") document.getElementById("clear").focus();
  });
  document.getElementById("clear").onfocus = () => clearDisplay();

  document.addEventListener("keyup", event => {
    if (event.key === "Escape") document.getElementById("clear").blur();
  });
}

getInput();