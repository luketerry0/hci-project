import { Component } from '@angular/core';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-autotyper',
  standalone: true,
  imports: [],
  templateUrl: './autotyper.component.html',
  styleUrl: './autotyper.component.css'
})
export class AutotyperComponent {
  old_line: string = "";
  file_lines = [''];
  curr_line_idx = 0;
  idx_in_line = 0;
  full_line = "";
  new_line = "";
  text_service: TextService

  loadText(index: number) {
    const filePath = `assets/texts/auto${index}.txt`;
  
    fetch(filePath)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        this.file_lines = text.split('\n');
        this.curr_line_idx = 0;
        this.old_line = "";  // reset
        this.new_line = this.file_lines[this.curr_line_idx];
        this.full_line = this.new_line;
      })
      .catch((e) => console.error("Could not load file:", filePath, e));
  }

  advance(){
    this.text_service.autoTyperCharacter(this.full_line[this.idx_in_line]);
    if (this.idx_in_line == this.full_line.length - 1){
      this.curr_line_idx += 1;
      this.full_line = this.file_lines[this.idx_in_line];
      this.idx_in_line = 0;
    }
    this.idx_in_line = this.idx_in_line + 1;
    this.old_line = this.full_line.slice(0, this.idx_in_line);
    this.new_line = this.full_line.slice(this.idx_in_line);
  }

  constructor(ts: TextService){
    // bind text service
    this.text_service = ts;

    // load in text
    this.loadText(0);

    // advance every second
    setInterval(() => {
      this.advance();
    }, 1000); 
  }
}
