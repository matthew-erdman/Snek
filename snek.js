function play() {
  snek.move(snek.heading);
  snek.draw();
  window.requestAnimationFrame(play);
}

document.addEventListener("keydown", keypress);
ctx = setUpContext();
snek = new Snek(160, 160, ctx);
window.requestAnimationFrame(play);
