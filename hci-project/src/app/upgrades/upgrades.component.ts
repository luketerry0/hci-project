import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';


@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [],
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.css'
})
export class UpgradesComponent {
    gameStateService: GameStateService;
    upgrades = UPGRADES;
    constructor(gss: GameStateService){
      this.gameStateService = gss;
    }
  buyUpgrade(upgrade: UPGRADES){
    if(this.gameStateService.upgrade(upgrade))
    {
      this.playCoinSound();
    }
  }
  getCost(upgrade: UPGRADES): number {
    return this.gameStateService.getUpgradeCost(upgrade);
  }

  coinSound = new Audio('assets/sounds/coin.mp3');

  playCoinSound(): void {
    this.coinSound.currentTime = 0;
    this.coinSound.play()
  }
  
  
}