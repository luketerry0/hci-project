import { Component } from '@angular/core';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-typer',
  standalone: true,
  imports: [],
  templateUrl: './typer.component.html',
  styleUrl: './typer.component.css',
  host: {'(document:keydown)': 'handleKeyboardEvents($event)'}
})
export class TyperComponent {
  textService: TextService;
  curr_line: string = "";

  constructor(textService: TextService){
    this.textService = textService;
    this.textService.currLine$.subscribe((line) => {
      this.curr_line = line;
    });
  }

  handleKeyboardEvents(event: KeyboardEvent){
    this.textService.pressKeyEvent(event);
  }
}
