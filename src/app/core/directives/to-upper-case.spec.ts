import { provideZonelessChangeDetection, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToUpperCase } from './to-upper-case';

@Component({
  template: `<input appToUpperCase />`,
  imports: [ToUpperCase],
})
class TestHostComponent {}

describe('ToUpperCase', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should transform input value to uppercase', () => {
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('HELLO');
  });
});
