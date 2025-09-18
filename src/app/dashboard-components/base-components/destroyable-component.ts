import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Directive()
export abstract class DestroyableComponent implements OnDestroy {
  /**
   * Subject that emits when the component is destroyed.
   * Use with takeUntil operator to automatically unsubscribe from observables.
   */
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}