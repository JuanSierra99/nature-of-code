const G = 1; // Gravitational Constant
let bodies = [];

class Body {
  constructor(
    mass = 15,
    position = createVector(random(0, width), random(0, height)),
    velocity = createVector(0, 0),
  ) {
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = createVector(0, 0);
  }

  show() {
    stroke("blue");
    fill("red");
    circle(this.position.x, this.position.y, this.mass);
  }

  update() {
    this.velocity.add(this.acceleration);
    // this.velocity.limit(5)
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  mouseAttract() {
    const mousePos = createVector(mouseX, mouseY);
    const force = p5.Vector.sub(mousePos, this.position);
    let distance = force.mag();
    distance = constrain(distance, 10, 30);
    // set an arbitrary mass for mouse pos
    const strength = (G * this.mass * 100) / distance ** 2;
    force.setMag(strength);
    return force;
  }

  repel(body) {
    const force = p5.Vector.sub(body.position, this.position);
    let distance = constrain(force.mag(), 10, 50);
    const strength = (G * this.mass * body.mass) / distance ** 2;
    force.setMag(strength);
    return force;
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);
  const body1InitPos = createVector(100, 100);
  const body2InitPos = createVector(300, 100);
  const body3InitPos = createVector(300, 300);
  const body4InitPos = createVector(100, 300);
  const body1InitVel = createVector(1, 0);
  const body2InitVel = createVector(0, 1);
  const body3InitVel = createVector(-1, 0);
  const body4InitVel = createVector(0, -1);
  const body1 = new Body(40, body1InitPos, body1InitVel);
  const body2 = new Body(40, body2InitPos, body2InitVel);
  const body3 = new Body(40, body3InitPos, body3InitVel);
  const body4 = new Body(40, body4InitPos, body4InitVel);
  bodies.push(body1, body2, body3, body4);
}

function draw() {
  background(220, 10);
  stroke("black")
  fill(0)
  textSize(20)
  text("Hold Mouse Down To Attract", 10, 20)
  for (let i = 0; i < bodies.length; i++) {
    if (mouseIsPressed) {
      const attractionForce = bodies[i].mouseAttract();
      bodies[i].applyForce(attractionForce);
      continue;
    } else {
      for (let j = 0; j < bodies.length; j++) {
        if (i === j) continue;
        const repulsionForce = bodies[i].repel(bodies[j]);
        bodies[j].applyForce(repulsionForce);
      }
    }

    // bodies[i].update(); CAN'T DO THIS! MAKES SIMULATION ORDER DEPENDENT!!!
  }

  bodies.forEach((body) => {
    body.update(); // can't be in same loop as force calculations
    body.show();
  });
}
