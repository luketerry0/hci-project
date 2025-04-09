import { Component, HostListener, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlinkoComponent } from './plinko/plinko.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CounterComponent } from './counter/counter.component';
import { TyperComponent } from './typer/typer.component';
import { UpgradesComponent } from './upgrades/upgrades.component';
import { TypingStatsComponent } from './typing-stats/typing-stats.component';
import { AutotyperComponent } from './autotyper/autotyper.component';
import { GameStateService } from './services/game-state.service';
import { UpgradeObject, UPGRADES } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    RouterOutlet, 
    PlinkoComponent, 
    NavBarComponent, 
    CounterComponent, 
    TyperComponent, 
    UpgradesComponent,
    TypingStatsComponent,
    AutotyperComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note the correction here too
})
export class AppComponent {
  // keep track of the number of autotypers
  n_autotypers: Array<number> = []

  constructor(gss: GameStateService){
    gss.upgrade$.subscribe((upgrades: UpgradeObject) => {
      this.n_autotypers = [];
      for (var i = 0 ; i < upgrades[UPGRADES.AUTOTYPER]; i++){
        this.n_autotypers.push(i);
      }
    })
  }

  // disable automatically scrolling on spacebar click
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
      event.preventDefault();
    }
  }
}
