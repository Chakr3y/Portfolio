const sprites = {
  "white": {
    "king": "./sprites/white/whiteKing.png", 
    "queen": "./sprites/white/whiteQueen.png", 
    "rook": "./sprites/white/whiteRook.png", 
    "bishop": "./sprites/white/whiteBishop.png", 
    "knight": "./sprites/white/whiteKnight.png", 
    "pawn": "./sprites/white/whitePawn.png",
  }, 
  "black": {
    "king": "./sprites/black/blackKing.png", 
    "queen": "./sprites/black/blackQueen.png", 
    "rook": "./sprites/black/blackRook.png", 
    "bishop": "./sprites/black/blackBishop.png", 
    "knight": "./sprites/black/blackKnight.png", 
    "pawn": "./sprites/black/blackPawn.png",
  },
};
const tiles = [];

function Pawn(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.occuaption = null;
  this.selected = false;
  this.moved = false;
  this.jump = null;//Start move (2 tile move)
  
  this.moves = {
    attacks: [
      createVector(this.position.x + width/8, this.position.y + height/8),
      createVector(this.position.x - width/8, this.position.y + height/8),
    ],
    
    moves: [
      createVector(this.position.x, this.position.y + width/8),
    ],
  };
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.pawn);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.pawn);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  this.move = function() {
    
  };
}

function Rook(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.selected = false;
  this.occuaption = null;
  this.moved = false;
  
  this.moves = {};
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.rook);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.rook);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  
}

function Bishop(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.occuaption = null;
  this.selected = false;
  
  this.moves = {};
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.bishop);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.bishop);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  
}

function Knight(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.occuaption = null;
  this.selected = false;
  
  this.moves = {};
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.knight);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.knight);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  
}

function Queen(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.occuaption = null;
  this.selected = false;
  
  this.moves = {};
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.queen);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.queen);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  
}

function King(position, size, team) {
  this.position = position.copy();
  this.aposition = position.copy();
  this.size = size.copy();
  this.occuaption = null;
  this.selected = false;
  this.moved = false;
  this.checked = false;
  
  this.moves = {};
  
  if (team == "white") {
    this.sprite = loadImage(sprites.white.king);
  } else if (team == "black") {
    this.sprite = loadImage(sprites.black.king);
  }
  
  this.display = function() {
    image(this.sprite, this.position.x, this.position.y, this.size.x, this.size.y);
  };
  
  this.update = function() {
    if (this.checked) {
      this.occupation.c = color(255, 0, 0);
    }
  };
}
