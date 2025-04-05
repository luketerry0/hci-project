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
    [UPGRADES.SMALL_BALL_MULTIPLER]: 500
  }
  upgrades = {
    [UPGRADES.HEAVY_BALL_MULTIPLIER]: 0,
    [UPGRADES.INVERSE_BOUNCE_MULTIPLER]: 4,
    [UPGRADES.SMALL_BALL_MULTIPLER]: 1
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


  score(points: number) {
    this.currBalance = this.currBalance + points;
    this.balanceSubject.next(this.currBalance);
  }

  upgrade(curr_upgrade: UPGRADES){
    // check if we can afford the upgrade
    if (this.currBalance >= this.upgrade_costs[curr_upgrade]){
      this.currBalance = this.currBalance - this.upgrade_costs[curr_upgrade];
      this.upgrades[curr_upgrade] += 1
      this.balanceSubject.next(this.currBalance);
      this.upgradeSubject.next(this.upgrades);
    }
  }

  getUpgrades(): UpgradeObject{
    return this.upgrades;
  }

  getGameState(): GameState{
    return this.game_state;
  }
  
}
