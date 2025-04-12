import { of } from 'rxjs';

class MockTextService {
  oldLine$ = of('');         // Provide initial empty string or dummy text as needed
  currLine$ = of('Sample text');
  pressKeyEvent(event: KeyboardEvent) {}
}
