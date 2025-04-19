import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';
import { TextService } from '../services/text.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Subject } from 'rxjs';

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
  isSidebarOpen = false; //For checking sidebar toggle
  darkMode = false; // For tracking dark mode

  private secondsElapsedSubject = new Subject<number>();
  secondsElapsed$ = this.secondsElapsedSubject.asObservable();

  screenWidth = window.innerWidth;
  isMobile = this.screenWidth <= 800; //For tracking if on mobile
  isDesktop = this.screenWidth >= 800; //For tracking if on desktop
  isUpgradesOpen = false; //

  text_service: TextService //TextService needed for tracking on mobile
  correctChars: number = 0;
  secondsElapsed: number = 0;
  wpm: number = 0; // words per minute
  not_enough_money = false;


  calculateWpm(){
    this.wpm = ((this.correctChars*60)/5)/this.secondsElapsed
  }

  constructor(gss: GameStateService, ts: TextService, public dialog: MatDialog) {
    this.gameStateService = gss;

    //Will change to Mobile version if on smaller screen or screen is resized dynamically
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      this.isMobile = this.screenWidth <= 800;
    });
    //Text Service for mobile
    this.text_service = ts;

    //Only additional computation needed is listening to TextService
    this.text_service.correctChars$.subscribe((chars) => {
      this.correctChars = chars;
      this.calculateWpm();
    })

  }

  //Toggles the upgrades menu
  toggleUpgradesMenu(event: Event) {
    event.stopPropagation();
    this.isUpgradesOpen = !this.isUpgradesOpen;
    if (this.isUpgradesOpen) this.isSidebarOpen = false;
  }

  //Borrowed from upgrades component to independently calculate upgrade costs
  getCost(upgrade: UPGRADES): number {
    return this.gameStateService.getUpgradeCost(upgrade);
  }

  //Toggles the menu sidebar
  toggleSidebar(event: Event) {
    // Prevent toggling the sidebar when the spacebar is pressed.
    if (event instanceof KeyboardEvent && event.key === ' ') {
      return;
    }
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  //Togles dark mode
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

  //Also borrowed from upgrades component
  buyUpgrade(upgrade: UPGRADES) {
    if(this.gameStateService.upgrade(upgrade))
      {
        this.playCoinSound();
        this.not_enough_money = false;
      }
      else{
        this.playNoMoneySound();
        this.not_enough_money = true;
      }
  }

  //Also borrowed from upgrades component
  coinSound = new Audio('assets/sounds/coin.mp3');

  // Plays coin sound when purchasing an upgrade
  playCoinSound(): void {
    this.coinSound.currentTime = 0;
    this.coinSound.play()
  }

  noMoneySound = new Audio('assets/sounds/no_money.mp3');

  //Also borrowed from upgrades component
  playNoMoneySound(): void {
    this.noMoneySound.currentTime = 0;
    this.noMoneySound.play()
  }

  //Opens a help dialog box
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: { message: "Start typing with the word \"Economy\" above the plinko board. More text will appear as you type. Purchase upgrades using the menu on the right as you play to improve your plinko board! The menu in the upper left allows you to toggle dark mode if desired. Click the Help button in the upper right to see this message again." }
    });
    dialogRef.afterClosed().subscribe(() => {
      // Start clock *after* the dialog closes
      setInterval(() => {
        this.secondsElapsed++;
        this.calculateWpm();
      }, 1000);
    });
  }
}
