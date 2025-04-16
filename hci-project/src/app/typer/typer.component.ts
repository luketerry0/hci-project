import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { TextService } from '../services/text.service';


// this component displays the text that the user is typing
@Component({
  selector: 'app-typer',
  standalone: true,
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css'],
  host: { '(document:keydown)': 'handleKeyboardEvents($event)' }
})
export class TyperComponent implements AfterViewChecked {
  // keep track of the old line and curr line to display text before and after the cursos
  old_line: string = "";
  curr_line: string = "";
  public textLeft: string = '50%';

  // reference the span which this component lies in
  @ViewChild('typedSpan') typedSpan!: ElementRef;

  constructor(private textService: TextService) {
    // when the lines of text to display change, change them here
    this.textService.oldLine$.subscribe((typed) => {
      this.old_line = typed;
    });
    this.textService.currLine$.subscribe((line) => {
      this.curr_line = line;
    });
  }

  // when a key is pressed, send the key to the text service to decide what to do
  handleKeyboardEvents(event: KeyboardEvent) {
    this.textService.pressKeyEvent(event);
  }

  // dynamically style the text 
  ngAfterViewChecked() {
    this.updateTextPosition();
  }

  // dynamically style the text position based on the screen size
  updateTextPosition() {
    if (this.typedSpan && this.typedSpan.nativeElement) {
      const typedWidth = this.typedSpan.nativeElement.offsetWidth;
      this.textLeft = `calc(50% - ${typedWidth}px)`;
    }
  }
}
