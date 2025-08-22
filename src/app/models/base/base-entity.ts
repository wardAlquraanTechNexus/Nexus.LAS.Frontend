/**
 * Base interface for all entities in the system
 * Provides audit trail fields and common entity properties
 */
export interface BaseEntity {
  id?: number;
  createdBy?: string;
  createdAt?: string;
  modifiedBy?: string | null;
  modifiedAt?: string | null;
  
  // Allow additional properties while maintaining type safety
  [key: string]: any;
}

/**
 * Type-safe property accessor for entities
 */
export type EntityProperty<T, K extends keyof T> = T[K];

/**
 * Type for form data based on entity
 */
export type FormData<T> = Partial<T>;

/**
 * Type for entity with required ID (for updates)
 */
export type EntityWithId<T extends BaseEntity> = T & {
  id: number;
};