import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GameState, UpgradeObject, UPGRADES } from '../types';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private currBalance = 0;
  private balanceSubject = new Subject<number>();
  currBalance$ = this.balanceSubject.asObservable();


  upgrade_costs = {
    [UPGRADES.HEAVY_BALL_MULTIPLIER]: 500,
    [UPGRADES.INVERSE_BOUNCE_MULTIPLER]: 500,
    [UPGRADES.SMALL_BALL_MULTIPLER]: 500,
    [UPGRADES.NEW_TEST]: 500,
    [UPGRADES.AUTOTYPER]: 0,
    [UPGRADES.BUCKET_VAL_MULTIPLIER]: 500,
    [UPGRADES.AUTOTYPER_SPEED]: 5000,
    [UPGRADES.REMOVE_PEG]: 500000
  }
  upgrades = {
    [UPGRADES.HEAVY_BALL_MULTIPLIER]: 0,
    [UPGRADES.INVERSE_BOUNCE_MULTIPLER]: 4,
    [UPGRADES.SMALL_BALL_MULTIPLER]: 1,
    [UPGRADES.NEW_TEST]: 0,
    [UPGRADES.AUTOTYPER]: 0,
    [UPGRADES.BUCKET_VAL_MULTIPLIER]: 1,
    [UPGRADES.AUTOTYPER_SPEED]: 1,
    [UPGRADES.REMOVE_PEG]: 0
  }

  game_state = {
    rows: 10,
    max_bucket : 500,
    min_bucket : 20,
    spacing_between_pegs: 35,
    peg_radius: 4,
    ball_radius: 6
  }
  
  private gameStateSubject = new Subject<GameState>();
  gameState$ = this.gameStateSubject.asObservable();

  private upgradeSubject = new Subject<UpgradeObject>();
  upgrade$ = this.upgradeSubject.asObservable();

  private darkModeSubject = new Subject<boolean>();
  darkMode$ = this.darkModeSubject.asObservable();


  score(points: number) {
    this.currBalance = this.currBalance + points;
    this.balanceSubject.next(this.currBalance);
  }

  upgrade(curr_upgrade: UPGRADES) {
    console.log(curr_upgrade);
    const cost = this.getUpgradeCost(curr_upgrade);
    // check if we can afford the upgrade
    if (this.currBalance >= cost) {
      this.currBalance -= cost;
      this.upgrades[curr_upgrade] += 1;
  
      this.balanceSubject.next(this.currBalance);
      this.upgradeSubject.next(this.upgrades);
    }
  }

  getUpgradeCost(upgrade: UPGRADES): number {
    const base = this.upgrade_costs[upgrade];
    const level = this.upgrades[upgrade] || 0;
    return Math.floor(base * Math.pow(1.5, level));
  }

  getUpgrades(): UpgradeObject{
    return this.upgrades;
  }

  resetTexts() {
    this.upgrades[UPGRADES.NEW_TEST] = 0;
  }

  getGameState(): GameState{
    return this.game_state;
  }

  setDarkMode(dark: boolean){
    this.darkModeSubject.next(dark);
  }
  
}
