import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent {
  gameStateService: GameStateService;
  upgrades = UPGRADES;
  constructor(gss: GameStateService){
    this.gameStateService = gss;
  }

  isDropdownOpen = false;
  isSidebarOpen = false;

  // Toggle the dropdown visibility
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevent click event from propagating to other elements
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  buyUpgrade(upgrade: UPGRADES){
    this.gameStateService.upgrade(upgrade);
  }
}
