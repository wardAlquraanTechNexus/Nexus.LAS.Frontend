/**
 * Base interface for all entities in the system
 */
export interface BaseEntity {
  id?: string | number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  [key: string]: any; // Allow additional properties but encourage specific typing
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
  id: string | number;
};