import p5 from 'p5';
import Matter from 'matter-js'
import Bucket from './bucket';
import { GameStateService } from '../services/game-state.service';
import { UpgradeObject, UPGRADES } from '../types';

// this class represents a single ball (or particle) that is dropped into the plinko board
export default class Particle {
    // keep track of many parameters that will affect how the ball behaves and looks
    upgrades: UpgradeObject;
    body: Matter.Body;
    r: number;
    letter: string;
    color: number[];
    ops: { restitution: number; friction: number; mass: number; };

    // keep track of the game state which is injected into this component
    gameStateService: GameStateService;

    constructor(
        x: number,
        y: number,
        r: number,
        world: Matter.World,
        gss: GameStateService,
        letter: string, 
        upgrades: any
    ){
        // keep track of the upgrades applied when this ball was dropped and how they affect it's physics/display
        this.upgrades = upgrades;
        this.ops = {
            restitution: 1 / (this.upgrades[UPGRADES.INVERSE_BOUNCE_MULTIPLER]*0.25),
            friction: 0,
            mass: this.upgrades[UPGRADES.HEAVY_BALL_MULTIPLIER]
        }
        this.body = Matter.Bodies.circle(x,y,r,this.ops);
        this.r = (r / this.upgrades[UPGRADES.SMALL_BALL_MULTIPLER]) + 6;
        this.letter = letter == " " ? '_' : letter;
        this.color = [this.get_random_number(255), this.get_random_number(255), this.get_random_number(255)]
        // add the ball to the physics engine
        Matter.World.add(world, this.body);

        // persist the game state service injected into this component.
        this.gameStateService = gss;
    }

    // method to draw the ball on the p5 canvas
    show(s: p5, background: string){
        s.stroke(0);
        s.fill(background);
        var pos = this.body.position;
        s.push();
        s.translate(pos.x,pos.y);
        s.circle(0,0,this.r*2);
        s.fill(this.color);
        s.rotate(this.body.angle);
        s.text(this.letter, 0, 0);

        s.pop();
    }

    // method to determine if the ball is not on the canvas
    isOffscreen(s: p5){
        var x = this.body.position.x;
        var y = this.body.position.y;
        return(x<-50 || x > s.width + 50 || y > s.height + 50);
    }

    // helper method to score the ball if it's in a bucket
    isInBucket(s: p5, buckets: Bucket[], mult: number): Boolean{
        for (var i = 0; i < buckets.length; i++){
            // for each bucket, if the ball's coordinates are within the bucket, score it
            if ((Math.abs(this.body.position.x - buckets[i].x) < buckets[i].width) 
                && (Math.abs(this.body.position.y - buckets[i].y) < buckets[i].height)){
                // send to the observable in order to update the balance
                this.gameStateService.score(Math.round(buckets[i].value + mult*10 - 10));
                return true
                }
        }
        return false
    }

    // small helper function to get random number
    private get_random_number(max: number){
        return Math.floor(Math.random()*max);
    }
}