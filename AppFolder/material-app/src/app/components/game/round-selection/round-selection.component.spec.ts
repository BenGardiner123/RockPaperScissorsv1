import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSelectionComponent } from './round-selection.component';

describe('RoundSelectionComponent', () => {
  let component: RoundSelectionComponent;
  let fixture: ComponentFixture<RoundSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
