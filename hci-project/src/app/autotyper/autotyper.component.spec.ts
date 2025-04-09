import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotyperComponent } from './autotyper.component';

describe('AutotyperComponent', () => {
  let component: AutotyperComponent;
  let fixture: ComponentFixture<AutotyperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutotyperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutotyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
