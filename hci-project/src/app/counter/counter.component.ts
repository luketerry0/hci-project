import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';

declare var tick: any; // declare the global Tick object from flip.min.js

@Component({
  selector: 'counter',
  standalone: true,
  // Use an inline template for clarity, but you can also use templateUrl
  template: `
    <div class="tick" #tickElement>
      <span data-layout="horizontal fit">
        <span data-repeat="true" data-transform="arrive(5, .01) -> round -> split -> delay(rtl, 100, 150)">
          <span data-view="flip"></span>
        </span>
      </span>
    </div>
  `,
  styles: [`
    .tick {
      font-size: 1rem;
      white-space: nowrap;
      font-family: arial, sans-serif;
      border: 1px solid red; /* Temporary border for debugging */
      padding: 10px;
    }
  `]
})
export class CounterComponent implements AfterViewInit {
  @ViewChild('tickElement', { static: true }) tickElement!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof Tick === 'undefined') {
      console.error('Tick library is not loaded.');
      return;
    }

    const tickInstance = Tick.DOM.create(this.tickElement.nativeElement);

    const interval = Tick.helper.duration(5, 'seconds');
    const valuePerInterval = 5;
    const dateOffset = Tick.helper.date('2019-01-01');
    const valueOffset = 0;

    Tick.helper.interval(() => {
      const now = Date.now();
      const diff = now - dateOffset;
      const loops = Math.floor(diff / interval);
      const newValue = valueOffset + (loops * valuePerInterval);
      tickInstance.value = newValue;
    }, 1000);
  }
}
