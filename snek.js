function play() {
/*
  Purpose: Serves as the main drawing loop
  Inputs: None
  Returns: None, recurses infinitely
*/

  // Only render 1 out of several frames to control snek speed
  if (playing && frames % frameRate == 0) {
      snek.move();                            // Move snek
      apple.checkEaten();                     // Is snek on apple?
      snek.checkCollision();                  // Did snek die?
      if (snek.tail.length + 1 > highScore) {
        highScore = snek.tail.length + 1;     // Do we have to update highscore?
      }
      drawAll();                              // Draw frame

      // FPS counter, logs every 10 secs
      if (frames % 200 == 0) {
        now = new Date();
        msecs = now.getTime() - start.getTime();
        console.log("fps:", Math.round((frames / msecs) * 1000));
      }
	}

  frames += 1;
  window.requestAnimationFrame(play);
  //NOTE: 144 fps on Windows with 144 Hz main display and 60 fps on Mac with 60 Hz display
}

// ---Init---
// Set up keyboard event listener
document.addEventListener("keydown", keypress);

// Set up canvas context
var ctx = setUpContext();

// FPS Counter vars
var frames = 0;
var start = new Date();
var now = new Date();

// Global game vars
var frameRate = 6; // Start only render 1 of every every 6 frames - adjustable ingame
var playing = false;
var appleEaten = false;
var highScore = 0;

// Object instantiations
var snek = new Snek(ctx);
var apple = new Apple();

// Logging
console.log("Window is %d by %d", window.innerWidth, window.innerHeight);
console.log("Canvas is %d by %d", canvas.width, canvas.height);
console.log("New snek spawned at " + snek.pos)

apple.spawn();

// Draw instructions
ctx.fillStyle = snek.color;
ctx.font = "40px Cursive";
ctx.fillText("Welcome to snek!", (canvas.width / 2 - 120) - 30, (canvas.height / 2 - 40) - 40);
ctx.stroke();

ctx.font = "20px Cursive";
ctx.fillText("Use w/a/s/d to move", canvas.width / 2 - 120, (canvas.height / 2 - 40) + 0);
ctx.stroke();
ctx.fillText("Use 1/2/3/9 to adjust game speed", canvas.width / 2 - 120, (canvas.height / 2 - 40) + 30);
ctx.stroke();
ctx.fillText("Use esc to pause/unpause", canvas.width / 2 - 120, (canvas.height / 2 - 40) + 60);
ctx.stroke();

ctx.font = "30px Cursive";
ctx.fillText("Esc or w/a/s/d to start playing!", (canvas.width / 2 - 120) - 70, (canvas.height / 2 - 40) + 150);
ctx.stroke();


// Request first frame and start main game loop
window.requestAnimationFrame(play);
