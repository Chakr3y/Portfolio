function setup() {
  let canvas = createCanvas(400, 400);
}

function draw() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      stroke(i, j, frameCount%256);
      point(i, j);
    }
  }
}
