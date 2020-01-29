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
  b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef, 
  b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef, 
  b2Joint = Box2D.Dynamics.Joints.b2Joint, 
  b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint, 
  b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint, 
  b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;

var canvas;

var world; //Box2D world
var tool; //Selected tool
let boxes = []; //Boxes
let bounds = []; //Static bodies
var offsetX = 0; //X offset for scrolling
var offsetY = 0; //Y offset for scrolling
var worldMouse; //Position of mouse in world
var mj; //Mouse joint for dragging

//Visual settings
var disAABB = true;

function setup() {
  canvas = createCanvas(600, 400);
  var shifted = false;
  worldMouse = createVector();
  rectMode(CENTER);
  
  //World setup
  var gravity = new b2Vec2(0, 20);
  var doSleep = true;
  world = new b2World(gravity, doSleep);
  
  //Create some ground
  bounds.push(new Boundary(createVector(width/2, height-(height/32)), createVector(width, height/16), 0));
}

function draw() {
  background(50);//Background
  translate(offsetX, offsetY);//Translate everything by our scroll offset
  worldMouse.x = mouseX-offsetX;
  worldMouse.y = mouseY-offsetY;
  world.Step(1/30, 10, 10);//Make Box2D move forward in time
  
  //Tool selection
  if (keyCode == 68) {//D rag
    tool = "drag";
  } else if (keyCode == 66) {//B ox
    tool = "box";
  } else {
    tool = tool;
  }
  
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
  for (let i = 0; i < bounds.length; i++) {
    bounds[i].display();
    if (disAABB) {
      bounds[i].displayAABB();
    }
  }
  
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
    if (disAABB) {
      boxes[i].displayAABB();
    }
  }
  
  //Update & Display mouse joint
  if (mj) {
    let target = mj.GetTarget();
    line(worldMouse.x, worldMouse.y, target.x*10, target.y*10);
    let mw = new b2Vec2(worldMouse.x/10, worldMouse.y/10);
    mj.SetTarget(mw);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (tool == "box") {//Make boxes
      let box = new Box(createVector(worldMouse.x, worldMouse.y), color(random(0, 255), random(0, 255), random(0, 255)));
      boxes.push(box);
    } else if (tool == "drag") {//Drag stuff around
      let m = new b2AABB();//Set an area for mouse
      m.lowerBound.Set(worldMouse.x/10 - 0.001, worldMouse.y/10 - 0.001);
      m.upperBound.Set(worldMouse.x/10 + 0.001, worldMouse.y/10 + 0.001);
      
      let c = function(fixture) {
        if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {//If not a static body
          let body = fixture.GetBody();
          let mjd = new b2MouseJointDef();
          
          mjd.bodyA = world.GetGroundBody();
          mjd.bodyB = body;
          
          mjd.collideConnected = true;
          mjd.dampingRatio = 0.9;
          mjd.frequencyHz = 5;
          mjd.maxForce = 300.0*body.GetMass();
          mjd.target.Set(worldMouse.x/10, worldMouse.y/10);
          
          mj = world.CreateJoint(mjd);
          
          body.SetAwake(true);
          return false;
        }
      };
      world.QueryAABB(c, m);//Test AABB overlap
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT && mj) {//Destroy mouse joint on release
    world.DestroyJoint(mj);
    mj = null;
  }
}
