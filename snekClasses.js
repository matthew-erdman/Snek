class Snek {
    constructor(x, y) {
      this.pos = [x, y];
      this.color = "#00c000";
      this.dir = 0;
      this.len = 1;
    }
    get x() {return this.pos[0];}
    set x(newX) {this.pos[0] = newX;}

    get y() {return this.pos[1];}
    set y(newY) {this.pos[1] = newY;}

    move() {
      if (this.dir == 0) {
        this.y -= 40;
      }
      else if (this.dir == 1) {
        this.x += 40;
      }
      else if (this.dir == 2) {
        this.y += 40;
      }
      else if (this.dir == 3) {
        this.x -= 40;
      }
    }

    checkBounds() {
      if (this.x >= canvas.width) {
        this.pos = [160, 160];
        this.dir = 0;
        console.log("X bound + (right) collision")
        snek.len = 1;
        pause();
      }
      else if (this.x < 0) {
        this.pos = [160, 160];
        this.dir = 0;
        console.log("X bound - (left) collision")
        pause();
        snek.len = 1;
      }
      else if (this.y >= canvas.height) {
        this.pos = [160, 160];
        this.dir = 0;
        console.log("Y bound + (down) collision")
        pause();
        snek.len = 1;
      }
      else if (this.y < 0) {
        this.pos = [160, 160];
        this.dir = 0;
        console.log("Y bound - (up) collision")
        pause();
        snek.len = 1;
      }
    }
}

class Apple {
  constructor() {
    this.pos = [-40, -40];
    this.color = "#ff0000";
  }

  get x() {return this.pos[0];}
  set x(newX) {this.pos[0] = newX;}

  get y() {return this.pos[1];}
  set y(newY) {this.pos[1] = newY;}

  checkCollision() {
    if (snek.x == this.x && snek.y == this.y) {
      snek.len += 1;
      console.log("Apple collected at %s len: %d", this.pos, snek.len);
      this.spawn();
    }
  }

  spawn() {
    this.x = Math.floor(Math.random() * (canvas.width / 40)) * 40;
    this.y = Math.floor(Math.random() * (canvas.height / 40)) * 40;
    console.log("Apple spawned at " + this.pos);
  }
}

function pause() {
  if (playing % 2 == 1) {
    ctx.font = "30px Arial";
    ctx.strokeText("Paused", canvas.width / 2, canvas.height / 2);
    console.log("Execution paused");
  }
  else {
    console.log("Execution unpaused");
  }
  playing += 1;
}

function drawAll() {
  // Clear screen for new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw apple
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x, apple.y, 40, 40);
  ctx.stroke();

  // Draw snek
  ctx.fillStyle = snek.color;
  ctx.fillRect(snek.x, snek.y, 40, 40);
  ctx.stroke();

  // Draw score box
  ctx.strokeStyle = snek.color;
  ctx.rect(0, 0, 110, 30);
  ctx.stroke();

  //Draw score
  ctx.font = "20px Cursive";
  ctx.fillText("Score: " + snek.len, 5, 20);
  ctx.stroke();
}

function setUpContext() {
  canvas = document.getElementById("mainCanvas");
  canvas.width = window.innerWidth - (window.innerWidth % 40);
  canvas.height = window.innerHeight - (window.innerHeight % 40);
  console.log("Window is %d by %d", window.innerWidth, window.innerHeight);
  console.log("Canvas is %d by %d", canvas.width, canvas.height);

  canvas.style.border = "1px solid black";

  ctx = canvas.getContext("2d");
  return ctx;
}

function keypress(event) {
  keyStr = event.key;
  if ((playing % 2 == 0 && ["w", "a", "s", "d"].includes(keyStr))|| keyStr == 'Escape') {
    console.log("Manual pause triggered");
    pause();
  }
  else if (keyStr == 'w') {
    snek.dir = 0;
  }
  else if (keyStr == 'd') {
    snek.dir = 1;
  }
  else if (keyStr == 's') {
    snek.dir = 2;
  }
  else if (keyStr == 'a') {
    snek.dir = 3;
  }
}
