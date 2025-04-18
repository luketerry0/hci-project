import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UPGRADES } from '../types';
// Need GameStateService to track the cost of each upgrade
import { GameStateService } from '../services/game-state.service';


@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.css'
})
export class UpgradesComponent {
    gameStateService: GameStateService;
    upgrades = UPGRADES;
    not_enough_money = false;

    constructor(gss: GameStateService){
      this.gameStateService = gss;
    }
    // Deducts upgrade cost from current total, otherwise sets 
    // not_enough_money to true
  buyUpgrade(upgrade: UPGRADES){
    if(this.gameStateService.upgrade(upgrade))
    {
      this.playCoinSound();
      this.not_enough_money = false;
    }
    else{
      this.not_enough_money = true;
    }
  }
  // Gets cost of the upgrade from GameStateService
  getCost(upgrade: UPGRADES): number {
    return this.gameStateService.getUpgradeCost(upgrade);
  }

  coinSound = new Audio('assets/sounds/coin.mp3');

  // Plays coin sound when purchasing an upgrade
  playCoinSound(): void {
    this.coinSound.currentTime = 0;
    this.coinSound.play()
  }
  
  
}