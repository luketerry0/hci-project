import { Component, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlinkoComponent } from './plinko/plinko.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CounterComponent } from './counter/counter.component';
import { TyperComponent } from './typer/typer.component';
import { UpgradesComponent } from './upgrades/upgrades.component';
import { TypingStatsComponent } from './typing-stats/typing-stats.component';

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
    TypingStatsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note the correction here too
})
export class AppComponent {
  title = 'hci-project';
}
