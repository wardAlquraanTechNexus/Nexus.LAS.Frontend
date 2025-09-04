# Nexus Entity Management Styles Guide

This guide explains how to use the shared entity management styles that provide consistent look and feel across all person and company modules in the Nexus application.

## Overview

The shared entity management styles are defined in `src/styles/components/_entity-management.scss` and automatically imported through `src/styles.scss`. These styles provide a unified design system for all entity management interfaces.

## Core Concepts

### Consistent Design System
All entity management pages (persons, companies, and future entities) now use the same visual patterns:
- Modern glassmorphism styling with backdrop blur effects
- Consistent spacing, colors, and typography
- Unified form field heights and layouts
- Standardized table styling with hover effects
- Responsive design breakpoints

### Shared CSS Classes

#### 1. Container Layout
```scss
.nexus-entity-container
```
Main container for entity management pages. Provides:
- Full height layout
- Transparent background 
- Proper scrolling behavior
- Flexbox column layout

#### 2. Section Wrapper
```scss
.nexus-entity-section
```
Wraps each major section of the page:
- Consistent 24px margin
- Responsive margin adjustments

#### 3. Page Header
```scss
.nexus-entity-header
```
Title and records count section:
- Card-based styling with glassmorphism effects
- Flexbox layout for title and count
- Proper spacing and typography
- Box shadows and border styling

#### 4. Filters Section
```scss
.nexus-entity-filters
```
Main filters container that includes:
- Search fields
- Filter dropdowns
- Toggle button groups
- Action buttons
- Bulk action panels

#### 5. Data Section
```scss
.nexus-entity-data
```
Contains the data table and related elements:
- Table styling with Material Design enhancements
- Loading states
- Empty states
- Pagination styling

## Detailed Usage

### Filter Components

#### Search Field
```html
<div class="nexus-search-field">
  <mat-form-field appearance="outline">
    <mat-label>Search</mat-label>
    <input matInput [(ngModel)]="searchTerm">
  </mat-form-field>
</div>
```

#### Filter Dropdowns
```html
<div class="nexus-filter-field">
  <mat-form-field appearance="outline">
    <mat-label>Status</mat-label>
    <mat-select [(value)]="selectedStatus">
      <mat-option value="active">Active</mat-option>
      <mat-option value="inactive">Inactive</mat-option>
    </mat-select>
  </mat-form-field>
</div>
```

#### Toggle Groups
```html
<div class="nexus-toggle-group">
  <mat-button-toggle-group [(value)]="entityType" class="nexus-toggle-compact">
    <mat-button-toggle value="public">Public</mat-button-toggle>
    <mat-button-toggle value="private">Private</mat-button-toggle>
  </mat-button-toggle-group>
</div>
```

#### Action Buttons
```html
<div class="nexus-filter-actions">
  <button mat-raised-button class="nexus-btn nexus-btn-primary">
    <mat-icon>add</mat-icon>
    Add New
  </button>
  <button mat-stroked-button class="nexus-btn nexus-btn-secondary">
    <mat-icon>filter_list</mat-icon>
    Filters
  </button>
</div>
```

### Table Implementation

#### Table Container
```html
<div class="nexus-table-container">
  <app-shared-table [data]="entities" [columns]="tableColumns">
  </app-shared-table>
</div>
```

#### Arabic/RTL Column Support
For Arabic text columns, add the `nexus-rtl-column` class:
```html
<mat-cell class="nexus-rtl-column">{{ element.arabicName }}</mat-cell>
```

### Bulk Actions

```html
<div class="nexus-bulk-actions" *ngIf="selectedItems.length > 0">
  <span class="nexus-bulk-count">{{ selectedItems.length }} selected</span>
  <div class="nexus-bulk-buttons">
    <button mat-stroked-button class="nexus-btn nexus-bulk-success">
      <mat-icon>check</mat-icon>
      Activate
    </button>
    <button mat-stroked-button class="nexus-btn nexus-bulk-warning">
      <mat-icon>block</mat-icon>
      Deactivate
    </button>
    <button mat-stroked-button class="nexus-btn nexus-bulk-info">
      <mat-icon>public</mat-icon>
      Make Public
    </button>
  </div>
</div>
```

## Complete Page Example

```html
<div class="nexus-entity-container">
  <!-- Header Section -->
  <div class="nexus-entity-section">
    <div class="nexus-entity-header">
      <div class="nexus-entity-title">
        <h2>All Persons</h2>
      </div>
      <div class="nexus-entity-count">
        Total: {{ totalRecords }}
      </div>
    </div>
  </div>

  <!-- Filters Section -->
  <div class="nexus-entity-section">
    <div class="nexus-entity-filters">
      <div class="nexus-filters-container">
        <!-- Search -->
        <div class="nexus-search-field">
          <mat-form-field appearance="outline">
            <mat-label>Search persons</mat-label>
            <input matInput [(ngModel)]="searchTerm">
          </mat-form-field>
        </div>

        <!-- Filter Dropdowns -->
        <div class="nexus-filter-field">
          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(value)]="selectedStatus">
              <mat-option value="all">All</mat-option>
              <mat-option value="active">Active</mat-option>
              <mat-option value="inactive">Inactive</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Toggle Groups -->
        <div class="nexus-toggle-group">
          <mat-button-toggle-group [(value)]="personType" class="nexus-toggle-compact">
            <mat-button-toggle value="public">Public</mat-button-toggle>
            <mat-button-toggle value="private">Private</mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <div class="nexus-toggle-group">
          <mat-button-toggle-group [(value)]="activeStatus" class="nexus-toggle-normal">
            <mat-button-toggle value="new">New</mat-button-toggle>
            <mat-button-toggle value="active">Active</mat-button-toggle>
            <mat-button-toggle value="inactive">Inactive</mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <!-- Actions -->
        <div class="nexus-filter-actions">
          <button mat-raised-button class="nexus-btn nexus-btn-primary">
            <mat-icon>add</mat-icon>
            Add Person
          </button>
          <button mat-stroked-button class="nexus-btn nexus-btn-secondary">
            <mat-icon>tune</mat-icon>
            Advanced
          </button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="nexus-bulk-actions" *ngIf="selectedPersons.length > 0">
        <span class="nexus-bulk-count">{{ selectedPersons.length }} selected</span>
        <div class="nexus-bulk-buttons">
          <button mat-stroked-button class="nexus-btn nexus-bulk-success">
            <mat-icon>check</mat-icon>
            Activate
          </button>
          <button mat-stroked-button class="nexus-btn nexus-bulk-warning">
            <mat-icon>block</mat-icon>
            Deactivate
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Data Section -->
  <div class="nexus-entity-section">
    <div class="nexus-entity-data">
      <div class="nexus-table-container" *ngIf="!loading; else loadingTemplate">
        <app-shared-table 
          [data]="persons" 
          [columns]="personColumns"
          (selectionChange)="onSelectionChange($event)">
        </app-shared-table>
      </div>

      <ng-template #loadingTemplate>
        <div class="nexus-loading">
          <mat-spinner></mat-spinner>
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

## Action Menu Classes

For consistent action menus, use these classes:

```scss
.nexus-menu-success    // Green hover for positive actions
.nexus-menu-warning    // Orange hover for caution actions  
.nexus-menu-info       // Blue hover for informational actions
.nexus-menu-neutral    // Gray hover for neutral actions
.nexus-menu-danger     // Red hover for destructive actions
```

## Icon Classes

Predefined icon colors:
```scss
.nexus-icon-activate   // Success green
.nexus-icon-deactivate // Warning red
.nexus-icon-public     // Info blue
.nexus-icon-private    // Purple
.nexus-icon-delete     // Dark red
```

## Responsive Behavior

The styles automatically adapt to different screen sizes:
- **Desktop (>1200px)**: Full horizontal layout
- **Tablet (768px-1200px)**: Wrapped filters, maintained functionality
- **Mobile (<768px)**: Stacked layout, full-width elements

## Migration Guide

### From Old Styles
Replace these old classes with new ones:

```scss
// Old                    -> New
.main-container          -> .nexus-entity-container
.section                 -> .nexus-entity-section
.section-title           -> .nexus-entity-header
.section-filters         -> .nexus-entity-filters
.section-data            -> .nexus-entity-data
.filters                 -> .nexus-filters-container
.bulk-actions            -> .nexus-bulk-actions
```

### Component SCSS Files
Individual component SCSS files should now be minimal:

```scss
/* Component Name - Using Nexus Entity Management Styles */

// Component-specific customizations only (if needed)
.component-specific {
  // Only add styles that differ from standard patterns
}
```

## Button Toggle Consistency

The button toggle groups now have enhanced styling for perfect consistency:

### Toggle States
- **Default**: Semi-transparent white background with subtle border
- **Hover**: Light blue background with lift animation
- **Selected**: Blue gradient background with enhanced shadow and bold text
- **Focus**: Clear focus ring for accessibility

### Implementation Notes
- Uses `!important` declarations to override Material Design defaults
- Enhanced animations with `transform: translateY(-1px)` on selection
- Consistent font family and weight inheritance
- Custom ripple and focus overlay colors

## Expandable Advanced Filters

The advanced filters section provides a smooth expansion experience:

### Filter Expansion Behavior
- **Smooth Animation**: `slideDown` animation with 0.3s duration
- **Visual Feedback**: Subtle slide and fade-in effect
- **Organized Layout**: Grid-based responsive layout for filter fields
- **Consistent Styling**: Matches overall Nexus design system

### Filter Container Structure
```html
<div class="additional-filters" *ngIf="showFilters">
  <div class="section">
    <div class="section-header">
      <h3>Company Filters</h3>
    </div>
    <div class="section-body">
      <!-- Filter fields in responsive grid -->
    </div>
  </div>
</div>
```

## Benefits

1. **Consistency**: All entity management pages have identical look and feel
2. **Maintainability**: Single source of truth for styling
3. **Performance**: Reduced CSS duplication
4. **Scalability**: Easy to add new entity types
5. **Accessibility**: Consistent focus states and responsive design
6. **Enhanced UX**: Smooth animations and clear visual feedback

## Future Entities

When adding new entity types (e.g., products, orders), simply:
1. Use the `nexus-entity-*` classes in your templates
2. Create minimal component-specific SCSS for unique requirements
3. Follow the established patterns for consistent UX