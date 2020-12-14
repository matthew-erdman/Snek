function play() {
	if (playing % 2 == 1) {
	  snek.move();
    console.log(snek.pos)
	  apple.checkCollision();
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
frames = 0;
playing = 1;
window.requestAnimationFrame(play);
