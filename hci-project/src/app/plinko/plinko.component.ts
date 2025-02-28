import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import p5 from 'p5';
import Peg from './peg';
import Matter from 'matter-js';
import Particle from './particle';


@Component({
  selector: 'plinko',
  standalone: true,
  imports: [],
  templateUrl: './plinko.component.html',
  styleUrl: './plinko.component.css'
})
export class PlinkoComponent {

  // matter.js modules
  private Engine = Matter.Engine
  private World = Matter.World
  private Bodies = Matter.Bodies

  engine: Matter.Engine;
  world: Matter.World;
  particles: Particle[] = [];
  pegs: Peg[] = [];
  rows = 10;

  constructor(){
    // create matter.js engine, world
    this.engine = this.Engine.create();
    this.world = this.engine.world;
  }


  // access the canvas's div so we know how big to make the p5 canvas
  @ViewChild('canvasContainer') canvas!: ElementRef;
  width: number = 10;
  height: number = 10;
  p5Canvas: any; //TODO make this typing better

  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
    console.log('Width:', this.width, 'Height:', this.height);
  }

  // helper function to draw the plinko board


  // private plinko_board: Plinko = new Plinko()


  ngOnInit() {
    const sketch = (s: p5) => {


  
      s.preload = () => {

      }
  
      s.setup = () => {
        // create corectly sized canvas
        s.createCanvas(this.width, this.height).parent('canvas-container');

        // draw the plinko board
        const spacing_between_pegs = 35;
        const peg_radius = 4;
        for (let level = 0; level < 15; level++){
          for (let i = 0; i < level+1; i++){
              // determine where the peg should be
              const peg_x = s.width / 2 + i*spacing_between_pegs- level*spacing_between_pegs/2;
              const peg_y = s.height / 10 + level*spacing_between_pegs;
              
              // draw the peg
              var p = new Peg( peg_x, peg_y, peg_radius, this.world);
              this.pegs.push(p);
          }
        }

      };
  
      s.draw = () => {
        // Clear the background
        s.background('white');

        // update the engine
        this.Engine.update(this.engine);

        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].show(s);
          if(this.particles[i].isOffscreen(s)) {
            this.World.remove(this.world, this.particles[i].body);
            this.particles.splice(i,1);
            i--;
          }
        }

        for (var i = 0; i < this.pegs.length; i++) {
          this.pegs[i].show(s);
        }
      };

      s.mousePressed = () => {
        // add a particle
        this.createParticle(s.mouseX, s.mouseY);
      }

      s.keyPressed = () => {
        // Draw one frame
        s.redraw();
      }
    }
  
    this.p5Canvas = new p5(sketch);
  }


}
  createParticle(x: number, y: number) {
    const particle_radius = 7;
    var p = new Particle(x,y,7, this.world);
    this.particles.push(p);
  }

}
