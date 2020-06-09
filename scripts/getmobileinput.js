getInput();

// Check for user input on numbers, dots and operations.
function getInput() {
  // Check for Number input, either by keyboard or by button click.
  for (let i = 0; i < 10; i++) {
    document.getElementById(i).ontouchstart = () => {
      insertNumber(i);
      document.getElementById(i).blur();
    }
  }

  // Check for Dot input, either by keyboard or by button click.
  document.getElementById("dot").ontouchstart = () => {
    insertDot();
    document.getElementById("dot").blur();
  }

  // Get Plus sign input, either by keyboard or by button click.
  document.getElementById("plus").ontouchstart = () => {
    insertSignOperator("+");
    document.getElementById("plus").blur();
  }

  // Get Minus sign input, either by keyboard or by button click.
  document.getElementById("minus").ontouchstart = () => {
    insertSignOperator("-");
    document.getElementById("minus").blur();
  }

  // Get the multiply sign input, either by keyboard or by button click.
  document.getElementById("multiply").ontouchstart = () => {
    insertOperator("×");
    document.getElementById("multiply").blur();
  }

  // Get the Divide sign input, either by keyboard or by button click.
  document.getElementById("divide").ontouchstart = () => {
    insertOperator("÷");
    document.getElementById("divide").blur();
  }

  // Get the Remain sign input, either by keyboard or by button click.
  document.getElementById("remain").ontouchstart = () => {
    insertOperator("mod");
    document.getElementById("remain").blur();
  }

  // Get the Equals sign input, either by keyboard or by button click.
  document.getElementById("equals").ontouchstart = () => {
    operate();
    document.getElementById("equals").blur();
  }

  // Get the Delete sign input, either by keyboard or by button click.
  document.getElementById("delete").ontouchstart = () => {
    deleteChar();
    document.getElementById("delete").blur();
  }

  // Get the Clear sign input, either by keyboard or by button click.
  document.getElementById("clear").ontouchstart = () => {
    clearDisplay();
    document.getElementById("clear").blur();
  }
}