class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(-0.03, 0);
  }

  update() {
    if (keyIsPressed) {
      this.velocity.add(this.acceleration);
    } else {
      this.velocity.mult(0.99);
      if (this.velocity.mag() < 0.15) {
        this.velocity.set(0, 0);
      }
    }
    this.velocity.limit(15);
    this.position.add(this.velocity);
  }

  draw() {
    textSize(100);
    text("🏎️", this.position.x, this.position.y);
  }

  checkBounds() {
    if (this.position.x < 0 - 100) {
      this.position.x = width;
    } else if (this.position.x > width + 100) {
      this.position.x = 0;
    }
  }
}

let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Mover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  car.update();
  car.checkBounds();
  car.draw();
  textSize(20);
  text("velocity: " + Math.round(car.velocity.mag() * 10) / 10, 10, 30);
  text("press any key to move the car", 10, 70);
}
