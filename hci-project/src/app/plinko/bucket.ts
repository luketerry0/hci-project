import p5 from 'p5';

export default class Bucket {


    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
    max_value: number;

    constructor(x: number,y: number, width: number, height: number, value: number, max_value: number){
        this.x = x
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.max_value = max_value;
    }

    show(s: p5){

        s.fill([66, 135, 245, 10*s.map(this.value, 0, this.max_value, 0, 255)]);
        s.noStroke();
        s.rect(this.x, this.y, this.width, this.height);
        s.fill(0);
        s.textAlign(s.CENTER, s.CENTER);
        s.text(this.value, this.x+(this.width/2), this.y+(this.height/2));
    }

}