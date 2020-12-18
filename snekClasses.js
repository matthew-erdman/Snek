class Snek {
    constructor() {
      this.pos = [canvas.width / 2 - (canvas.width / 2) % 40, canvas.height / 2 - (canvas.height / 2) % 40];
      this.color = "#00a000";
      this.bodyColor = "#00f000";
      this.dir = -1; // Prevents movement until first input
      this.tail = [];
    }

    // Getters and setters for x/y coords
    get x() {return this.pos[0];}
    set x(newX) {this.pos[0] = newX;}

    get y() {return this.pos[1];}
    set y(newY) {this.pos[1] = newY;}

    move() {
      this.tail.push([this.x, this.y]); // Push current head pos to tail "stack"
      /*
      NOTE: pushing 'this.pos' rather than '[this.x, this.y]' causes the value
      in the tail to always match 'this.pos' (snek head), triggering checkCollision()
      and loss upon first apple collection. I don't know why using '[this.x, this.y]'
      gets around 'this.pos' changing when they're just set from 'this.pos[0]' and 'this.pos[1]'.
      '[this.x, this.y]' should be identical to 'this.pos' (x/y getter is pulling from pos)
      and I think it's doing weird object stuff I don't understand :(
      */

      // Up
      if (this.dir == 0) {
        this.y -= 40;
      }

      // Right
      else if (this.dir == 1) {
        this.x += 40;
      }

      // Down
      else if (this.dir == 2) {
        this.y += 40;
      }

      // Left
      else if (this.dir == 3) {
        this.x -= 40;
      }

      // Update tail stack
      if (appleEaten) {
        appleEaten = false; // Don't pop if apple has been eaten, let the tail length grow by 1
      }
      else {
        this.tail.shift(); // No apple, pop oldest pos off tail stack
      }
    }

    checkCollision() {
      // Self collision
      for (var i in this.tail) {
        if (JSON.stringify(this.tail[i]) == JSON.stringify(this.pos)) {
          console.log("Self collision at %s with tail:", this.pos);
          console.log(snek.tail);
          reset();
          break; // NOTE: Will crash due to reset() of snek.tail if allowed to loop again at this point
        }
      }

      // Right collision
      if (this.x >= canvas.width) {
        console.log("X bound + (right) collision");
        reset();
      }

      // Left collision
      else if (this.x < 0) {
        console.log("X bound - (left) collision");
        reset();
      }

      // Up collision
      else if (this.y < 0) {
        console.log("Y bound - (up) collision");
        reset();
      }

      // Down collision
      else if (this.y >= canvas.height) {
        console.log("Y bound + (down) collision");
        reset();
      }
    }
}

class Apple {
  constructor() {
    this.pos = snek.pos;
    this.color = "#FF0000";
  }

  // Getters and setters for x/y coords
  get x() {return this.pos[0];}
  set x(newX) {this.pos[0] = newX;}

  get y() {return this.pos[1];}
  set y(newY) {this.pos[1] = newY;}

  checkEaten() {
    // Is snek head on apple?
    if (JSON.stringify(snek.pos) == JSON.stringify(this.pos)) {
      appleEaten = true;
      console.log("Apple eaten at %s / new len: %d", this.pos, snek.tail.length + 2);
      this.spawn();
    }
  }

  spawn() {
		var needSpawn = true;
    while (needSpawn) {
      // Generates random multiple of 40 between 0 and canvas max dimensions
      this.pos = [Math.floor(Math.random() * (canvas.width / 40)) * 40,
         Math.floor(Math.random() * (canvas.height / 40)) * 40];

			// Ensure new apple coords are outside of snek tail
			if (snek.tail.length > 0) {
				for (var i in snek.tail) {
					if (JSON.stringify(this.pos) == JSON.stringify(snek.tail[i])) {
						break; // Apple is inside snek body
					}
				}
				needSpawn = false; // Apple is not inside snek body
			}
			else {
				needSpawn = false; // There is no snek body
			}

			// Ensure new apple coords are also outside of snek head
			if (JSON.stringify(this.pos) == JSON.stringify(snek.pos) || needSpawn) {
				needSpawn = true; // Apple is inside snek head or body
			}
    }

    console.log("New apple spawned at " + this.pos);
  }
}

function reset() {
  /*
    Purpose: Resets attribues and pauses to reset the game without needing to reload page
    Inputs: None
    Returns: None
  */

  console.log("Resetting game");
  if (playing) {
    pause();
  }
  snek.pos = [canvas.width / 2 - (canvas.width / 2) % 40, canvas.height / 2 - (canvas.height / 2) % 40];
  snek.dir = -1; // Prevents movement until input
  snek.tail = [];
  console.log("New snek spawned at " + snek.pos);
  apple.spawn();
}

function pause() {
  /*
    Purpose: Implements play/pause logic by setting boolean flag turning on/off frame drawing
    Inputs: None
    Returns: None
  */

  if (playing) {
    // Draw pause banner
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "40px Cursive";
    ctx.fillText("PAUSED", canvas.width / 2 - 40, canvas.height / 2 - 40);
    ctx.stroke();

    console.log("Execution paused");
    playing = false;
  }
  else {
    console.log("Execution unpaused");
    playing = true;
  }
}

function drawAll() {
  /*
    Purpose: Clears screen and draws all of the game objects for requestAnimationFrame
    Inputs: None
    Returns: None
  */

  // Clear screen for new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.beginPath();
  ctx.fillStyle = "#c0e0f7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw apple
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(apple.x - 1, apple.y - 1, 42, 42);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x, apple.y, 40, 40);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(apple.x + 18, apple.y + 18, 4, 4);
  ctx.fill();

  // Draw snek head
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(snek.x - 1, snek.y - 1, 42, 42);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = snek.color;
  ctx.fillRect(snek.x, snek.y, 40, 40);
  ctx.stroke();

  // Draw snek body
  for (var i in snek.tail) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(snek.tail[i][0] - 1, snek.tail[i][1] - 1, 42, 42);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = snek.bodyColor;
    ctx.fillRect(snek.tail[i][0], snek.tail[i][1], 40, 40);
    ctx.stroke();
  }

  //Draw scores
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.font = "20px Cursive";
  ctx.fillText("Score: " + (snek.tail.length + 1), 5, 25);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.font = "20px Cursive";
  ctx.fillText("Best: " + highScore, 5, 50);
  ctx.stroke();
}

function setUpContext() {
  /*
    Purpose: Sets up the canvas parameters for snek
    Inputs: None
    Returns: Context with set parameters
  */
  canvas = document.getElementById("mainCanvas");

  // Canvas size has to be a multiple of 40 for clean movement and spawning
  canvas.width = window.innerWidth - (window.innerWidth % 40);
  canvas.height = window.innerHeight - (window.innerHeight % 40);

  canvas.style.border = "1px solid black";

  ctx = canvas.getContext("2d");
  return ctx;
}

function keypress(event) {
  /*
    Purpose: Listens for keyboard events for snek movement and game controls
    Inputs: Keyboard event
    Returns: None
  */
  keyStr = event.key.toLowerCase();  // In case of caps lock

  // Pause/unpause
  if ((playing == false && ["w", "a", "s", "d"].includes(keyStr)) || keyStr == 'escape') {
    console.log("Manual pause triggered");
    pause();
  }

  // Reset game
  if (keyStr == 'k') {
    console.log("Manual reset triggered");
    reset();
  }

  /*
  NOTE: 180 degree turns are prevented, but still possible if keys are hit fast
  enough to perform two 90 degree turns in the frames between snek.move() calls.
  */
  // Up
  if (keyStr == 'w' && snek.dir != 2) {
    snek.dir = 0;
  }

  // Right
  else if (keyStr == 'd' && snek.dir != 3) {
    snek.dir = 1;
  }

  // Down
  else if (keyStr == 's' && snek.dir != 0) {
    snek.dir = 2;
  }

  // Left
  else if (keyStr == 'a' && snek.dir != 1) {
    snek.dir = 3;
  }

  // Options to change framerate
  // Slow
  if (keyStr == '1') {
    frameRate = 20;
  }

  // Medium - good for 144 Hz
  else if (keyStr == '2') {
    frameRate = 14;
  }

  // Fast - good for 60 Hz
  else if (keyStr == '3') {
    frameRate = 6;
  }

  // Very fast - good for memes
  else if (keyStr == '9') {
    frameRate = 2;
  }
}
