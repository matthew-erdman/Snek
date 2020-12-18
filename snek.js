function play() {
/*
  Purpose: Serves as the main drawing loop
  Inputs: None
  Returns: None, recurses infinitely
*/

  // Only render 1 of every every 20 frames
  if (playing && frames % 20 == 0) {
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
  //NOTE: 144 fps on Windows with 144 Hz main display and ? fps on Mac with 60 Hz display
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
var playing = true;
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

// Request first frame and enter game loop
window.requestAnimationFrame(play);
