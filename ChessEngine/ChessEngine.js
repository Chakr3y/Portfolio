var game;
var whitePieces = new Array([], [], [], [], [], []);
var blackPieces = new Array([], [], [], [], [], []);

const pawn = 0;
const rook = 1;
const bishop = 2;
const knight = 3;
const queen = 4;
const king = 5;

function setup() {
  var canvas = createCanvas(400, 400);
  game = new Game();
  noStroke();
  
  //Board setup
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      tiles.push(new Tile(createVector((i*width/8), (j*height/8)), i, j));
    }
  }
  
  
  //Piece setup
  for (let i = 0; i < 8; i++) {//Pawns
    whitePieces[pawn].push(new Pawn(createVector(i*width/8, 6*height/8), createVector(width/8, height/8), "white"));
    blackPieces[pawn].push(new Pawn(createVector(i*width/8, height/8), createVector(width/8, height/8), "black"));
    
    if (i == 0 || i == 7) {//Rooks
      whitePieces[rook].push(new Rook(createVector(i*width/8, 7*height/8), createVector(width/8, height/8), "white"));
      blackPieces[rook].push(new Rook(createVector(i*width/8, 0), createVector(width/8, height/8), "black"));
    } else if (i == 2 || i == 5) {//Bishops
      whitePieces[bishop].push(new Bishop(createVector(i*width/8, 7*height/8), createVector(width/8, height/8), "white"));
      blackPieces[bishop].push(new Bishop(createVector(i*width/8, 0), createVector(width/8, height/8), "black"));
    } else if (i == 1 || i == 6) {//Knights
      whitePieces[knight].push(new Knight(createVector(i*width/8, 7*height/8), createVector(width/8, height/8), "white"));
      blackPieces[knight].push(new Knight(createVector(i*width/8, 0), createVector(width/8, height/8), "black"));
    } else if (i == 3) {//Queens
      whitePieces[queen].push(new Queen(createVector(i*width/8, 7*height/8), createVector(width/8, height/8), "white"));
      blackPieces[queen].push(new Queen(createVector(i*width/8, 0), createVector(width/8, height/8), "black"));
    } else if (i == 4) {//Kings
      whitePieces[king].push(new King(createVector(i*width/8, 7*height/8), createVector(width/8, height/8), "white"));
      blackPieces[king].push(new King(createVector(i*width/8, 0), createVector(width/8, height/8), "black"));
    }
  }
}

function draw() {
  for (let i = 0; i < tiles.length; i++) {//Update board
    tiles[i].display();
    tiles[i].update();
  }
  
  for (let i = 0; i < 8; i++) {//Display white pieces
    if (i < whitePieces[pawn].length) {
      whitePieces[pawn][i].display();
      //whitePieces[pawn][i].update();
    }
    
    if (i < whitePieces[rook].length) {
      whitePieces[rook][i].display();
    }
    
    if (i < whitePieces[bishop].length) {
      whitePieces[bishop][i].display();
    }
    
    if (i < whitePieces[knight].length){
      whitePieces[knight][i].display();
    }
    
    if (i < whitePieces[queen].length){
      whitePieces[queen][i].display();
    }
    
    if (i == 0){
      whitePieces[king][i].display();
    }
  }
  
  for (let i = 0; i < 8; i++) {//Display black pieces
    if (i < blackPieces[pawn].length) {
      blackPieces[pawn][i].display();
      //blackPieces[pawn][i].update();
    }
    
    if (i < blackPieces[rook].length) {
      blackPieces[rook][i].display();
    }
    
    if (i < blackPieces[bishop].length) {
      blackPieces[bishop][i].display();
    }
    
    if (i < blackPieces[knight].length){
      blackPieces[knight][i].display();
    }
    
    if (i < blackPieces[queen].length){
      blackPieces[queen][i].display();
    }
    
    if (i == 0){
      blackPieces[king][i].display();
    }
  }
  
  game.update();
}

function Game() {
  this.move = "white";
  this.moving = false;
  
  this.update = function() {
    if (this.move == "white") {
      for (let i = 0; i < whitePieces.length; i++) {
        this.moving = whitePieces[i].some(function(piece) {
          return piece.selected;
        });
      }
    } else if (this.move == "black") {
      for (let i = 0; i < blackPieces.length; i++) {
        this.moving = blackPieces[i].some(function(piece) {
          return piece.selected;
        });
      }
    }
  };
}
