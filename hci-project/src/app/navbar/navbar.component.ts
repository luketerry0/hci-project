import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
  gameStateService: GameStateService;
  upgrades = UPGRADES;
  
  isDropdownOpen = false;
  isSidebarOpen = false;
  darkMode = false; // For tracking dark mode

  constructor(gss: GameStateService) {
    this.gameStateService = gss;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSidebar(event: Event) {
    // Prevent toggling the sidebar when the spacebar is pressed.
    if (event instanceof KeyboardEvent && event.key === ' ') {
      return;
    }
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDarkMode(event: Event) {
    event.stopPropagation();
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    this.gameStateService.setDarkMode(this.darkMode);
  }

  buyUpgrade(upgrade: UPGRADES) {
    this.gameStateService.upgrade(upgrade);
  }
}
