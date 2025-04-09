import { Component } from '@angular/core';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-typing-stats',
  standalone: true,
  imports: [],
  templateUrl: './typing-stats.component.html',
  styleUrl: './typing-stats.component.css'
})
export class TypingStatsComponent {
text_service: TextService
correctChars: number = 0;
secondsElapsed: number = 0;
wpm: number = 0; // words per minute

calculateWpm(){
  this.wpm = ((this.correctChars*60)/5)/this.secondsElapsed
}

constructor(ts: TextService){
  this.text_service = ts;
  this.text_service.correctChars$.subscribe((chars) => {
    this.correctChars = chars;
    this.calculateWpm();
  });

  // increment the clock each second
  setInterval(() => {
    this.secondsElapsed = this.secondsElapsed + 1;
    this.calculateWpm();
  }, 1000); 
  };
}
