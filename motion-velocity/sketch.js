class Mover {
  diameter = 50;
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-3, 3), random(-3, 3));
  }

  update() {
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    fill(0);
    circle(this.position.x, this.position.y, this.diameter);
  }

  checkBounds() {
    if (this.position.x < -this.diameter) {
      this.position.x = width;
    } else if (this.position.x > width + this.diameter) {
      this.position.x = 0;
    }

    if (this.position.y > height + this.diameter) {
      this.position.y = 0;
    } else if (this.position.y < -this.diameter) {
      this.position.y = height;
    }
  }
}

let mover;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mover = new Mover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  mover.update();
  mover.checkBounds();
  mover.show();
}
