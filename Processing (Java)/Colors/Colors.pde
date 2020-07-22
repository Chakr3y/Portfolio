boolean fwd = true;
int flux = 16;
float increment = 0.01;
float zoff = 0.0;
int z = 0;

void setup() {
  fullScreen();
  noCursor();
  frameRate(120);
}

void draw() {
  noiseDetail(10, 0.6);
  
  loadPixels();
  float xoff = 0.0;
  for (int x = 0; x < width; x++) {
    xoff += increment;
    float yoff = 0.0;
    for (int y = 0; y < height; y++) {
      yoff += increment;
      float noise = noise(xoff, yoff, zoff);
      noise = map(noise, 0, 1, -flux, flux);
      
      pixels[x+y*width] = color(x*256/width + noise, y*256/height + noise, z + noise);
      //pixels[x+y*width] = color(noise, noise, noise);
    }
  }
  updatePixels();
  zoff += 0.05;
  
  if (z == 0 || z == 255) {
    fwd = !fwd;
    println("yeet");
  }
  
  if (fwd) {
    z += 1;
  } else {
    z -= 1;
  }
}
