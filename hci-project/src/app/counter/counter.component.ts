import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';
import { GameStateService } from '../services/game-state.service';
import { Subscription } from 'rxjs';

declare var tick: any; // declare the global Tick object from flip.min.js

@Component({
  selector: 'counter',
  standalone: true,
  // Use an inline template for clarity, but you can also use templateUrl
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'

})
export class CounterComponent implements AfterViewInit {
  subscription: Subscription;
  currBalance: number = 0;
  tickInstance: any;
  constructor(private gss: GameStateService){

    this.subscription = gss.currBalance$.subscribe((currBalance: number) => {
      this.currBalance = currBalance;
      if (this.tickInstance){
        this.tickInstance.value = this.currBalance;
      }
    });
  }

  @ViewChild('tickElement', { static: true }) tickElement!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof Tick === 'undefined') {
      console.error('Tick library is not loaded.');
      return;
    }

    this.tickInstance = Tick.DOM.create(this.tickElement.nativeElement);
    this.tickInstance.value = this.currBalance;
  }
}
