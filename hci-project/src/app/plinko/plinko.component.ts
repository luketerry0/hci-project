import { Component, ViewChild, OnInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import p5 from 'p5';
import Peg from './peg';
import Bucket from './bucket';
import Matter from 'matter-js';
import Particle from './particle';
import { GameStateService } from '../services/game-state.service';
import { TextService } from '../services/text.service';
import { GameState, UpgradeObject, UPGRADES } from '../types';
import { Subscription } from 'rxjs';


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

  engine: Matter.Engine;
  world: Matter.World;
  particles: Particle[] = [];
  pegs: Peg[] = [];
  buckets: Bucket[] = [];
  rows = 10;
  gameStateService : GameStateService
  textService: TextService
  upgrades: UpgradeObject;
  config: GameState;
  private text_service_subscription: Subscription | undefined;
  sketch: (s: p5) => void;
  colors = {
    background: 'white',
    text: 'black'
  }

  constructor(private gss: GameStateService, private ts: TextService){
    // create matter.js engine, world
    this.engine = this.Engine.create({velocityIterations: 1, positionIterations: 1, constraintIterations: 1});
    this.world = this.engine.world;
    
    // store the services which were injected into this component
    this.gameStateService = gss;
    this.textService = ts;

    // get the initial upgrades and game state
    this.upgrades = this.gameStateService.getUpgrades();
    this.config = this.gameStateService.getGameState();

    // when the user buys an upgrade change that in this component
    this.gameStateService.upgrade$.subscribe((upgrades) => {
      this.upgrades = upgrades;
      this.p5Canvas.setup();
    });
  
    // when the user's game state changes due to certian upgrades, update the config in this component
    this.gameStateService.gameState$.subscribe((new_game_state) => {
      this.config = new_game_state;
    });

    // when the user toggles between dark mode, change the colors accordingly
    this.gameStateService.darkMode$.subscribe((isDark) => {
      if (isDark){
        this.colors = {
          background: '#1e1e1e',
          text: 'white'
        }
      }else{
        this.colors = {
          background: 'white',
          text: 'black'
        }
      }
      this.p5Canvas.setup();
    })

    // Load the initial text
    this.textService.loadText(this.upgrades[UPGRADES.NEW_TEST]);

    // this is the main sketch method, which is well documented in p5. 
    // It is called many times per second to update the screen.
    this.sketch = (s: p5) => {

      s.setup = () => {
        // create corectly sized canvas
        s.createCanvas(this.width, this.height).parent('canvas-container');

        // draw board, calculate peg positions, buckets
        this.draw_plinko_board(s);
        }
  
      s.draw = async () => {
        // Clear the background
        s.background(this.colors.background);

        // update the engine
        this.Engine.update(this.engine);

        // draw the buckets
        for (var i = 0; i < this.buckets.length; i++) {
          this.buckets[i].show(s, this.upgrades[UPGRADES.BUCKET_VAL_MULTIPLIER], this.colors.background != 'white');
        }

        // draw the particles
        const updateParticle = async (i: number, s: p5): Promise<boolean> => {
          this.particles[i].show(s, this.colors.background);
          if(
            this.particles[i].isInBucket(s, this.buckets, this.upgrades[UPGRADES.BUCKET_VAL_MULTIPLIER]) ||
            this.particles[i].isOffscreen(s)) {
                this.World.remove(this.world, this.particles[i].body);
                this.particles.splice(i,1);
          }
        return true;
      }
      // upgrade particles asyncronously for performance
      let parts = []
        for (var i = 0; i < this.particles.length; i++) {
          parts.push(updateParticle(i, s));
        }

      // draw the pegs
      for (var i = 0; i < this.pegs.length; i++) {
        this.pegs[i].show(s, this.colors.text);
      }

      // await the particles which have been dropped
      await Promise.all(parts);
      console.log(this.particles.length)
      };
    }
  }


  // access the canvas's div so we know how big to make the p5 canvas
  @ViewChild('canvasContainer') canvas!: ElementRef;
  width: number = 10;
  height: number = 10;
  p5Canvas: any; //p5 canvas does not support proper typing, unfortunately

  // record the dimensions of the canvas
  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
  }

  // creates a new ball at the specified coordinates
  createParticle(x: number, y: number, letter: string) {
    var p = new Particle(x,y,this.config.ball_radius, this.world, this.gameStateService, letter, this.upgrades);
    this.particles.push(p);
  }

  // helper method to draw the plinko board
  private draw_plinko_board(s: p5){
    // remove the pegs if they already exist (e. g. window is resized)
    this.pegs.forEach((peg) => {
      this.World.remove(this.world, peg.body);
    });
    this.pegs = [];
    this.buckets = [];

    // draw the plinko board
    const spacing_between_pegs = this.config.spacing_between_pegs;
    const peg_radius = this.config.peg_radius;
    let pegs_drawn = 0
    const removed_pegs = this.upgrades[UPGRADES.REMOVE_PEG];
    // iterate over each peg
    for (let level = 0; level < this.rows; level++){
      for (let i = 0; i <= level; i++){
          // determine where the peg should be
          const peg_x = this.width / 2 + i*spacing_between_pegs- level*spacing_between_pegs/2;
          const peg_y = this.height / 4 + level*spacing_between_pegs;
          
          // draw the peg and store a reference to it
          if (pegs_drawn >= removed_pegs){
          var p = new Peg( peg_x, peg_y, peg_radius, this.world);
          this.pegs.push(p);
        }
        pegs_drawn = pegs_drawn + 1

          
          // if this is the last row, make a bucket under it
          if (level == this.rows - 1 && i < level){
            // calculate the currency value based on distance from the center peg
            const value = s.map(
              Math.abs(i - ((level-1)/2)), 0, ((level-1)/2), this.config.max_bucket, this.config.min_bucket
            );

            // store a reference to the bucket
            var b = new Bucket(
              peg_x, peg_y + spacing_between_pegs/2, spacing_between_pegs, 30, value, 500);
            this.buckets.push(b);
          }
      }
    }
  }

  // called when the component initializes
  ngOnInit() {

    // when the user types a letter, drop a new ball
    this.text_service_subscription = this.textService.letterTyped$.subscribe((letter) => {
      this.createParticle(this.width / 2 + (Math.random()*10 - 5), (this.height/4) - 20, letter);
    })
  
    // initialize the canvas
    this.p5Canvas = new p5(this.sketch);
  }

  
  // if the size of the window changes, recalculate and redraw p5 board
  @HostListener('window:resize', ['$event'])
  sizeChange(event: any) {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
    this.p5Canvas.setup();
  }

}
