function play() {
  if (playing % 2 == 1) {
	  frames += 1;
	  if (frames % 30 == 0) {
	      snek.move();
        console.log(snek.pos)
	      apple.checkCollision();
	  }
	  snek.checkBounds();
	  drawAll();
	}
  window.requestAnimationFrame(play);
}

document.addEventListener("keydown", keypress);
ctx = setUpContext();
snek = new Snek(canvas.width / 2 - (canvas.width / 2) % 40, canvas.height / 2 - (canvas.height / 2) % 40, ctx);
console.log("New snek spawned at " + snek.pos)
apple = new Apple();
apple.spawn();
playing = 1;
var frames = 0;
var start = new Date();
var now = new Date();
window.requestAnimationFrame(play);
