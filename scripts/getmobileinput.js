getInput();

// Check for user input on numbers, dots and operations.
function getInput() {
  // Check for Number input, either by keyboard or by button click.
  for (let i = 0; i < 10; i++) {
    document.getElementById(i).ontouchstart = () => {
      insertNumber(i);
    }
  }

  // Check for Dot input, either by keyboard or by button click.
  document.getElementById("dot").ontouchstart = () => {
    insertDot();
  }

  // Get Plus sign input, either by keyboard or by button click.
  document.getElementById("plus").ontouchstart = () => {
    insertSignOperator("+");
  }

  // Get Minus sign input, either by keyboard or by button click.
  document.getElementById("minus").ontouchstart = () => {
    insertSignOperator("-");
  }

  // Get the multiply sign input, either by keyboard or by button click.
  document.getElementById("multiply").ontouchstart = () => {
    insertOperator("×");
  }

  // Get the Divide sign input, either by keyboard or by button click.
  document.getElementById("divide").ontouchstart = () => {
    insertOperator("÷");
  }

  // Get the Remain sign input, either by keyboard or by button click.
  document.getElementById("remain").ontouchstart = () => {
    insertOperator("mod");
  }

  // Get the Equals sign input, either by keyboard or by button click.
  document.getElementById("equals").ontouchstart = () => {
    operate();
  }

  // Get the Delete sign input, either by keyboard or by button click.
  document.getElementById("delete").ontouchstart = () => {
    deleteChar();
  }

  // Get the Clear sign input, either by keyboard or by button click.
  document.getElementById("clear").ontouchstart = () => {
    clearDisplay();
  }
}