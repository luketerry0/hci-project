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
    this.width = this.canvas.nativeElement.offsetWidth || 500;
    this.height = this.canvas.nativeElement.offsetHeight || 500;
  
    console.log('Width:', this.width, 'Height:', this.height);
  
    if (this.p5Canvas) {
      this.p5Canvas.resizeCanvas(this.width, this.height);
      console.log('Resizing canvas to:', this.width, this.height);
    } else {
      const sketch = (s: p5) => {
        s.setup = () => {
          const canvas = s.createCanvas(this.width, this.height).parent(this.canvas.nativeElement);
          console.log('Canvas created', canvas);
        };
        s.draw = () => {
          s.background('white');
          this.plinko_board.draw_plinko(s);
        };
      };
  
      this.p5Canvas = new p5(sketch);
    }
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

