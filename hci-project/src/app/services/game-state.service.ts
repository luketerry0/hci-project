import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UPGRADES } from '../types';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private currBalance = 0;
  private balanceSubject = new Subject<number>();
  currBalance$ = this.balanceSubject.asObservable();
  upgradeSubject = new Subject<UPGRADES>();
  upgrade$ = this.upgradeSubject.asObservable();

  upgrade_costs = {
    [UPGRADES.HEAVY_BALL]: 500
  }

  score(points: number) {
    this.currBalance = this.currBalance + points;
    this.balanceSubject.next(this.currBalance);
  }

  upgrade(curr_upgrade: UPGRADES){
    // check if we can afford the upgrade
    if (this.currBalance <= this.upgrade_costs[curr_upgrade]){
      this.currBalance = this.currBalance - this.upgrade_costs[curr_upgrade];
      this.upgradeSubject.next(curr_upgrade)
    }
  }
  
}
