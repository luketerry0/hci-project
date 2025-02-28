import p5 from 'p5';
import Matter from 'matter-js'

export default class Particle {
    ops = {
        restitution: 1,
        friction: 0
    }

    body: Matter.Body;
    r: number;
    letter: string;
    color: number[];

    constructor(x: number,y: number,r: number, world: Matter.World){
        this.body = Matter.Bodies.circle(x,y,r,this.ops);
        this.r = r;
        this.letter = 'abcdefghijklmnopqrstuvwxyz'[this.get_random_number(26)]
        this.color = [this.get_random_number(255), this.get_random_number(255), this.get_random_number(255)]

        Matter.World.add(world, this.body);
    }

    show(s: p5){
        s.fill(s.random(255),s.random(255),s.random(255));
        s.stroke(255);
        var pos = this.body.position;
        s.push();
        s.translate(pos.x,pos.y);
        s.rotate(this.body.angle);
        s.text(this.letter, 0, 0);
        s.pop();
        console.log("IN SHOW")
    }

    isOffscreen(s: p5){
        var x = this.body.position.x;
        var y = this.body.position.y;
        return(x<-50 || x > s.width + 50 || y > s.height + 50);
    }

    // small helper function to get random number
    private get_random_number(max: number){
        return Math.floor(Math.random()*max);
    }
}