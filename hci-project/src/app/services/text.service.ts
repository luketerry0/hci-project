import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UPGRADES } from '../types';
import { GameStateService } from '../services/game-state.service';

@Injectable({
  providedIn: 'root'
})
// this method keeps track of the text that the user is typing
export class TextService {
  // keep track of each line in the text file provided
  private file_lines: string[];
  // keep track of the current part of that text being typed
  private curr_line = 0;
  private curr_passage = "";
  private curr_char = "";

  // display the line currently being typed as an observable
  private currLineSubject = new Subject<string>();
  currLine$ = this.currLineSubject.asObservable();

  // display the portion of the line most recently typed as an observable
  private old_line = "";
  private oldLineSubject = new Subject<string>();
  oldLine$ = this.oldLineSubject.asObservable();

  // display the letter typed as an observable
  private letterSubject = new Subject<string>();
  letterTyped$ = this.letterSubject.asObservable();
  
  // communicate with game state service
  private game_state_service : GameStateService;

  // constants relating to the display of the text
  private string_length = 50;
  private curr_index = 0;
  private NUM_TEXTS = 2
  private correctCharsTyped = 0;
  
  // display the number of characters correctly typed, as an observable
  private correctCharsTypedSubject = new Subject<number>()
  correctChars$ = this.correctCharsTypedSubject.asObservable();


  constructor(gss: GameStateService){
    this.file_lines = ['loading...']
    this.game_state_service = gss
    
    // when a user buys an upgrade, swap the text if that was the upgrade they bought
    this.game_state_service.upgrade$.subscribe((upgrade) => {
      if (upgrade[UPGRADES.NEW_TEST] != this.curr_index){
        if (upgrade[UPGRADES.NEW_TEST] >= this.NUM_TEXTS){
          this.curr_index = 0
          this.game_state_service.resetTexts();
        }else{
          this.curr_index = upgrade[UPGRADES.NEW_TEST];
        }
        this.loadText(this.curr_index);
      }
    })
  }

  // loads one of the texts from the assets directory
  loadText(index: number) {
    const filePath = `assets/texts/text${index}.txt`;
  
    fetch(filePath)
      .then((res) => res.text())
      .then((text) => {
        // reset the params of this object to reflect the new text
        this.file_lines = text.split('\n');
        this.curr_line = 0;
        this.old_line = "";  // reset
        this.curr_passage = this.file_lines[this.curr_line];
        this.curr_char = this.curr_passage[0];
  
        // update observables
        this.currLineSubject.next(this.curr_passage.slice(0, this.string_length));
        this.oldLineSubject.next(this.old_line);
      })
      .catch((e) => console.error("Could not load file:", filePath, e));
  }
  

  // handles a keypress
  pressKeyEvent(event: KeyboardEvent) {
    const key = event.key;
    // check if the key was the correct character
    if (key == this.curr_char){
      
      // add one to the number of characters correctly typed
      this.correctCharsTyped = this.correctCharsTyped + 1;
      this.correctCharsTypedSubject.next(this.correctCharsTyped);

      // remove the first character of the greyed out "old line" portion
      if(this.old_line.length > 15){
        this.old_line = this.old_line.slice(1);
      }
      // add the key typed to the old line portion
      if(this.curr_passage.length > 1){
      this.old_line += key;
      }
      else{
        this.old_line = ""
      }
      // update old line and key typed observables
      this.oldLineSubject.next(this.old_line);
      this.letterSubject.next(key);

      // reflect the typing in the passage we're currently typing
      this.curr_passage = this.curr_passage.slice(1);
      // if the passage length is zero, grab a new line until a non-empty one is loaded
      while(this.curr_passage.length == 0){
        this.curr_line = this.curr_line + 1
        this.curr_passage = this.file_lines[this.curr_line];
      }
      // update the character that we expect the user to type next
      this.curr_char = this.curr_passage[0];
      // update the current line which the user is yet to type
      this.currLineSubject.next(this.curr_passage.slice(0, this.string_length));
    }
  }

  // method to type a character (dropping a ball) from one of the autotypers
  autoTyperCharacter(char: string){
    this.letterSubject.next(char);
  }
}
