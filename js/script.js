// Based on "Pipeline" by Sean Free


const particles = [];
const padding = 100;

function setup() {
  for (let i = 0; i < 10; i++) {
    const p = new Particle();
    particles.push(p);
  }
}

function draw(e) {
  // rotate(e * 0.0001);
  compositeOperation(compOper.lighter);
  // lineWidth(2);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    // if(p.dead) continue;
    if (p.dead) {
      particles.splice(i, 1);
      continue;
    }
    beginPath();
    circle(p.pos, 1);
    p.pos.add(p.vel);
    ctx.shadowColor = hsl(p.hue, 100, 70, 1);
    ctx.shadowBlur = 10;
    const t = (e - p.lastChanged) / 4000;
    fill(hsl(p.hue, 100, 60, 0.3));
    if (
    p.pos.x < -width_half - padding ||
    p.pos.x > width_half + padding ||
    p.pos.y < -height_half - padding ||
    p.pos.y > height_half + padding)
    {
      if (p.splitable) {
        p.reset();
      } else
      {
        p.dead = true;
      }
    } else
    if (random(0.03, 1) < t) {
      p.lastChanged = e;
      p.pickDirection();
      if (particles.length < 300 && random(0.1, 1) < t) {
        const splitP = new Particle();
        splitP.splitable = false;
        splitP.pos.set(p.pos);
        splitP.vel.set(p.vel);
        splitP.pickDirection();
        particles.push(splitP);
      }
    }
  }
}

class Particle {
  constructor() {
    this.reset();
    this.splitable = true;
    this.dead = false;
  }
  reset() {
    this.lastChanged = performance.now();
    this.hue = random(130) + 180;
    this.pos = createVector(0, 0);
    this.vel = createVector(2, 0);
    this.pickDirection([-2, -1, 0, 1, 2, 3]);
  }
  pickDirection(range = [-1, 0, 1]) {
    this.vel.rotate(random(range) * THIRD_PI);
  }}