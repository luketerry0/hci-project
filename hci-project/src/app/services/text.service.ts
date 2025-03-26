import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  private letterSubject = new Subject<string>();
  letterTyped$ = this.letterSubject.asObservable();
  private string_length = 50;



  constructor(){
    this.file_lines = ['loading...']
    fetch("assets/texts/walden.txt")
    .then((res) => res.text())
    .then((text) => {
      this.file_lines = text.split('\n');
      this.curr_passage = this.file_lines[this.curr_line];
      this.currLineSubject.next(this.curr_passage);
      this.curr_char = this.curr_passage[0];
    })
    .catch((e) => console.error(e));
  }

  pressKeyEvent(event: KeyboardEvent) {
    const key = event.key;
    // console.log(key)
    // console.log(this.curr_char)
    if (key == this.curr_char){
      this.letterSubject.next(key);
      this.curr_passage = this.curr_passage.slice(1);
      console.log(this.curr_passage.length);
      while(this.curr_passage.length == 0){
        this.curr_line = this.curr_line + 1
        this.curr_passage = this.file_lines[this.curr_line];
        console.log(this.curr_passage)
      }
      this.curr_char = this.curr_passage[0];
      this.currLineSubject.next(this.curr_passage.slice(0, this.string_length));
    }
  }

}
