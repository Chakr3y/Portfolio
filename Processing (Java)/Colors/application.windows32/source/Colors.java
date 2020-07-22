import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class Colors extends PApplet {

public void setup() {
  
  surface.setResizable(true);
  noCursor();
}

public void draw() {
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
  public void settings() {  size(400, 400); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Colors" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
