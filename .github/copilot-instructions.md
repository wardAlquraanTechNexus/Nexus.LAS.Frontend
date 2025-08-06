# Nexus LAS Frontend - AI Coding Agent Instructions

## Architecture Overview

This is an Angular 20+ application for a Legal Administration System (LAS) with SSR support. The app follows a modular architecture with layout-based routing and domain-driven organization.

### Key Architecture Patterns

**Layout-Based Routing**: All routes are organized under two main layouts:
- `AdminLayoutComponent` - Main application (authenticated users)
- `AuthLayoutComponent` - Authentication pages (login/register)

**Module Structure**:
- `ComponentsModule` - Shared UI components (sidebar, navbar, footer, tables)
- `DashboardComponentModule` - Feature modules organized by domain (persons, companies, etc.)
- Domain-specific modules under `dashboard-components/` (person-components, company-components, etc.)

**Base Classes Pattern**: All data tables extend `TableFormComponent<T>` which provides:
- Pagination (`BaseParam` interface)
- Sorting (`Sort` from Angular Material)
- Loading states
- Search functionality

## Critical Development Workflows

### Starting Development
```bash
npm start  # Runs ng serve
npm run watch  # Build with watch mode
npm run serve:ssr:nexus.las  # SSR development
```

### Component Generation
Always specify the module when generating components:
```bash
ng generate component dashboard-components/person-components/new-component
```

## Project-Specific Conventions

### Service Architecture
- All services extend `BaseService<T>` which provides CRUD operations and caching
- Services follow naming: `{domain}-service.ts` (e.g., `person-service.ts`)
- API endpoints configured in `environment.ts` under `serverUrls.host`

### Data Flow Patterns
1. **Table Components**: Use `SharedTable` component with `DisplayColumn[]` configuration
2. **Forms**: Extend `TableFormComponent<T>` for consistent pagination/filtering
3. **Models**: Organized by domain under `models/{domain}/` directories

### Authentication & HTTP
- JWT tokens stored in localStorage, automatically attached via `authInterceptor`
- Current pathname sent with all requests for authorization
- Error handling via `errorInterceptor`

### Menu System
- Dynamic sidebar populated from localStorage "menu" key
- Menu structure: `MenuTree` interface with recursive children
- Filter by `inDashboard: true` for sidebar display

## Component Patterns

### Table Components Example (see `all-persons.ts`):
```typescript
export class AllPersons extends TableFormComponent<Person> {
  override params: GetAllPersonQuery = { /* query params */ }
  override displayColumns: DisplayColumn[] = [ /* column config */ ]
  
  // Bulk operations pattern
  selectedPersons: Person[] = [];
  onSelectionChange(selectedRows: Person[]) {
    this.selectedPersons = selectedRows;
  }
}
```

### Service Usage Pattern:
```typescript
// Extend BaseService for standard CRUD
export class PersonService extends BaseService<Person> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath("Persons");  // Sets API endpoint
  }
}
```

## Key Files & Directories

### Essential Configuration
- `src/environment/environment.ts` - API URLs and route definitions
- `src/app/app.config.ts` - HTTP interceptors and global providers
- `src/app/app.routes.ts` - Layout-based routing structure

### Core Components
- `src/app/components/sidebar/` - Dynamic menu system
- `src/app/dashboard-components/shared-components/shared-table/` - Reusable data table
- `src/app/dashboard-components/base-components/table-form-component/` - Base class for tables

### Model Conventions
- `src/app/models/base/` - Shared interfaces (BaseParam, etc.)
- `src/app/models/{domain}/` - Domain-specific models
- `src/app/enums/` - Application enums (PersonStatus, etc.)

## Integration Points

### Backend API
- Base URL: `environment.serverUrls.host` + endpoint
- All requests include JWT token and current pathname
- Paginated responses follow `PaginateResult<T>` interface

### Angular Material Integration
- Form fields use `appearance="outline"`
- Tables use `MatTableDataSource` with selection model
- Icons from Material Icons font

### State Management
- No global state management - relies on services and localStorage
- Menu state in localStorage "menu" key
- User authentication in localStorage "token" and "user" keys

## Common Gotchas

1. **Non-standalone Components**: All components use `standalone: false` - add to module declarations
2. **SSR Considerations**: Use `isPlatformBrowser()` before accessing localStorage/window
3. **Menu Filtering**: Always filter menu items by `inDashboard: true` for sidebar
4. **Routing**: Use `environment.routes.*` constants, not hardcoded paths
5. **Forms**: Use template-driven forms with `[(ngModel)]`, not reactive forms

## Styling Approach
- SCSS with Bootstrap 5.3.7 grid system
- Angular Material components for UI elements
- Custom SCSS in component files following BEM-like naming
