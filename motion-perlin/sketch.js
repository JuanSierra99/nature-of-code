let tx = 0;
let ty = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 200, 200, 10);
  let nx = noise(tx);
  let ny = noise(ty);
  let x = map(nx, 0, 1, 0, windowWidth);
  let y = map(ny, 0, 1, 0, windowHeight);
  noStroke();
  fill("blue");
  circle(x, y, 100);
  tx += 0.005;
  ty += 0.005;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
