import { Component } from '@angular/core';
import { TextService } from '../services/text.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

// this component displays the user's typing stats to the left of the plinko board
@Component({
  selector: 'app-typing-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typing-stats.component.html',
  styleUrl: './typing-stats.component.css'
})
export class TypingStatsComponent {
text_service: TextService
correctChars: number = 0;
secondsElapsed: number = 0;
wpm: number = 0; // words per minute

// method to calculate the words per minute that the user is typing at
// actual equation for calculating wpm lovingly stolen from https://monkeytype.com/about
calculateWpm(){
  this.wpm = ((this.correctChars*60)/5)/this.secondsElapsed
}

constructor(ts: TextService, public dialog: MatDialog){
  this.text_service = ts;

  // when a correct character is typed, recalculate wpm
  this.text_service.correctChars$.subscribe((chars) => {
    this.correctChars = chars;
    this.calculateWpm();
  });

  // periodically recalculate the words per minute
  this.openDialog();
  };

    //Opens a help dialog box
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        data: { message: "Start typing with the word \"Economy\" above the plinko board. More text will appear as you type. Purchase upgrades using the menu on the right as you play to improve your plinko board! The menu in the upper left allows you to toggle dark mode if desired. Click the Help button in the upper right to see this message again." }
      });
      dialogRef.afterClosed().subscribe(() => {
        // Start clock *after* the dialog closes
        setInterval(() => {
          this.secondsElapsed++;
          this.calculateWpm();
        }, 1000);
      });
    }
  
}
