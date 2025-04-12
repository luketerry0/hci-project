import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-typer',
  standalone: true,
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css'],
  host: { '(document:keydown)': 'handleKeyboardEvents($event)' }
})
export class TyperComponent implements AfterViewChecked {
  old_line: string = "";
  curr_line: string = "";
  public textLeft: string = '50%';

  @ViewChild('typedSpan') typedSpan!: ElementRef;

  constructor(private textService: TextService) {
    this.textService.oldLine$.subscribe((typed) => {
      this.old_line = typed;
    });
    this.textService.currLine$.subscribe((line) => {
      this.curr_line = line;
    });
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    this.textService.pressKeyEvent(event);
  }

  ngAfterViewChecked() {
    this.updateTextPosition();
  }

  updateTextPosition() {
    if (this.typedSpan && this.typedSpan.nativeElement) {
      const typedWidth = this.typedSpan.nativeElement.offsetWidth;
      this.textLeft = `calc(50% - ${typedWidth}px)`;
    }
  }
}
