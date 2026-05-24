function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  let center = createVector(windowWidth / 2, windowHeight / 2);
  let mouse = createVector(mouseX, mouseY);
  stroke(150);
  strokeWeight(4);
  line(0, 0, center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
  mouse.sub(center);
  stroke(0, 0, 255);
  translate(windowWidth / 2, windowHeight / 2);
  line(0, 0, mouse.x, mouse.y);
}
