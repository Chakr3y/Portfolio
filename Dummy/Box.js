class Box {
  constructor(position, c, d) {
    this.position = position;
    this.size = createVector(20, 20);
    this.c = c;
    
    let bd = new b2BodyDef();
    bd.type = b2Body.b2_dynamicBody;
    bd.position = new b2Vec2(this.position.x/10, this.position.y/10);
    
    let fd = new b2FixtureDef();
    fd.shape = new b2PolygonShape();
    fd.shape.SetAsBox(this.size.x/20, this.size.y/20);
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;
    
    this.body = world.CreateBody(bd);
    this.fixture = this.body.CreateFixture(fd);
  }
  
  display() {
    let pos = this.body.GetPosition();
    
    push();
    translate(pos.x*10, pos.y*10);
    rotate(this.body.GetAngle());
    fill(this.c);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.size.x, this.size.y);
    pop();
  }
  
  displayAABB() {
    var aabb = this.fixture.GetAABB();
    var pos = aabb.GetCenter();
    var size = aabb.GetExtents();
    
    push();
    noFill();
    strokeWeight(1);
    stroke(0, 255, 0);
    rect(pos.x*10, pos.y*10, size.x*20, size.y*20);
    pop();
  }
}

class Circle {
  constructor(position, radius, c) {
    this.position = position;
    this.radius = radius;
    this.c = c;
    
    let bd = new b2BodyDef();
    bd.type = b2Body.b2_dynamicBody;
    bd.position = new b2Vec2(this.position.x/10, this.position.y/10);
    
    let fd = new b2FixtureDef();
    fd.shape = new b2CircleShape();
    fd.shape.SetRadius(this.radius/10);
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;
    
    this.body = world.CreateBody(bd);
    this.fixture = this.body.CreateFixture(fd);
  }
  
  display() {
    let pos = this.body.GetPosition();
    
    push();
    translate(pos.x*10, pos.y*10);
    rotate(this.body.GetAngle());
    fill(this.c);
    stroke(200);
    strokeWeight(2);
    line(0, 0, this.radius, 0);
    circle(0, 0, this.radius);
    pop();
  }
  
  displayAABB() {
    var aabb = this.fixture.GetAABB();
    var pos = aabb.GetCenter();
    var size = aabb.GetExtents();
    
    push();
    noFill();
    strokeWeight(1);
    stroke(0, 255, 0);
    rect(pos.x*10, pos.y*10, size.x*20, size.y*20);
    pop();
  }
}

class Boundary {
  constructor(position, size, angle) {
    this.position = position;
    this.size = size;
    this.a = angle;
    this.c = 100;
    
    let bd = new b2BodyDef();
    bd.type = b2Body.b2_staticBody;
    bd.position.Set(this.position.x/10, this.position.y/10);
    
    let fd = new b2FixtureDef();
    fd.shape = new b2PolygonShape();
    fd.shape.SetAsBox(this.size.x/20, this.size.y/20);
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;
    
    this.body = world.CreateBody(bd);
    this.fixture = this.body.CreateFixture(fd);
  }
  
  display() {
    push();
    rotate(this.body.GetAngle());
    fill(this.c);
    stroke(0);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
    pop();
  }
  
  displayAABB() {
    var aabb = this.fixture.GetAABB();
    var pos = aabb.GetCenter();
    var size = aabb.GetExtents();
    
    push();
    noFill();
    strokeWeight(1);
    stroke(0, 255, 0);
    rect(pos.x*10, pos.y*10, size.x*20, size.y*20);
    pop();
  }
}
