import p5 from 'p5';
import Matter from 'matter-js'
import Bucket from './bucket';
import { GameStateService } from '../services/game-state.service';
import { UpgradeObject, UPGRADES } from '../types';

export default class Particle {
    upgrades: UpgradeObject;
    body: Matter.Body;
    r: number;
    letter: string;
    color: number[];
    gameStateService: GameStateService;
    ops: { restitution: number; friction: number; mass: number; };

    constructor(x: number,y: number,r: number, world: Matter.World, gss: GameStateService, letter: string, upgrades: any){
        this.upgrades = upgrades;
        this.ops = {
            restitution: 1 / (this.upgrades[UPGRADES.INVERSE_BOUNCE_MULTIPLER]*0.25),
            friction: 0,
            mass: this.upgrades[UPGRADES.HEAVY_BALL_MULTIPLIER]
        }
        this.body = Matter.Bodies.circle(x,y,r,this.ops);
        this.r = (r / this.upgrades[UPGRADES.SMALL_BALL_MULTIPLER]) + 6;
        this.letter = letter == " " ? '_' : letter; //'abcdefghijklmnopqrstuvwxyz'[this.get_random_number(26)]
        this.color = [this.get_random_number(255), this.get_random_number(255), this.get_random_number(255)]
        this.gameStateService = gss;
        Matter.World.add(world, this.body);
    }

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

    isOffscreen(s: p5){
        var x = this.body.position.x;
        var y = this.body.position.y;
        return(x<-50 || x > s.width + 50 || y > s.height + 50);
    }

    isInBucket(s: p5, buckets: Bucket[], mult: number): Boolean{
        for (var i = 0; i < buckets.length; i++){
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