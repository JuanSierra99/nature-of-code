let mover;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mover = new Mover();
}

function draw() {
  let x = noise(t);
  let force = map(x, 0, 1, 0, 0.05);
  background(220);
  text("y-position: " + Math.round(mover.position.y), 50, 50);
  text("y-velocity: " + mover.velocity.y, 50, 75);
  text("force: " + force, 50, 100);
  mover.show();
  mover.applyForce(-force);
  mover.checkBounds();
  mover.update();
  t += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Mover {
  constructor() {
    this.diameter = 50;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(width / 2, height - 50);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke("red");
    fill("red");
    circle(this.position.x, this.position.y, this.diameter);
  }

  applyForce(force) {
    let wind = createVector(0, force);
    this.acceleration.add(wind);
  }

  checkBounds() {
    if (this.position.x >= width) {
      this.position.x = width;
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y >= height) {
      this.position.y = height;
      this.velocity.y *= -1;
    }
    if (this.position.x <= 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity.y *= -0.25;
    }
  }
}
