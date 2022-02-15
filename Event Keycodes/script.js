let divBox = document.getElementById("outer");

window.addEventListener("keydown", calcKeyCode);

function calcKeyCode(event) {
	console.log(event);
	divBox.innerHTML = `
  <div class="key-info">
  <small>event.key</small>
  ${event.key === " " ? "Space" : event.key}
  </div>
  <div class="key-info">
  <small>event.keyCode</small>
  ${event.keyCode}
  </div>
  <div class="key-info">
  <small>event.code</small>
  ${event.code}
  </div>
  `;
}
