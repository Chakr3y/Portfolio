var NeuralNet = function() {
  this.node = function() {
    this.position = createVector();
    this.value = 0;
    this.connections = [];
    
    this.display = function() {
      push();
      fill(this.value);
      circle(this.position.x, this.position.y, 20);
      pop();
    };
    
    this.trigger = function() {
      for (let i = 0; i < this.connections.length; i++) {
        
      }
    };
  };
  
  this.connection = function(n1, n2, w) {
    this.n1 = n1;
    this.n2 = n2;
    this.weight = w;
    
    this.display = function() {
      push();
      strokeWeight(this.weight);
      line(this.n1.position.x+20, this.n1.position.y, this.n2.position.x-20, this.n2.position.y);
      pop();
    };
  };
  
  this.inputs = [];
  this.outputs = [];
  this.bias = 0;
};

var Input = function() {
  
};

var inputs = [];

var n;

function setup() {
  var canvas = createCanvas(400, 800);
  n = new NeuralNet();
}

function draw() {
  background(255, 255, 255);
  
}
