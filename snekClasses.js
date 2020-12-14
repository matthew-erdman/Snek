class Snek {
    constructor(x, y) {
      this.pos = [x, y];
      this.color = "#00c000";
      this.direction = 0
    }
    get x() {return this.pos[0];}
    set x(newX) {this.pos[0] = newX;}

    get y() {return this.pos[1];}
    set y(newY) {this.pos[1] = newY;}

    move() {
      if (this.direction == 0) {
        this.y -= 40;
      }
      else if (this.direction == 1) {
        this.x += 40;
      }
      else if (this.direction == 2) {
        this.y += 40;
      }
      else if (this.direction == 3) {
        this.x -= 40;
      }
    }

    checkBounds() {
      if (this.x >= canvas.width) {
        this.pos = [160, 160];
        this.direction = 0;
        console.log("X bound + respawn")
        playing = false;
      }
      else if (this.x < 0) {
        this.pos = [160, 160];
        this.direction = 0;
        console.log("X bound - respawn")
        playing = false;
      }
      else if (this.y >= canvas.height) {
        this.pos = [160, 160];
        this.direction = 0;
        console.log("Y bound + respawn")
        playing = false;
      }
      else if (this.y < 0) {
        this.pos = [160, 160];
        this.direction = 0;
        console.log("Y bound - respawn")
        playing = false;
      }
    }
}

class Apple {
  constructor() {
    this.pos = [320, 320];
    this.color = "#ff0000";
  }

  get x() {return this.pos[0];}
  set x(newX) {this.pos[0] = newX;}

  get y() {return this.pos[1];}
  set y(newY) {this.pos[1] = newY;}

  checkCollision() {
    console.log(snek.pos, this.pos)
    if (snek.x == this.x && snek.y == this.y) {
      console.log("apple")
      this.spawn();
    }
  }

  spawn() {
    this.x = Math.floor(Math.random() * (canvas.width / 40)) * 40;
    this.y = Math.floor(Math.random() * (canvas.height / 40)) * 40;
  }
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = snek.color;
  ctx.fillRect(snek.x, snek.y, 40, 40);
  ctx.stroke();
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x, apple.y, 40, 40);
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
  if (keyStr == 'w') {
    snek.direction = 0;
  }
  if (keyStr == 'd') {
    snek.direction = 1;
  }
  if (keyStr == 's') {
    snek.direction = 2;
  }
  if (keyStr == 'a') {
    snek.direction = 3;
  }
  if (keyStr == 'Escape') {
    playing = false;
  }
}
