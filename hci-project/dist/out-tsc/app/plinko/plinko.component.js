import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import p5 from 'p5';
let PlinkoComponent = class PlinkoComponent {
    constructor() {
        this.width = 10;
        this.height = 10;
    }
    ngAfterViewInit() {
        this.width = this.canvas.nativeElement.offsetWidth;
        this.height = this.canvas.nativeElement.offsetHeight;
        console.log('Width:', this.width, 'Height:', this.height);
    }
    ngOnInit() {
        const sketch = (s) => {
            s.preload = () => {
                // preload code
            };
            s.setup = () => {
                s.createCanvas(this.width, this.height).parent('canvas-container');
                console.log('created');
            };
            let x = 25;
            s.draw = () => {
                // Clear the background
                s.background(255, 0, 255);
                // draw the plinko board
                // Draw a circle, with hue determined by frameCount
                s.fill(x / 3, 90, 90);
                s.circle(x, s.height / 2, 50);
                // Increase the x variable by 5
                x += 5;
                // Reset the circle position after it moves off the right side
                if (x > s.width + 25) {
                    x = -25;
                }
                s.describe('circle moving to the right');
            };
            s.mousePressed = () => {
                // Start/stop the animation loop
                if (s.isLooping()) {
                    s.noLoop();
                }
                else {
                    s.loop();
                }
            };
            s.keyPressed = () => {
                // Draw one frame
                s.redraw();
            };
        };
        this.p5Canvas = new p5(sketch);
    }
};
__decorate([
    ViewChild('canvasContainer')
], PlinkoComponent.prototype, "canvas", void 0);
PlinkoComponent = __decorate([
    Component({
        selector: 'plinko',
        standalone: true,
        imports: [],
        templateUrl: './plinko.component.html',
        styleUrl: './plinko.component.css'
    })
], PlinkoComponent);
export { PlinkoComponent };
//# sourceMappingURL=plinko.component.js.map