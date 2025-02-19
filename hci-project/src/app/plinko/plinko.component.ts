import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import p5 from 'p5';


@Component({
  selector: 'plinko',
  standalone: true,
  imports: [],
  templateUrl: './plinko.component.html',
  styleUrl: './plinko.component.css'
})
export class PlinkoComponent {

  // access the canvas's div so we know how big to make the p5 canvas
  @ViewChild('canvas-container') canvas!: ElementRef;
  width: number = 0;
  height: number = 0;

  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
  }


  ngOnInit() {
    const sketch = (s: any) => {
  
      s.preload = () => {
        // preload code
      }
  
      s.setup = () => {
        s.createCanvas(this.width, this.height).parent('canvas-container');
        console.log('created')
      };
  
      let x = 25;
      s.draw = () => {
        // Clear the background
        s.background(0);

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
        } else {
          s.loop();
        }
      }

      s.keyPressed = () => {
        // Draw one frame
        s.redraw();
      }
    }
  
    let canvas = new p5(sketch);
  }

}

