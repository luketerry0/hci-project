import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlinkoComponent } from './plinko/plinko.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlinkoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hci-project';
}
