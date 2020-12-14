function play() {
	if (playing % 2 != 0) {
	  frames += 1;
	  if (frames % 30 == 0) {
	      snek.move();
	      apple.checkCollision();
	  }
	  snek.checkBounds();
	  drawAll();
	}
  window.requestAnimationFrame(play);
}

document.addEventListener("keydown", keypress);
ctx = setUpContext();
snek = new Snek(160, 160, ctx);
apple = new Apple();
frames = 0;
playing = 1;
window.requestAnimationFrame(play);
