import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';
import { TextService } from '../services/text.service';

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

  screenWidth = window.innerWidth;
  isMobile = this.screenWidth <= 768;
  isUpgradesOpen = false;

  text_service: TextService
  correctChars: number = 0;
  secondsElapsed: number = 0;
  wpm: number = 0; // words per minute

  calculateWpm(){
    this.wpm = ((this.correctChars*60)/5)/this.secondsElapsed
  }

  constructor(gss: GameStateService, ts: TextService) {
    this.gameStateService = gss;

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      this.isMobile = this.screenWidth <= 768;
    });
    this.text_service = ts;

    this.text_service.correctChars$.subscribe((chars) => {
      this.correctChars = chars;
      this.calculateWpm();
    })

      // increment the clock each second
    setInterval(() => {
    this.secondsElapsed = this.secondsElapsed + 1;
    this.calculateWpm();
  }, 1000); 
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleUpgradesMenu(event: Event) {
    event.stopPropagation();
    this.isUpgradesOpen = !this.isUpgradesOpen;
    if (this.isUpgradesOpen) this.isSidebarOpen = false;
  }

  getCost(upgrade: UPGRADES): number {
    return this.gameStateService.getUpgradeCost(upgrade);
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
    if(this.gameStateService.upgrade(upgrade))
      {
        this.playCoinSound();
      }
  }

  coinSound = new Audio('assets/sounds/coin.mp3');

  playCoinSound(): void {
    this.coinSound.currentTime = 0;
    this.coinSound.play()
  }
}
