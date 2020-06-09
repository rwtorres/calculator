// Make the popup draggable across the page.
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById("base-layer-header") ||
      document.getElementById("middle-layer")) {
    document.getElementById("base-layer-header").onmousedown = dragMouseDown;
    document.getElementById("middle-layer").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  // Get the mouse cursor position at startup and call a function when it moves.
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  // Calculate the new cursor position and set the element's new position.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  // Stop moving when mouse button is released.
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}