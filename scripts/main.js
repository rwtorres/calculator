const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const display = document.getElementById("display");

if (isMobile) {
  document.getElementById("css").href = "styles/mobile.css"
  document.getElementById("getinput").src = "scripts/getmobileinput.js"
} else {
  document.getElementById("css").href = "styles/style.css"
  document.getElementById("getinput").src = "scripts/getinput.js"
  dragElement(document.getElementById("base-layer"));
}