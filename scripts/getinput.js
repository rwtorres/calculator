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
    document.addEventListener("keyup", event => {
      if (event.key === `${i}`) document.getElementById(i).blur();
    });

    document.getElementById(i).onclick = () => {
      insertNumber(i);
      document.getElementById(i).blur();
    }
  }

  // Check for Dot input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === ".") {
      document.getElementById("dot").focus();
      insertDot();
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === ".") document.getElementById("dot").blur();
  });

  document.getElementById("dot").onclick = () => {
    insertDot();
    document.getElementById("dot").blur();
  }

  // Get Plus sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "+") {
      document.getElementById("plus").focus();
      insertSignOperator("+");
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "+") document.getElementById("plus").blur();
  });

  document.getElementById("plus").onclick = () => {
    insertSignOperator("+");
    document.getElementById("plus").blur();
  }

  // Get Minus sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "-") {
      document.getElementById("minus").focus();
      insertSignOperator("-");
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "-") document.getElementById("minus").blur();
  });

  document.getElementById("minus").onclick = () => {
    insertSignOperator("-");
    document.getElementById("minus").blur();
  }

  // Get the multiply sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "*") {
      document.getElementById("multiply").focus();
      insertOperator("×");
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "*") document.getElementById("multiply").blur();
  });

  document.getElementById("multiply").onclick = () => {
    insertOperator("×");
    document.getElementById("multiply").blur();
  }

  // Get the Divide sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "/") {
      document.getElementById("divide").focus();
      insertOperator("÷");
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "/") document.getElementById("divide").blur();
  });

  document.getElementById("divide").onclick = () => {
    insertOperator("÷");
    document.getElementById("divide").blur();
  }

  // Get the Remain sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "%") {
      document.getElementById("remain").focus();
      insertOperator("mod");
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "%") document.getElementById("remain").blur();
  });

  document.getElementById("remain").onclick = () => {
    insertOperator("mod");
    document.getElementById("remain").blur();
  }

  // Get the Equals sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      document.getElementById("equals").focus();
      operate();
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("equals").blur();
  });

  document.getElementById("equals").onclick = () => {
    operate();
    document.getElementById("equals").blur();
  }

  // Get the Delete sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Backspace") {
      document.getElementById("delete").focus();
      deleteChar();
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "Backspace") document.getElementById("delete").blur();
  });

  document.getElementById("delete").onclick = () => {
    deleteChar();
    document.getElementById("delete").blur();
  }

  // Get the Clear sign input, either by keyboard or by button click.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.getElementById("clear").focus();
      clearDisplay();
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === "Escape") document.getElementById("clear").blur();
  });

  document.getElementById("clear").onclick = () => {
    clearDisplay();
    document.getElementById("clear").blur();
  }
}