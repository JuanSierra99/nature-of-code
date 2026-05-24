function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  const center = createVector(width / 2, height / 2);
  const mouse = createVector(mouseX, mouseY);

  stroke(150);
  strokeWeight(4);
  line(center.x, center.y, mouse.x, mouse.y);
  
  mouse.sub(center);
  mouse.normalize();
  mouse.mult(50);
  stroke(0);
  strokeWeight(6);
  translate(center.x, center.y);
  line(0, 0, mouse.x, mouse.y);
}
