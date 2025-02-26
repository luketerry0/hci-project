import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import p5 from 'p5';
import Plinko from './plinko_board';

@Component({
  selector: 'plinko',
  standalone: true,
  imports: [],
  templateUrl: './plinko.component.html',
  styleUrl: './plinko.component.css'
})
export class PlinkoComponent {

  // access the canvas's div so we know how big to make the p5 canvas
  @ViewChild('canvasContainer') canvas!: ElementRef;
  width: number = 10;
  height: number = 10;
  p5Canvas: any; //TODO make this typing better

  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
    console.log('Width:', this.width, 'Height:', this.height);
  }

  // helper function to draw the plinko board


  private plinko_board: Plinko = new Plinko()


  ngOnInit() {
    const sketch = (s: p5) => {
  
      s.preload = () => {
        // preload code
      }
  
      s.setup = () => {
        s.createCanvas(this.width, this.height).parent('canvas-container');
        console.log('created');
      };
  
      let x = 25;
      s.draw = () => {
        // Clear the background
        s.background('white');

        // draw the plinko board
        this.plinko_board.draw_plinko(s);

      };

      s.mousePressed = () => {
        // add a particle
        this.plinko_board.add_particle(s.mouseX, s.mouseY, s);
      }

      s.keyPressed = () => {
        // Draw one frame
        s.redraw();
      }
    }
  
    this.p5Canvas = new p5(sketch);
  }

}

