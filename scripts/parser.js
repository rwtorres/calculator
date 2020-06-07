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