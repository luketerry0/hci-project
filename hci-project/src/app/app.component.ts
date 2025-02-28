import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlinkoComponent } from './plinko/plinko.component';
import { NavBarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlinkoComponent,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hci-project';
}
