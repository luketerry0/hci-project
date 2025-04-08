import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private file_lines: string[];
  private curr_line = 0;
  private curr_passage = "";
  private curr_char = "";
  private currLineSubject = new Subject<string>();
  currLine$ = this.currLineSubject.asObservable();
  private old_line = "";
  private oldLineSubject = new Subject<string>();
  oldLine$ = this.oldLineSubject.asObservable();
  private letterSubject = new Subject<string>();
  letterTyped$ = this.letterSubject.asObservable();
  private string_length = 50;
  private game_state_service : GameStateService;
  private curr_index = 0;


  constructor(gss: GameStateService){
    this.file_lines = ['loading...']
    this.game_state_service = gss
    this.game_state_service.upgrade$.subscribe((upgrade) => {
      if (upgrade[UPGRADES.NEW_TEST] != this.curr_index){
        this.curr_index = upgrade[UPGRADES.NEW_TEST];
        this.loadText(this.curr_index);
      }
    })
  }

  loadText(index: number) {
    const filePath = `assets/texts/text${index}.txt`;
  
    fetch(filePath)
      .then((res) => res.text())
      .then((text) => {
        this.file_lines = text.split('\n');
        this.curr_line = 0;
        this.old_line = "";  // reset
        this.curr_passage = this.file_lines[this.curr_line];
        this.curr_char = this.curr_passage[0];
  
        this.currLineSubject.next(this.curr_passage.slice(0, this.string_length));
        this.oldLineSubject.next(this.old_line);
      })
      .catch((e) => console.error("Could not load file:", filePath, e));
  }
  

  pressKeyEvent(event: KeyboardEvent) {
    const key = event.key;
    if (key == this.curr_char){
      if(this.old_line.length > 15){
        this.old_line = this.old_line.slice(1);
      }
      this.old_line+= key;
      this.oldLineSubject.next(this.old_line);
      this.letterSubject.next(key);
      this.curr_passage = this.curr_passage.slice(1);
      while(this.curr_passage.length == 0){
        this.old_line = ""
        this.curr_line = this.curr_line + 1
        this.curr_passage = this.file_lines[this.curr_line];
      }
      this.curr_char = this.curr_passage[0];
      this.currLineSubject.next(this.curr_passage.slice(0, this.string_length));
    }
  }

}
