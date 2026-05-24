let movers = []
let liquid;

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw() {
    fill(0, 0, 0, 100);
    rect(this.x, this.y, this.w, this.h);
  }

  contains(mover) {
    let pos = mover.pos;
    return (
      pos.x > this.x &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h
    );
  }

  calculateDrag(mover) {
    let speed = mover.vel.mag()
    let dragMagnitude = this.c * speed * speed
    let dragForce = mover.vel.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }
}

class Mover {
  pos = createVector(0, 0);
  vel = createVector(0, 0);
  acc = createVector(0, 0);
  gravity = createVector(0, 0.05);
  mass = 1;

  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
  }

  show() {
    fill(0);
    circle(this.pos.x, this.pos.y, 50);
  }

  update() {
    const gravA = p5.Vector.mult(this.gravity, this.mass);
    this.applyForce(gravA);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  movers.push(new Mover(0 + 50, 0, 2));
  movers.push(new Mover(width - 50, 0, 3));
  liquid = new Liquid(0, height - 200, width, 200, 0.4);
}

function draw() {
  background(220);
  for(const m of movers) {
    if(liquid.contains(m)) {
    const drag = liquid.calculateDrag(m)
    m.applyForce(drag)
  }
  m.show();
  m.update();
  }
  liquid.draw();
}
