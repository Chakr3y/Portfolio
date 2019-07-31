function Tile(position, i, j) {
  this.position = position.copy();
  this.area = position.add(createVector(width/8, height/8));
  this.occupant = null;
  
  if ((i%2 == 1 && j%2 == 0) || (i%2 == 0 && j%2 == 1)) {
    this.c = color("#124D00");
  } else {
    this.c = color(255, 255, 255);
  }
  this.pc = color(this.c);
  
  this.display = function() {
    push();
    fill(this.c);
    rect(this.position.x, this.position.y, width/8, height/8);
    pop();
  };
  
  this.update = function() {
    for (let i = 0; i < whitePieces.length; i++) {
      for (let j = 0; j < whitePieces[i].length; j++) {
        if (this.position.equals(whitePieces[i][j].aposition)) {
          this.occupant = whitePieces[i][j];
          whitePieces[i][j].occupation = this;
        }
      }
    }
    
    for (let i = 0; i < blackPieces.length; i++) {
      for (let j = 0; j < blackPieces[i].length; j++) {
        if (this.position.equals(blackPieces[i][j].aposition)) {
          this.occupant = blackPieces[i][j];
          blackPieces[i][j].occupation = this;
        }
      }
    }
    
    if (this.occupant) {
      if (mouseIsPressed) {
        if (mouseX >= this.position.x && mouseX < this.area.x && mouseY >= this.position.y && mouseY < this.area.y) {
          this.occupant.selected = true;
          this.c = color(0, 0, 0);
        } else {
          this.occupant.selected = false;
          this.c = this.pc;
        }
      } else {
        this.occupant.selected = false;
        this.c = this.pc;
      }
    }
  };
}
