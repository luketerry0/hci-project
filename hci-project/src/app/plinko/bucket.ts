import p5 from 'p5';

// this class represents a single bucket that the user can score in on the plinko board
export default class Bucket {
    // keep track of the dimensions and location of the bucket, as well as it's value
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
    max_value: number;

    // keep track of the dimensions and location of the bucket, as well as it's value
    constructor(x: number,y: number, width: number, height: number, value: number, max_value: number){
        this.x = x
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.max_value = max_value;
    }

    // method to draw the bucket on the p5 canvas
    show(s: p5, mult: number, isDark: boolean){
        // dim the color based on it's value to create a gradient
        s.fill([66, 135, 245, 10*s.map(this.value, 0, this.max_value, 0, 255)]);
        s.noStroke();
        s.rect(this.x, this.y, this.width, this.height);
        s.fill(isDark ? 255 : 0);
        s.textAlign(s.CENTER, s.CENTER);
        // display the value in the center of the bucket's box
        s.text(Math.round(this.value)+(this.value+mult*10 - 10), this.x+(this.width/2), this.y+(this.height/2));
    }

}