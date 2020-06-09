const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const display = document.getElementById("display");

if (isMobile) {
  document.getElementById("css").href = "styles/mobile.css"
} else {
  document.getElementById("css").href = "styles/style.css"
  dragElement(document.getElementById("base-layer"));
}

getInput();