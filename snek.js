function play() {
  snek.draw();
  console.log(snek.x)
  console.log(snek.y)
}

document.addEventListener("keydown", keypress);
ctx = setUpContext();
snek = new Snek(250, 250, ctx);
console.log(snek)
window.requestAnimationFrame(play);
