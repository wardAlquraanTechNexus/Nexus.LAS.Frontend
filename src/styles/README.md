# Nexus LAS Unified Styling System

This document describes the unified styling system implemented for the Nexus LAS application, which consolidates Angular Material theming with custom components.

## 🎨 Theme Structure

### Core Files
- `themes/_theme.scss` - Main Angular Material theme configuration
- `themes/_variables.scss` - Centralized SCSS variables for consistent theming
- `components/_buttons.scss` - Button component styles
- `components/_cards.scss` - Card component styles  
- `components/_forms.scss` - Form and input styles

### Usage
The theme is automatically imported in `styles.scss` and available throughout the application.

## 🔧 Key Features

### 1. **Unified Color Palette**
```scss
// Primary brand colors
$nexus-primary: #013772;
$nexus-primary-light: #0056b3;
$nexus-primary-dark: #001122;

// Status colors
$nexus-success: #4caf50;
$nexus-warn: #f44336;
$nexus-info: #2196f3;
```

### 2. **Consistent Typography**
- Font family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
- Standardized font sizes (xs to 3xl)
- Consistent font weights (light to bold)
- Proper line heights for readability

### 3. **Modular Components**

#### Buttons
```html
<!-- Primary button -->
<button class="nexus-btn nexus-btn-primary nexus-btn-md">Save</button>

<!-- Secondary button -->
<button class="nexus-btn nexus-btn-secondary nexus-btn-sm">Cancel</button>

<!-- Icon button -->
<button class="nexus-btn nexus-btn-icon nexus-btn-primary">
  <mat-icon>add</mat-icon>
</button>
```

#### Cards
```html
<!-- Standard card -->
<div class="nexus-card">
  <div class="nexus-card-header">
    <h3 class="nexus-card-title">Card Title</h3>
    <p class="nexus-card-subtitle">Subtitle</p>
  </div>
  <div class="nexus-card-body">
    Content here
  </div>
  <div class="nexus-card-footer">
    <button class="nexus-btn nexus-btn-primary">Action</button>
  </div>
</div>

<!-- Status cards -->
<div class="nexus-card nexus-card-success">...</div>
<div class="nexus-card nexus-card-warning">...</div>
<div class="nexus-card nexus-card-danger">...</div>
```

#### Forms
```html
<!-- Form container -->
<form class="nexus-form">
  <!-- Form group -->
  <div class="nexus-form-group">
    <label class="nexus-form-label">Label</label>
    <mat-form-field>
      <input matInput placeholder="Enter value">
    </mat-form-field>
    <div class="nexus-form-help">Help text</div>
  </div>
  
  <!-- Form row layout -->
  <div class="nexus-form-row nexus-form-row-2">
    <mat-form-field>
      <input matInput placeholder="First field">
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="Second field">
    </mat-form-field>
  </div>
  
  <!-- Form actions -->
  <div class="nexus-form-actions">
    <button type="button" class="nexus-btn nexus-btn-secondary">Cancel</button>
    <button type="submit" class="nexus-btn nexus-btn-primary">Save</button>
  </div>
</form>
```

### 4. **Design Tokens**

#### Spacing
- `$nexus-spacing-xs` (4px) to `$nexus-spacing-3xl` (64px)
- Consistent 8px grid system

#### Shadows
- `$nexus-shadow-xs` - Subtle shadows for cards
- `$nexus-shadow-sm` - Light shadows for inputs
- `$nexus-shadow-md` - Medium shadows for elevated content
- `$nexus-shadow-lg` - Heavy shadows for modals/overlays
- `$nexus-shadow-xl` - Maximum shadows for floating elements

#### Border Radius
- `$nexus-border-radius-sm` (8px) - Small elements
- `$nexus-border-radius-md` (12px) - Standard elements  
- `$nexus-border-radius-lg` (16px) - Large containers
- `$nexus-border-radius-xl` (20px) - Extra large elements

## 🔄 Migration from Previous System

### Removed Dependencies
- ❌ SB Admin 2 CSS (removed from angular.json)
- ❌ Azure Blue Material theme (replaced with custom theme)
- ✅ Bootstrap 5.3.7 (retained for grid system)

### Backward Compatibility
Legacy classes are maintained with `@extend` directives:
```scss
// Legacy support
.content-card {
  @extend .nexus-card;
  padding: vars.$nexus-spacing-lg;
  margin-bottom: vars.$nexus-spacing-lg;
}
```

### Updated Files
- `src/styles.scss` - Main stylesheet updated
- `src/app/styles/snackbar-styles.scss` - Using theme variables
- `src/app/auth-components/shared/auth-styles.scss` - Unified theming
- `src/app/dashboard-components/_shared/modern-theme.scss` - Theme integration

## 🚀 Benefits

1. **Reduced Bundle Size** - Removed duplicate CSS frameworks
2. **Consistent Design** - Single source of truth for colors, spacing, typography
3. **Better Maintainability** - Centralized theme variables
4. **Enhanced Developer Experience** - Clear component classes and documentation
5. **Improved Performance** - Optimized CSS with proper cascading

## 📝 Best Practices

### Component Styling
1. Use theme variables instead of hardcoded values
2. Prefer component classes over global styles
3. Follow the spacing scale for consistent layouts
4. Use semantic color names (primary, success, warn)

### CSS Organization
1. Import theme variables: `@use 'styles/themes/variables' as vars;`
2. Use component-specific SCSS files for complex styling
3. Leverage existing component classes before creating custom ones
4. Maintain responsive design with breakpoint variables

### Development Workflow
1. Check existing component classes before writing custom CSS
2. Use browser dev tools to inspect CSS custom properties
3. Test across different screen sizes using breakpoint variables
4. Validate color contrast and accessibility

## 🔧 Customization

### Adding New Components
Create new component SCSS files in `src/styles/components/`:
```scss
@use '../themes/variables' as vars;

.nexus-my-component {
  background: vars.$nexus-bg-card;
  border-radius: vars.$nexus-border-radius-md;
  padding: vars.$nexus-spacing-md;
  // ...
}
```

### Extending the Theme
Add new variables to `_variables.scss`:
```scss
// New color variables
$nexus-tertiary: #6366f1;
$nexus-tertiary-light: #818cf8;
$nexus-tertiary-dark: #4338ca;
```

### Dark Mode Support
The theme structure supports easy dark mode implementation by modifying CSS custom properties in `_theme.scss`.

---

This unified styling system provides a solid foundation for consistent, maintainable, and scalable UI development across the Nexus LAS application.