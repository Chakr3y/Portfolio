//https://editor.p5js.org/javier/sketches/wzLQrzS0t
class Box {
  constructor(position, c) {
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
    this.body.CreateFixture(fd);
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
}

class Circle {
  constructor(position, radius) {
    
  }
}

class Boundary {
  constructor(position, size, angle) {
    this.position = position;
    this.size = size;
    this.a = angle;
    this.c = 100;
    
    let fd = new b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;
    
    let bd = new b2BodyDef();
    bd.type = b2Body.b2_staticBody;
    bd.position.Set(this.position.x/10, this.position.y/10);
    fd.shape = new b2PolygonShape();
    fd.shape.SetAsBox(this.size.x/20, this.size.y/20);
    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);
  }
  
  display() {
    push();
    rotate(this.body.GetAngle());
    fill(this.c);
    stroke(0);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
    pop();
  }
}
