var b2Vec2 = Box2D.Common.Math.b2Vec2, 
  b2AABB = Box2D.Collision.b2AABB, 
  b2BodyDef = Box2D.Dynamics.b2BodyDef, 
  b2Body = Box2D.Dynamics.b2Body, 
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
  b2Fixture = Box2D.Dynamics.b2Fixture, 
  b2World = Box2D.Dynamics.b2World, 
  b2MassData = Box2D.Collision.Shapes.b2MassData, 
  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, 
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, 
  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

var world;
let boxes = [];
let ground = [];

function setup() {
  var canvas = createCanvas(400, 400);
  
  var gravity = new b2Vec2(0, 20);
  var doSleep = true;
  world = new b2World(gravity, doSleep);
  
  ground.push(new Boundary(createVector(width/2, height-(height/32)), createVector(width, height/16)));
}

function draw() {
  background(50);
  world.Step(1/30, 10, 10);
  
  for (let i = 0; i < ground.length; i++) {
    ground[i].display();
  }
  
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    let box = new Box(mouseX, mouseY, color(random(0, 255), random(0, 255), random(0, 255)));
    boxes.push(box);
  } else if (mouseButton === LEFT) {
    
  }
}
