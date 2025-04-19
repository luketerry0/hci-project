import { Component } from '@angular/core';
import { TextService } from '../services/text.service';
import { CommonModule } from '@angular/common';

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

constructor(ts: TextService){
  this.text_service = ts;

  // when a correct character is typed, recalculate wpm
  this.text_service.correctChars$.subscribe((chars) => {
    this.correctChars = chars;
    this.calculateWpm();
  });

  // periodically recalculate the words per minute
  setInterval(() => {
    this.secondsElapsed = this.secondsElapsed + 1;
    this.calculateWpm();
  }, 1000); 
  };
  
}
