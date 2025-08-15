import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Base component class that provides automatic subscription cleanup.
 * Extend this class in any component that has subscriptions to prevent memory leaks.
 * 
 * Usage:
 * ```typescript
 * export class MyComponent extends DestroyableComponent {
 *   ngOnInit() {
 *     this.myService.getData()
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe(data => {
 *         // Handle data
 *       });
 *   }
 * }
 * ```
 */
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