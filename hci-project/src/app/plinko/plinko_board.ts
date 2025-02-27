import p5, { Vector } from 'p5';
import particle from './particle'

export default class Plinko{

    // options
    ops = {
        peg_radius: 10,
        spacing_between_levels: 25,
        spacing_between_pegs: 30,
        color: (0),
        gravity_amount: 0.5
    }

    // keep track of all the particles on the board
    particles: particle[] = []

    //draws the plinko board
    draw_plinko = (s: p5) => {
        // gravity
        const gravity = s.createVector(0, this.ops.gravity_amount);
    
        // draw the plinko board
        s.fill(this.ops.color)
        for (let level = 0; level < 15; level++){
            for (let i = 0; i < level+1; i++){
                // determine where the peg should be
                const peg_x = s.width / 2 + i*this.ops.spacing_between_pegs - level*this.ops.spacing_between_pegs/2;
                const peg_y = s.height / 10 + level*this.ops.spacing_between_levels;
                
                // draw the peg
                s.circle( peg_x, peg_y, this.ops.peg_radius);

                // if the peg collides with any particles, make the particle bounce
                this.particles.forEach((p : particle) => {
                    console.log(p.is_colliding(peg_x, peg_y, this.ops.peg_radius))
                    if (p.is_colliding(peg_x, peg_y, this.ops.peg_radius)){
                        p.velocity = p.velocity.mult(-1)
                        // .mult(
                        //     p.position.dist(s.createVector(peg_x, peg_y))
                        // )
                    }

                    // apply gravity to the particle
                    p.apply_force(gravity);

                    // show the particles
                    p.update();
                    p.display(s);
                })
            }
        }
    
      }

    // adds a new particle
    add_particle(x: number, y: number, s: p5){
        this.particles.push(new particle(x, y, s))
    }
}