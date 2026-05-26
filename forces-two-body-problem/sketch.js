const G = 1; // Gravitational Constant
let body1;
let body2;

class Body {
  constructor(mass = 15, position, velocity) {
    this.position =
      position ?? createVector(random(0, width), random(0, height));
    this.velocity = velocity ?? createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
  }

  show() {
    stroke('violet');
    fill('blue');
    circle(this.position.x, this.position.y, this.mass);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  attract(body) {
    //get distance between both bodies
    const force = p5.Vector.sub(this.position, body.position);
    // get length
    let distance = force.mag();
    // set limits, also helps prevent dividing by zero
    distance = constrain(distance, 10, 25);
    // calculate force strenght
    const strength = (G * this.mass * body.mass) / distance ** 2;
    force.setMag(strength);
    return force;
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);
  const body1InitVel = createVector(3, 0);
  const body2InitVel = createVector(-3, 0);
  const body1InitPos = createVector(width / 2, 100);
  const body2InitPos = createVector(width / 2, 300);
  body1 = new Body(40, body1InitPos, body1InitVel);
  body2 = new Body(40, body2InitPos, body2InitVel);
}

function draw() {
  background(220, 220, 220, 3);
  body1.show();
  body2.show();
  const body1AttractionForce = body1.attract(body2);
  const body2AttractionForce = body2.attract(body1);
  body2.applyForce(body1AttractionForce);
  body1.applyForce(body2AttractionForce);
  body2.update();
  body1.update();
}
