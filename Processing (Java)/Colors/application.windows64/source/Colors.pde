void setup() {
  size(400, 400);
  surface.setResizable(true);
  noCursor();
}

void draw() {
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      pushMatrix();
      stroke(i*256/width, j*256/height, frameCount%64*4);
      point(i, j);
      popMatrix();
    }
  }
  println(frameRate);
}
