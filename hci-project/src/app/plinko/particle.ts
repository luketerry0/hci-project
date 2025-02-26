import p5 from 'p5';

export default class Particle {

    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    mass: number
    size: number;
    constructor(x: number, y: number, s: p5){
        // this.pos replaces this.x and this.y
        this.position = s.createVector(x, y);
        this.velocity = s.createVector(0, 0.1);
        this.acceleration = s.createVector(0, 0);
        this.mass = 1000;
        this.size = 10;
      }

    // applies a force to a particle
    apply_force(force: p5.Vector){
        // account for the effect of weight on forces applied
        force.div(this.mass);
        this.acceleration.add(force);
    }

    // updates the particle based on it's current physics
    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    // displays the particle
    display(s: p5){
        s.fill(0);
        s.noStroke();
        s.circle(this.position.x, this.position.y, this.size);
    }

    // calculates the angle at which a peg collides with this particle
    is_colliding(x: number, y: number, peg_radius: number) : boolean | number{
        return (((this.position.x - x)**2 + (this.position.y - y)**2)**0.5 <= peg_radius);
    }
}