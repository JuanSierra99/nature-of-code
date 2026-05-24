const multInput = document.getElementById("mult");
const displayValue = document.getElementById("display-value")
let mult = 0.5

multInput.addEventListener('input', (e) => {
  mult = parseFloat(e.target.value);
  displayValue.textContent = "Value: " + mult;
})

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  stroke("#252422");
  strokeWeight(20)
  line(0, 0, (windowWidth / 2), (windowHeight / 2))
  stroke("#eb5e28")
  strokeWeight(4)
  line(0, 0, (windowWidth / 2) * mult, (windowHeight / 2) * mult)
}
