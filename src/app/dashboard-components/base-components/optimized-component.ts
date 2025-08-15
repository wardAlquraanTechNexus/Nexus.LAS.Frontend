import { ChangeDetectionStrategy, Component, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Base component with OnPush change detection and automatic cleanup.
 * Provides significant performance improvements for components.
 * 
 * Use this as the base for all components that don't require constant change detection.
 * 
 * Usage:
 * ```typescript
 * @Component({
 *   selector: 'app-my-component',
 *   templateUrl: './my-component.html',
 *   changeDetection: ChangeDetectionStrategy.OnPush
 * })
 * export class MyComponent extends OptimizedComponent {
 *   // Component logic
 * }
 * ```
 */
@Directive()
export abstract class OptimizedComponent implements OnDestroy {
  /**
   * Subject for cleanup of subscriptions
   */
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Configuration for OnPush components
 */
export const ONPUSH_CONFIG = {
  changeDetection: ChangeDetectionStrategy.OnPush
};

/**
 * Helper function to create component metadata with OnPush
 */
export function OnPushComponent(config: any) {
  return Component({
    ...config,
    changeDetection: ChangeDetectionStrategy.OnPush
  });
}