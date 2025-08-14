# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `ng serve` or `npm start`
- **Build project**: `ng build` (production) or `ng build --configuration development`
- **Run tests**: `ng test`
- **Watch build**: `ng build --watch --configuration development`
- **Serve SSR**: `npm run serve:ssr:nexus.las`

### Angular CLI
- **Generate component**: `ng generate component component-name`
- **Generate service**: `ng generate service service-name`
- **See available schematics**: `ng generate --help`

## Architecture Overview

### Project Structure
This is an Angular 20+ application using Server-Side Rendering (SSR) with the following key architectural patterns:

#### Layout System
- **AdminLayoutComponent**: Main authenticated layout with sidebar navigation
- **AuthLayoutComponent**: Authentication pages layout
- Routes are lazily loaded through layout components

#### Module Organization
- **Feature modules**: Organized by business domain (person-module, company-module, setting-module, etc.)
- **Base components**: Reusable components in `dashboard-components/base-components/`
- **Shared components**: Common functionality in `components/` and `shared-components/`

#### Core Patterns

**BaseService Pattern**: All services extend `BaseService<T>` which provides:
- Generic CRUD operations (create, update, delete, getById)
- Pagination support via `getByParams()`
- Caching with `getAllCached()`
- Bulk operations with `bulkUpsert()`

**BaseFormComponent Pattern**: Form components extend `BaseFormComponent` which provides:
- Dynamic form group generation from objects
- File upload handling (images/PDFs)
- Base64 file download functionality
- Standard save/cancel event emitters

**Dialog Pattern**: Most forms use Material dialogs with separate dialog and form components:
- `*-dialog.ts`: Dialog wrapper component
- `*-form.ts`: Form logic component

#### Key Directories
- `services/`: API services extending BaseService
- `models/`: TypeScript interfaces and DTOs
- `dashboard-components/`: Feature modules and components
- `guards/`: Route protection (authGuard)
- `interceptors/`: HTTP interceptors for auth and error handling

#### Environment Configuration
- API base URL configured in `environment.ts`
- Extensive route mapping in environment for consistent navigation
- Separate prod/dev configurations

#### UI Framework
- Angular Material for components
- Bootstrap 5.3.7 for layout and styling
- SB Admin 2 theme for admin dashboard styling
- SCSS for component styling

#### Authentication
- JWT-based authentication with AuthService
- Route protection via authGuard
- HTTP interceptors for token management and error handling

#### File Handling
- Support for image and PDF uploads
- Base64 encoding/decoding utilities
- File download functionality in BaseFormComponent

#### Testing
- Jasmine/Karma setup
- Spec files alongside components
- Test configuration in `angular.json`

### Development Notes
- Components follow standalone: false pattern
- Extensive use of dependency injection
- TypeScript strict mode enabled
- Angular SSR configured for better performance