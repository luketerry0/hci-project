import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'counter',
  standalone: true,
  // Use an inline template for clarity, but you can also use templateUrl
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'

})
export class CounterComponent {
  subscription: Subscription;
  currBalance: number = 0;
  tickInstance: any;
  constructor(private gss: GameStateService){

    //Only needs to listen to the current balance from GameStateService
    this.subscription = gss.currBalance$.subscribe((currBalance: number) => {
      this.currBalance = currBalance;
    });
  }

}
