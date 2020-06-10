getInput();

// Check for user input on numbers, dots and operations.
function getInput() {
  // Check for Number input, by button touch.
  for (let i = 0; i < 10; i++) {
    document.getElementById(i).ontouchstart = () => {
      insertNumber(i);
    }
  }

  // Check for Dot input, by button touch.
  document.getElementById("dot").ontouchstart = () => {
    insertDot();
  }

  // Get Plus sign input, by button touch.
  document.getElementById("plus").ontouchstart = () => {
    insertSignOperator("+");
  }

  // Get Minus sign input, by button touch.
  document.getElementById("minus").ontouchstart = () => {
    insertSignOperator("-");
  }

  // Get the multiply sign input, by button touch.
  document.getElementById("multiply").ontouchstart = () => {
    insertOperator("×");
  }

  // Get the Divide sign input, by button touch.
  document.getElementById("divide").ontouchstart = () => {
    insertOperator("÷");
  }

  // Get the Remain sign input, by button touch.
  document.getElementById("remain").ontouchstart = () => {
    insertOperator("mod");
  }

  // Get the Equals sign input, by button touch.
  document.getElementById("equals").ontouchstart = () => {
    operate();
  }

  // Get the Delete sign input, by button touch.
  document.getElementById("delete").ontouchstart = () => {
    deleteChar();
  }

  // Get the Clear sign input, by button touch.
  document.getElementById("clear").ontouchstart = () => {
    clearDisplay();
  }
}