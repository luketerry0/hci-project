import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private currBalance = 0;
  private balanceSubject = new Subject<number>();
  currBalance$ = this.balanceSubject.asObservable();

  score(points: number) {
    this.currBalance = this.currBalance + points;
    this.balanceSubject.next(this.currBalance);
  }
}
