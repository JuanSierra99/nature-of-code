let position;
let velocity;

function setup() {
  createCanvas(400, 400);
  position = createVector(0, 0);
  velocity = createVector(2.5, 3);
}

function draw() {
  background(30);
  position.add(velocity);
  stroke(0);
  fill(100, 100, 255);

  if (position.x >= 400 || position.x <= 0) {
    velocity.x *= -1;
  }
  if (position.y >= 400 || position.y <= 0) {
    velocity.y *= -1;
  }
  circle(position.x, position.y, 50);
}
