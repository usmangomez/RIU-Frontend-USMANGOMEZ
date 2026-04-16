import { Injectable, signal } from '@angular/core';
import { Portal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class SecondLevelService {
  readonly actionsPortal = signal<Portal<unknown> | null>(null);

  setActions(portal: Portal<unknown>): void {
    this.actionsPortal.set(portal);
  }

  clearActions(): void {
    this.actionsPortal.set(null);
  }
}
