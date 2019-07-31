//Define Box2D packages
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
  b2JointDef = Box2D.Dynamics.Joints.b2JointDef, 
  b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef, 
  b2Joint = Box2D.Dynamics.Joints.b2Joint, 
  b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint;

var world;
let boxes = [];
let ground = [];
var offsetX = 0;
var offsetY = 0;

function setup() {
  var canvas = createCanvas(600, 400);
  var shifted = false;
  rectMode(CENTER);
  ellipseMode(RADIUS);
  var mj = false;
  
  //World setup
  var gravity = new b2Vec2(0, 20);
  var doSleep = true;
  world = new b2World(gravity, doSleep);
  
  //Create some ground
  ground.push(new Boundary(createVector(width/2, height-(height/32)), createVector(width, height/16), 0));
}

function draw() {
  background(50);//Background
  translate(offsetX, offsetY);//Translate everything by our scroll offset
  world.Step(1/30, 10, 10);//Make Box2D move forward in time
  
  //Scrolling mechanism
  if (keyIsDown(SHIFT)) {
    if (shifted) {
      var a = createVector(pmouseX, pmouseY);
      var b = createVector(mouseX, mouseY);
      offsetX += b.x - a.x;
      offsetY += b.y - a.y;
    } else {
      shifted = true;
    }
  } else {
    shifted = false;
  }
  
  //Display stuff
  for (let i = 0; i < ground.length; i++) {
    ground[i].display();
  }
  
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
  
  /*if (mj) {
    let target = mj.GetTarget();
    line(mouseX, mouseY, target.x, target.y);
  }*/
}

function mousePressed() {
  if (mouseButton === RIGHT) {//Make new boxes
    let box = new Box(createVector(mouseX-offsetX, mouseY-offsetY), color(random(0, 255), random(0, 255), random(0, 255)));
    boxes.push(box);
  } else if (mouseButton === LEFT) {//Drag stuff around
    for (let i = 0; i < boxes.length; i++) {
      /*if (((mouseX-offsetX)/10 >= 0 || (mouseX-offsetX)/10 < 0) && ((mouseY-offsetY)/10 || (mouseY-offsetY)/10)) {
        let mjd = new b2MouseJointDef();
        mjd.dampingRatio = 0.9;
        mjd.frequencyHz = 5;
        mjd.maxForce = 1000*body.GetMass();
        mjd.target.Set(mouseX, mouseY);
        
        mj = world.CreateJoint(mjd);
      }*/
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT && mj) {
    world.DestroyJoint(mj);
    mj = false;
  }
}
