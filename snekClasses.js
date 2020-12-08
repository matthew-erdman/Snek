class Snek {
    constructor(x, y) {
      this.pos = [x, y];
      this.color = "#00ff00";
      this.direction = 0
    }
    get x() {return this.pos[0];}
    set x(newX) {this.pos[0] = newX;}

    get y() {return this.pos[1];}
    set y(newY) {this.pos[1] = newY;}

    get heading() {
      if (this.direction == 0) {
        return "Facing up";
      }
      else if (this.direction == 1) {
        return "Facing right";
      }
      else if (this.direction == 2) {
        return "Facing down";
      }
      else if (this.direction == 3) {
        return "Facing left";
      }
    }
    set heading(newDirection) {
      this.direction = newDirection;
    }

    draw() {
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, 40, 40);
      ctx.stroke();
    }

    move(newDirection) {
      if (newDirection == 0) {
        this.y -= 41;
        this.heading = 0
      }
      else if (newDirection == 1) {
        this.x += 41;
        this.heading = 1
      }
      else if (newDirection == 2) {
        this.y += 41;
        this.heading = 2
      }
      else if (newDirection == 3) {
        this.x -= 41;
        this.heading = 3
      }
    }

    checkPosition() {
      if (this.x > window.innerWidth - 0 | this.x < 0) {
        this.pos = [250, 250];
      }

      else if (this.y > window.innerHeight - 0 | this.y < 0) {
        this.pos = [250, 250];
      }
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

function keypress(event) {
  keyCode = event.which;
  keyStr = event.key;
  console.log(keyStr);

  if (keyStr == 'w') {
    snek.move(0);
  }
  if (keyStr == 'd') {
    snek.move(1);
  }
  if (keyStr == 's') {
    snek.move(2);
  }
  if (keyStr == 'a') {
    snek.move(3);
  }

  snek.checkPosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snek.draw();

}
