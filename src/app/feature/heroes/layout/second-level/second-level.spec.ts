import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLevel } from './second-level';

describe('SecondLevel', () => {
  let component: SecondLevel;
  let fixture: ComponentFixture<SecondLevel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondLevel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondLevel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
