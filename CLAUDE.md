# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `ng serve` or `npm start`
- **Build project**: `ng build` (production) or `ng build --configuration development`
- **Run tests**: `ng test`
- **Watch build**: `ng build --watch --configuration development`
- **Serve SSR**: `npm run serve:ssr:nexus.las`

### Build Validation
- **Always run build after style changes**: `ng build` to ensure no compilation errors or warnings
- **Development build verification**: `ng build --configuration development` for faster testing  
- **Production build test**: `ng build --configuration production`
- **Watch mode for development**: `ng build --watch --configuration development`
- **Warning-free requirement**: All builds must complete without any warnings or deprecation notices

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
- **Intelligent caching system** with automatic invalidation
  - `getAllCached()` - Get all items with 5-minute default cache
  - `getAllByParamsCached()` - Cached queries with custom parameters
  - `getByIdCached()` - Single item retrieval with caching
  - Automatic cache invalidation on create/update/delete operations
  - Configurable TTL (time-to-live) per service or per request
  - Pattern-based cache clearing (e.g., `Person-*` clears all person-related cache)
- Bulk operations with `bulkUpsert()`
- Cache control via `enableCache` flag and `cacheTTL` property

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

#### Styling System
- **Unified theme system** using SCSS variables and Angular Material
- **Global Material overrides**: All Material form fields styled consistently across the app
- **Component classes**: `.nexus-btn`, `.nexus-card`, `.nexus-form` for consistent styling
- **Theme variables**: Centralized in `src/styles/themes/_variables.scss`
- **Input field styling**: Global Material form field styling with custom Nexus design
- **Modern SCSS syntax**: Uses `@use` and `@forward` instead of deprecated `@import`
- **Warning-free builds**: All SCSS compilation produces no warnings or deprecation notices
- **Build requirement**: Always run `ng build` after modifying SCSS files to validate compilation
- **Documentation**: See `src/styles/README.md` for complete styling guide


#### Testing
- Jasmine/Karma setup
- Spec files alongside components
- Test configuration in `angular.json`

### Development Notes
- Components follow standalone: false pattern
- Extensive use of dependency injection
- TypeScript strict mode enabled
- Angular SSR configured for better performance

## Claude Code Instructions
When making changes to styling or SCSS files:
1. **Always run build validation**: Execute `ng build` after any SCSS changes
2. **Ensure warning-free builds**: Both `ng build` and `ng build --configuration development` must complete without warnings
3. **Use modern SCSS syntax**: Always use `@use` and `@forward` instead of deprecated `@import`
4. **Test in development mode**: Use `ng build --configuration development` for faster feedback during development
5. **Verify theme consistency**: Ensure new styles use variables from `src/styles/themes/_variables.scss`
6. **Update component documentation**: If adding new component classes, document them in the relevant SCSS file

### Warning-Free Build Requirements
- ✅ All @import statements converted to @use/@forward
- ✅ No deprecation warnings during compilation
- ✅ Clean builds in both production and development modes
- ✅ SCSS module system properly configured with forwarding

## Caching System

### Overview
The application uses an intelligent in-memory caching system (`MemoryCacheService`) integrated into `BaseService<T>` for **reference/lookup data only**.

⚠️ **IMPORTANT**: Caching is **DISABLED by default** in BaseService. This is a data-driven business application where most data (Persons, Companies, Transactions, Properties, etc.) changes frequently through user actions. Only enable caching for static/reference data.

### Cache Features
- **Time-based expiration**: Default 5-minute TTL, configurable per service or request
- **Automatic invalidation**: Cache cleared on mutations (create/update/delete)
- **Pattern-based clearing**: Remove multiple cache entries with wildcards
- **Type-safe**: Fully typed with TypeScript generics
- **SSR-compatible**: Works seamlessly with server-side rendering
- **Opt-in**: Disabled by default to prevent stale data issues

### Using Cached Methods

**Real-world example: Loading dropdown options**

```typescript
export class CompanyFormComponent implements OnInit {
  constructor(private dynamicListService: DynamicListService) {}

  ngOnInit() {
    // Load company types dropdown - perfect for caching!
    // This data rarely changes and is used across many forms
    this.dynamicListService.getAllByParamsCached({
      parentId: environment.rootDynamicLists.companyType
    }).subscribe(companyTypes => {
      // First call: fetches from API
      // Subsequent calls within 30 min: instant from cache
      this.companyTypes = companyTypes;
    });

    // Load currencies - also reference data
    this.dynamicListService.getAllByParamsCached({
      parentId: environment.rootDynamicLists.currencies
    }).subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  // Force refresh when admin updates dynamic lists
  refreshDropdowns() {
    this.dynamicListService.getAllByParamsCached(
      { parentId: environment.rootDynamicLists.companyType },
      false  // useCache = false, force refresh
    ).subscribe(companyTypes => {
      this.companyTypes = companyTypes;
    });
  }
}
```

**Counter-example: DON'T cache business data**

```typescript
export class PersonListComponent implements OnInit {
  constructor(private personService: PersonService) {}

  ngOnInit() {
    // ✅ CORRECT - Use regular method for business data
    this.personService.getAllByParams({
      status: 'active'
    }).subscribe(persons => {
      // Always fresh data, no cache
    });

    // ❌ WRONG - Don't use cached methods for frequently edited data
    // this.personService.getAllByParamsCached({ ... }) // NO!
  }
}
```

### Custom Service Configuration

#### Override Default Cache Settings
```typescript
@Injectable({ providedIn: 'root' })
export class MyCustomService extends BaseService<MyModel> {
  // Override defaults
  protected override cacheTTL = 10 * 60 * 1000; // 10 minutes
  protected override enableCache = true; // Can disable globally

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('MyModel');
  }

  // Custom method with specific caching strategy
  getImportantData(): Observable<MyModel[]> {
    const cacheKey = `${this.getCachePrefix()}-important`;

    const cached = this.cache.get<MyModel[]>(cacheKey);
    if (cached) return of(cached);

    return this.httpClient.get<MyModel[]>(`${this.url}/important`).pipe(
      tap(data => this.cache.set(cacheKey, data, 30 * 60 * 1000)) // 30 min
    );
  }

  // Manual cache invalidation
  refreshImportantData(): void {
    this.clearCacheEntry('important');
  }
}
```

### Cache Invalidation

#### Automatic Invalidation
All mutation operations automatically invalidate the service's cache:
```typescript
// These all trigger automatic cache invalidation
personService.create(newPerson).subscribe();
personService.update(existingPerson).subscribe();
personService.delete(personId).subscribe();
personService.bulkUpsert(persons).subscribe();
```

#### Manual Invalidation
```typescript
// In your service class
protected invalidateCache(): void {
  // Clears all cache entries for this service (e.g., 'Person-*')
  super.invalidateCache();
}

protected clearSpecificEntry(): void {
  // Clear specific cache entry
  this.clearCacheEntry('all');  // Clears 'Person-all'
  this.clearCacheEntry('id-123');  // Clears 'Person-id-123'
}
```

### MemoryCacheService API

#### Direct Cache Access
```typescript
constructor(private cache: MemoryCacheService) {}

// Set with custom TTL
this.cache.set('my-key', data, 10 * 60 * 1000);

// Get cached data
const data = this.cache.get<MyType>('my-key');

// Check if cache exists
if (this.cache.has('my-key')) { }

// Remove specific key
this.cache.remove('my-key');

// Remove by pattern
this.cache.removePattern('user-*'); // Removes all 'user-*' entries

// Clear all cache
this.cache.clear();

// Get statistics
const stats = this.cache.getStats();
console.log(`Cache size: ${stats.size}, Keys: ${stats.keys}`);
```

### When to Use Caching

✅ **DO Cache (Reference/Lookup Data)**:
- Dynamic lists (countries, currencies, company types, etc.)
- System settings that rarely change
- Dropdown options and select lists
- Static configuration data
- User permissions/roles (with short TTL)

❌ **DON'T Cache (Business Data)**:
- Persons, Companies, Transactions, Properties
- Document tracking and status
- Real-time dashboards
- Search results
- User-generated content
- Any data that users actively create/edit

### Enabling Caching for a Service

**Example: DynamicListService (reference data)**
```typescript
@Injectable({ providedIn: 'root' })
export class DynamicListService extends BaseService<DynamicList> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('DynamicList');

    // ✅ Enable caching - this is lookup/reference data
    this.enableCache = true;
    this.cacheTTL = 30 * 60 * 1000; // 30 minutes
  }
}
```

**Counter-example: PersonService (business data)**
```typescript
@Injectable({ providedIn: 'root' })
export class PersonService extends BaseService<Person> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Person');

    // ❌ DON'T enable caching - users actively edit this data
    // Leave enableCache = false (default)
  }
}
```

### Best Practices

1. **Only cache reference data**: Dropdowns, lookups, system configurations
2. **Keep TTL appropriate**:
   - System reference data: 30+ minutes
   - User-dependent lookups: 5 minutes max
   - Dynamic lists: 15-30 minutes
3. **Never cache business entities**: Persons, Companies, Transactions
4. **Provide manual refresh**: Add refresh buttons that call with `forceRefresh = true`
5. **Test with multiple users**: Ensure cache doesn't show stale data when another user makes changes

### Cache Key Structure
```
{ServiceName}-{Operation}-{Parameters}

Examples:
- Person-all
- Person-id-123
- Company-params-status=active&type=private
- dynamic-list-1008
```

### Performance Impact
- **First request**: Full API call + cache storage (~same as non-cached)
- **Cached requests**: ~99% faster (no network, instant response)
- **Memory usage**: Minimal (typical cache entry < 10KB, auto-expiring)
- **Cache invalidation**: Milliseconds (pattern-based removal)