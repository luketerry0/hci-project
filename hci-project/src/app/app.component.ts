import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlinkoComponent } from './plinko/plinko.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlinkoComponent, NavBarComponent, CounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note the correction here too
})
export class AppComponent {
  title = 'hci-project';
}
