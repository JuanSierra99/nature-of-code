let littleRed;
let littleBlue;
const particles = [];

class Mover {
  constructor(x = width / 2, y = height / 2, mass = 5, color = "red") {
    this.color = color;
    this.mass = mass;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
  }

  mouseForce() {
    let mouse = createVector(mouseX, mouseY);
    mouse.sub(this.position);
    let mag = mouse.mag();
    mouse.normalize();
    let strength = mag > 0 ? constrain(5000 / (mag * mag), 0.05, 1) : 0;
    let mouseForce = mouse.mult(mouseIsPressed ? -strength : 0);
    this.applyForce(mouseForce);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    fill(this.color);
    stroke(this.color);
    circle(this.position.x, this.position.y, this.mass * 5);
  }

  checkEdges() {
    const axisArray = ["x", "y"];
    for (const a of axisArray) {
      const canvasUpperBound = a === "x" ? width : height;
      if (this.position[a] <= 0 || this.position[a] >= canvasUpperBound) {
        this.position[a] = constrain(this.position[a], 0, canvasUpperBound);
        this.velocity[a] *= -0.2;
        this.acceleration[a] *= -1;
      }
      const axis =
        this.position[a] > canvasUpperBound / 2 ? canvasUpperBound : 0;
      const edge =
        a === "x"
          ? createVector(axis, this.position.y)
          : createVector(this.position.x, axis);

      edge.sub(this.position);
      const mag = edge.mag();
      edge.normalize();
      edge.mult(100);
      const strength = mag > 0 ? constrain(200 / (mag * mag), 0, 0.01) : 0;
      const edgeForce = edge.mult(-strength);
      this.applyForce(edgeForce);
    }
  }

  showDirection() {
    const direction = this.velocity.copy();
    direction.normalize();
    direction.mult(50);
    strokeWeight(5);
    stroke(0);
    line(
      this.position.x,
      this.position.y,
      this.position.x + direction.x,
      this.position.y + direction.y
    );
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  littleRed = new Mover(10, 10, 15, "red");
  littleBlue = new Mover(width - 10, 0 + 10, 5, "blue");
  particles[0] = littleRed;
  particles[1] = littleBlue;
}

function draw() {
  background(200, 200, 200, 150);
  strokeWeight(0);
  text(
    "Tip: Hold mouse down near a particle to apply a repelling force.",
    10,
    30
  );
  text("Do you notice how the particles mass affects force ?", 10, 50);
  for (const particle of particles) {
    particle.mouseForce();
    particle.checkEdges();
    particle.showDirection();
    particle.update();
    particle.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
