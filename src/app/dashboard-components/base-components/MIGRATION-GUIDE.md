# Component Migration Guide

## How to Apply OnPush Change Detection

### For New Components
```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OptimizedComponent } from '../base-components/optimized-component';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush  // Add this line
})
export class MyComponent extends OptimizedComponent {
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  // When you need to update the view manually:
  updateData() {
    // ... data changes
    this.cdr.markForCheck(); // Trigger change detection
  }
}
```

### For Existing Components

1. Add `changeDetection: ChangeDetectionStrategy.OnPush` to @Component decorator
2. Inject `ChangeDetectorRef` in constructor
3. Call `cdr.markForCheck()` after async operations that update the view
4. Extend `OptimizedComponent` for automatic cleanup

### When to Use markForCheck()

Call `this.cdr.markForCheck()` after:
- HTTP responses update component data
- Timer/interval callbacks
- User events that modify data
- Any async operation that changes displayed values

### Components That Should Use OnPush

✅ Good candidates:
- List/table components
- Card components
- Static display components
- Components with @Input() properties

❌ Avoid OnPush for:
- Components with frequent DOM updates
- Components using third-party libraries that manipulate DOM directly

## TypeScript Best Practices

### Replace 'any' with Proper Types

#### Before:
```typescript
@Input() object: any;
data: any[] = [];
```

#### After:
```typescript
import { BaseEntity } from '../models/base/base-entity';

@Input() object: Person | null = null;
data: Person[] = [];
```

### Use Generic Types

```typescript
export class TableComponent<T extends BaseEntity> {
  data: T[] = [];
  
  processItem(item: T): void {
    // Type-safe operations
  }
}
```

## Memory Leak Prevention

### Always Clean Up Subscriptions

```typescript
export class MyComponent extends OptimizedComponent {
  loadData() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))  // Auto-cleanup
      .subscribe(data => {
        this.data = data;
        this.cdr.markForCheck();
      });
  }
}
```

## Error Handling Pattern

```typescript
fetchData(): void {
  this.loading = true;
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error:', error);
        this.snackBar.open('Error loading data', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.cdr.markForCheck();
      }
    });
}
```