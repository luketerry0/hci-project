import p5 from 'p5';
import Matter from 'matter-js'
import Bucket from './bucket';
import { GameStateService } from '../services/game-state.service';

export default class Particle {
    ops = {
        restitution: 1,
        friction: 0
    }

    body: Matter.Body;
    r: number;
    letter: string;
    color: number[];
    gameStateService: GameStateService;

    constructor(x: number,y: number,r: number, world: Matter.World, gss: GameStateService, letter: string){
        this.body = Matter.Bodies.circle(x,y,r,this.ops);
        this.r = r;
        this.letter = letter; //'abcdefghijklmnopqrstuvwxyz'[this.get_random_number(26)]
        this.color = [this.get_random_number(255), this.get_random_number(255), this.get_random_number(255)]
        this.gameStateService = gss;
        Matter.World.add(world, this.body);
    }

    show(s: p5){
        s.fill(this.color);
        s.stroke(255);
        var pos = this.body.position;
        s.push();
        s.translate(pos.x,pos.y);
        s.rotate(this.body.angle);
        s.text(this.letter, 0, 0);
        s.pop();
    }

    isOffscreen(s: p5){
        var x = this.body.position.x;
        var y = this.body.position.y;
        return(x<-50 || x > s.width + 50 || y > s.height + 50);
    }

    isInBucket(s: p5, buckets: Bucket[]): Boolean{
        for (var i = 0; i < buckets.length; i++){
            if ((Math.abs(this.body.position.x - buckets[i].x) < buckets[i].width) 
                && (Math.abs(this.body.position.y - buckets[i].y) < buckets[i].height)){
                // send to the observable in order to update the balance
                this.gameStateService.score(buckets[i].value);
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