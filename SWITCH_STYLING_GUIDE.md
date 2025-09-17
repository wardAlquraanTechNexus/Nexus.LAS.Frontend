# Switch/Toggle Styling Guide

## Overview
The application uses a global styling system for all `mat-slide-toggle` components to ensure consistency across the entire application.

## Global Classes

### Basic Implementation
```html
<!-- Basic switch with global styling -->
<div class="nexus-switch-wrapper">
    <div class="nexus-switch-container">
        <mat-slide-toggle formControlName="yourControl" color="primary" class="nexus-switch">
            Your Label
        </mat-slide-toggle>
    </div>
</div>
```

### Available Classes

#### Container Classes
- `nexus-switch-wrapper` - Main wrapper for the switch field
- `nexus-switch-container` - Container for the switch element
- `nexus-switch-label` - Optional label above the switch (if needed)

#### Switch Classes
- `nexus-switch` - Base class for consistent switch styling
- `nexus-switch-table` - For switches in data tables
- `nexus-switch-filter` - For switches in filter sections
- `nexus-switch-form-style` - For switches in forms with background

#### Color Variants
- `nexus-switch-success` - Green color scheme
- `nexus-switch-warning` - Orange color scheme
- `nexus-switch-danger` - Red color scheme

## Usage Examples

### In Forms
```html
<div class="col-6">
    <div class="nexus-switch-wrapper">
        <div class="nexus-switch-container">
            <mat-slide-toggle formControlName="isActive" color="primary" class="nexus-switch">
                Active Status
            </mat-slide-toggle>
        </div>
    </div>
</div>
```

### In Tables
```html
<mat-slide-toggle
    [checked]="element.active"
    color="primary"
    class="nexus-switch nexus-switch-table"
    (change)="onToggleChange($event)">
</mat-slide-toggle>
```

### With Label
```html
<div class="nexus-switch-wrapper">
    <label class="nexus-switch-label">Status Configuration</label>
    <div class="nexus-switch-container">
        <mat-slide-toggle formControlName="status" color="primary" class="nexus-switch">
            Enable Feature
        </mat-slide-toggle>
    </div>
</div>
```

### Color Variants
```html
<!-- Success variant -->
<mat-slide-toggle class="nexus-switch nexus-switch-success">
    Approved
</mat-slide-toggle>

<!-- Warning variant -->
<mat-slide-toggle class="nexus-switch nexus-switch-warning">
    Pending Review
</mat-slide-toggle>

<!-- Danger variant -->
<mat-slide-toggle class="nexus-switch nexus-switch-danger">
    Disabled
</mat-slide-toggle>
```

## Styling Details

### Default Appearance
- **Height**: 56px (consistent with form fields)
- **Padding**: 12px horizontal
- **Background**: Transparent with subtle hover effect
- **Border**: None (clean, modern look)
- **Hover**: Light background shade (3% opacity)

### Color Scheme
- **Primary Color**: #013772 (Nexus primary)
- **Track Color**: rgba(1, 55, 114, 0.2) when unchecked
- **Handle Color**: #013772 when checked
- **Text Color**: #333 (Nexus dark gray)

### Responsive
- Mobile devices: Reduced height to 48px
- Smaller padding on mobile screens

## File Locations
- **Global Styles**: `src/styles/components/_switches.scss`
- **Variables**: `src/styles/themes/_variables.scss`
- **Main Import**: `src/styles.scss`

## Migration Guide

### Old Implementation
```html
<mat-slide-toggle formControlName="active">Active</mat-slide-toggle>
```

### New Implementation
```html
<div class="nexus-switch-wrapper">
    <div class="nexus-switch-container">
        <mat-slide-toggle formControlName="active" color="primary" class="nexus-switch">
            Active
        </mat-slide-toggle>
    </div>
</div>
```

## Best Practices

1. **Always use the wrapper structure** for form contexts
2. **Apply the `nexus-switch` class** to all toggles
3. **Include `color="primary"`** for consistent theming
4. **Use context-specific classes** (nexus-switch-table, nexus-switch-filter) when appropriate
5. **Avoid local style overrides** - extend the global styles if customization is needed

## Notes
- The switch styling is automatically included in all components via the global styles
- No need to import the switch styles in individual components
- The styles work with Angular Material's mat-slide-toggle component
- Animations are included for smooth state transitions