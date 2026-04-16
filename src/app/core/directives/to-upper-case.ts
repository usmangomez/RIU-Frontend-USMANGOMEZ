import { Directive, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appToUpperCase]',
})
export class ToUpperCase implements OnInit {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly control = inject(NgControl, { optional: true });

  ngOnInit(): void {
    this.transform(this.el.nativeElement.value);
  }

  @HostListener('input')
  onInput(): void {
    this.transform(this.el.nativeElement.value);
  }

  private transform(value: string): void {
    const upper = value.toUpperCase();
    this.el.nativeElement.value = upper;
    this.control?.control?.setValue(upper, { emitEvent: false });
  }
}
