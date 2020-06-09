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
  const buffer = [];

  // Organize display elements into buffer elements.
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
    } else if (display.textContent[j] === "×") {
      buffer[++i] = "×";
      i++;
    } else if (display.textContent[j] === "÷") {
      buffer[++i] = "÷";
      i++;
    } else if (display.textContent[j] === "m") {
      buffer[++i] = "mod";
      i++;
      j += 2;
    }
  }

  // Calculate first the operations with higher precedence
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === "×") {
      buffer[i] = Number(buffer[i-1]) * Number(buffer[i+1]);
      buffer.splice(i+1, 1);
      buffer.splice(i-1, 1);
      i = 0;
    } else if (buffer[i] === "÷" || buffer[i] === "mod") {
      if (errorCheck.checkForInfinity(buffer, i)) {
        display.textContent = errorCheck.checkForInfinity(buffer, i);
        return;
      }
      if (buffer[i] === "÷") {
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

  // then the ones with lower precedence.
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

  // Check for errors, and output either an error message or the numeric result.
  if (errorCheck.checkForNaN(buffer[0])) {
    display.textContent = errorCheck.checkForNaN(buffer[0]);
  }
  else if (errorCheck.checkForInfinity(buffer, 0)) {
    display.textContent = errorCheck.checkForInfinity(buffer, 0);
  } else {
    if (String(buffer[0]).length > 14) {
      display.textContent = Number(buffer[0]).toPrecision(14);
    } else {
      display.textContent = buffer[0];
    }
  }
}