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
      //ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, 40, 40);
      ctx.stroke();
    }

    move(newDirection) {
      if (newDirection == 0) {
        this.y -= 40;
        this.heading = 0
      }
      else if (newDirection == 1) {
        this.x += 40;
        this.heading = 1
      }
      else if (newDirection == 2) {
        this.y += 40;
        this.heading = 2
      }
      else if (newDirection == 3) {
        this.x -= 40;
        this.heading = 3
      }
    }

    checkPosition() {
      if (this.x >= canvas.width | this.x < 0) {
        this.pos = [160, 160];
        console.log("X bound respawn")
      }

      else if (this.y >= canvas.height | this.y < 0) {
        this.pos = [160, 160];
        console.log("Y bound respawn")
      }
    }
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
  keyCode = event.which;
  keyStr = event.key;

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
  console.log(snek.pos);
  snek.checkPosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}
