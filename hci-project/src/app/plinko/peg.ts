import p5, { Vector } from 'p5';
import particle from './particle'
import Matter from 'matter-js';

export default class Peg{

    ops = {
        restitution: 1,
        friction: 0,
        isStatic: true
    }
    body: Matter.Body;
    r: number;

    constructor(x: number,y: number,r: number, world: Matter.World){
        this.body = Matter.Bodies.circle(x,y,r, this.ops)
        this.r = r;
        Matter.World.add(world, this.body);
    }

    show(s: p5, background: string){
        s.fill(0);
        s.stroke(background);
        var pos = this.body.position;
        s.push();
        s.translate(pos.x,pos.y);
        s.ellipse(0,0,this.r * 2);
        s.pop();
    }

}