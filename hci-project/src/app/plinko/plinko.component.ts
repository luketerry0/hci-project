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

  constructor(private gss: GameStateService, private ts: TextService){
    // create matter.js engine, world
    this.engine = this.Engine.create();
    this.world = this.engine.world;
    this.gameStateService = gss;
    this.textService = ts;
    this.upgrades = this.gameStateService.getUpgrades();
    this.config = this.gameStateService.getGameState();

    this.gameStateService.upgrade$.subscribe((upgrades) => {
      this.upgrades = upgrades;
    });
  
    this.gameStateService.gameState$.subscribe((new_game_state) => {
      this.config = new_game_state;
    });

    // Load the initial text
    this.textService.loadText(this.upgrades[UPGRADES.NEW_TEST]);
  }


  // access the canvas's div so we know how big to make the p5 canvas
  @ViewChild('canvasContainer') canvas!: ElementRef;
  width: number = 10;
  height: number = 10;
  p5Canvas: any; //TODO make this typing better

  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
  }

  createParticle(x: number, y: number, letter: string) {
    var p = new Particle(x,y,this.config.ball_radius, this.world, this.gameStateService, letter, this.upgrades);
    this.particles.push(p);
  }

  private draw_plinko_board(s: p5){
    this.pegs = [];
    this.buckets = [];
    // draw the plinko board
    const spacing_between_pegs = this.config.spacing_between_pegs;
    const peg_radius = this.config.peg_radius;
    for (let level = 0; level < this.rows; level++){
      for (let i = 0; i <= level; i++){
          // determine where the peg should be
          const peg_x = s.width / 2 + i*spacing_between_pegs- level*spacing_between_pegs/2;
          const peg_y = s.height / 4 + level*spacing_between_pegs;
          
          // keep track of the peg
          var p = new Peg( peg_x, peg_y, peg_radius, this.world);
          this.pegs.push(p);
          
          // if this is the last row, make a bucket under it
          if (level == this.rows - 1 && i < level){
            // calculate the value based on distance from the center peg
            const value = s.map(
              Math.abs(i - ((level-1)/2)), 0, ((level-1)/2), this.config.max_bucket, this.config.min_bucket
            );

            var b = new Bucket(
              peg_x, peg_y + spacing_between_pegs/2, spacing_between_pegs, 30, value, 500);
            this.buckets.push(b);
          }
      }
    }
  }

  ngOnInit() {
    this.text_service_subscription = this.textService.letterTyped$.subscribe((letter) => {
      this.createParticle(this.width / 2 + (Math.random()*10 - 5), (this.height/4) - 20, letter);
    })

    const sketch = (s: p5) => {

      s.setup = () => {
        // create corectly sized canvas
        s.createCanvas(this.width, this.height).parent('canvas-container');

        // draw board, calculate peg positions, buckets
        this.draw_plinko_board(s);
        }
  
      s.draw = () => {
        // Clear the background
        s.background('white');

        // update the engine
        this.Engine.update(this.engine);

        // draw the buckets
        for (var i = 0; i < this.buckets.length; i++) {
          this.buckets[i].show(s);
        }

        // draw the particles
        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].show(s);
          if(this.particles[i].isInBucket(s, this.buckets)) {
            this.World.remove(this.world, this.particles[i].body);
            this.particles.splice(i,1);
            i--;
          }
        }

        // draw the pegs
        for (var i = 0; i < this.pegs.length; i++) {
          this.pegs[i].show(s);
        }
      };

      // code to drop a random letter when mouse is pressed
      // s.mousePressed = () => {
      //   // add a particle
      //   // this.createParticle(s.mouseX, s.mouseY);
      // }
    }
  
    this.p5Canvas = new p5(sketch);
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event: any) {
    // if the size of the window changes, recalculate the p5 board
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
    this.text_service_subscription?.unsubscribe();
    this.ngOnInit();
  }


}
