import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GameState, UpgradeObject, UPGRADES } from '../types';

@Injectable({
  providedIn: 'root'
})
// this service keeps track of various parameters about the game
export class GameStateService {

  // begin with a balance of zero
  private currBalance = 0;

  // expose the balance as an observable so that components can update when balance does
  private balanceSubject = new Subject<number>();
  currBalance$ = this.balanceSubject.asObservable();

  // The initial cost of each upgrade. This increases the more times they're bought
  upgrade_costs = {
    [UPGRADES.HEAVY_BALL_MULTIPLIER]: 500,
    [UPGRADES.INVERSE_BOUNCE_MULTIPLER]: 500,
    [UPGRADES.SMALL_BALL_MULTIPLER]: 500,
    [UPGRADES.NEW_TEST]: 500,
    [UPGRADES.AUTOTYPER]: 5000,
    [UPGRADES.BUCKET_VAL_MULTIPLIER]: 500,
    [UPGRADES.AUTOTYPER_SPEED]: 5000,
    [UPGRADES.REMOVE_PEG]: 500000
  }

  // the values assigned to each upgrade.
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

  // parameters that affect gameplay
  game_state = {
    rows: 10,
    max_bucket : 500,
    min_bucket : 20,
    spacing_between_pegs: 35,
    peg_radius: 4,
    ball_radius: 6
  }
  
  // share the game state as an observable
  private gameStateSubject = new Subject<GameState>();
  gameState$ = this.gameStateSubject.asObservable();

  // share purchased upgrades as an observable
  private upgradeSubject = new Subject<UpgradeObject>();
  upgrade$ = this.upgradeSubject.asObservable();

  // share whether dark mode is enabled as an observable
  private darkModeSubject = new Subject<boolean>();
  darkMode$ = this.darkModeSubject.asObservable();

  // method to score a number of points (earning currency)
  score(points: number) {
    this.currBalance = this.currBalance + points;
    this.balanceSubject.next(this.currBalance);
  }

  // method to purchase an upgrade
  upgrade(curr_upgrade: UPGRADES): boolean {
    const cost = this.getUpgradeCost(curr_upgrade);
    // check if we can afford the upgrade
    if (this.currBalance >= cost) {
      // update the balance, purchase the upgrade
      this.currBalance -= cost;
      this.upgrades[curr_upgrade] += 1;
  
      // update observables, propagating changes through the app
      this.balanceSubject.next(this.currBalance);
      this.upgradeSubject.next(this.upgrades);
      return true;
    }
    return false;
  }

  // method to get the cost of an upgrade
  getUpgradeCost(upgrade: UPGRADES): number {
    const base = this.upgrade_costs[upgrade];
    const level = this.upgrades[upgrade] || 0;
    // raises the price of an upgrade based on the number of times it's been purchased expontentially
    return Math.floor(base * Math.pow(1.5, level));
  }

  // method to get the purchased upgrades
  getUpgrades(): UpgradeObject{
    return this.upgrades;
  }

  // method to reset the text to the first one
  resetTexts() {
    this.upgrades[UPGRADES.NEW_TEST] = 0;
  }

  // method to get the game state
  getGameState(): GameState{
    return this.game_state;
  }

  // method to enable/disable dark mode
  setDarkMode(dark: boolean){
    this.darkModeSubject.next(dark);
  }
}
