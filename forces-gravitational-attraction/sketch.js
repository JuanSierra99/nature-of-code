let attractor;
let mover;
let G = 1.0; // gravitational constant

class Atractor {
  constructor(mass = 20) {
    this.mass = mass;
    this.position = createVector(width/2, width/2);
  }

  show() {
    stroke(0);
    fill(0, 0, 0);
    circle(this.position.x, this.position.y, this.mass);
  }

  attract(mover) {
    // Vector from obj1 to obj2
    let force = p5.Vector.sub(this.position, mover.position);
    // get length scalar
    let distance = force.mag();
    // set limits on min/max distances
    distance = constrain(distance, 5, 25);
    // calculate attraction force
    let strength = (G * this.mass * mover.mass) / (distance ** 2);
    force.setMag(strength);
    return force;
  }
}

class Mover {
  constructor(mass = 10) {
    this.mass = mass;
    this.position = createVector(100, 100);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  show() {
    stroke(0);
    fill(255, 0, 0);
    circle(this.position.x, this.position.y, this.mass);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
  }
}

function setup() {
  createCanvas(450, 450);
  attractor = new Atractor(50);
  mover = new Mover(30);
}

function draw() {
  background(220, 220, 220, 1);
  mover.applyForce(attractor.attract(mover))
  mover.update();
  attractor.show();
  mover.show();
}
