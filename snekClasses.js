class Snek {
    constructor(x, y) {
      this.pos = [x, y];
      this.color = "#00ff00";
    }
    get x() {return this.pos[0];}
    set x(newX) {this.pos[0] = newX;}

    get y() {return this.pos[1];}
    set y(newY) {this.pos[1] = newY;}

    draw() {
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, 40, 40);
      ctx.stroke();
    }

    moveUp() {
      snek.y -= 5
    }

    moveDown() {
      snek.y += 5
    }

    moveLeft() {
      snek.x -= 5
    }

    moveRight() {
      snek.x += 5
    }
}

function setUpContext() {
  console.log("Window is %d by %d", window.innerWidth, window.innerHeight);
  canvas = document.getElementById("mainCanvas");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  canvas.style.border = "1px solid black";

  ctx = canvas.getContext("2d");
  return ctx;
}

function myKeyDown (event) {
  keyCode = event.which;
  keyStr = event.key;
  console.log(keyStr);

  if (keyStr == 'w') {
    snek.moveUp()
  }
  if (keyStr == 'a') {
    snek.moveLeft()
  }
  if (keyStr == 's') {
    snek.moveDown()
  }
  if (keyStr == 'd') {
    snek.moveRight()
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snek.draw();
}
