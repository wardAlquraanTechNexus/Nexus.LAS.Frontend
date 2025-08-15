import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  context?: string;
  progress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  private loadingSubject = new BehaviorSubject<LoadingState>({ isLoading: false });
  private loadingCount = 0;
  private loadingContexts = new Set<string>();

  public loading$: Observable<LoadingState> = this.loadingSubject.asObservable();

  /**
   * Start loading state
   */
  startLoading(context?: string): void {
    this.loadingCount++;
    if (context) {
      this.loadingContexts.add(context);
    }
    
    this.updateLoadingState();
  }

  /**
   * Stop loading state
   */
  stopLoading(context?: string): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    
    if (context) {
      this.loadingContexts.delete(context);
    }
    
    this.updateLoadingState();
  }

  /**
   * Stop all loading states
   */
  stopAllLoading(): void {
    this.loadingCount = 0;
    this.loadingContexts.clear();
    this.updateLoadingState();
  }

  /**
   * Set loading progress
   */
  setProgress(progress: number, context?: string): void {
    this.loadingSubject.next({
      isLoading: this.loadingCount > 0,
      context,
      progress: Math.min(100, Math.max(0, progress))
    });
  }

  /**
   * Check if specific context is loading
   */
  isContextLoading(context: string): boolean {
    return this.loadingContexts.has(context);
  }

  /**
   * Get current loading state
   */
  getCurrentState(): LoadingState {
    return this.loadingSubject.value;
  }

  private updateLoadingState(): void {
    const contexts = Array.from(this.loadingContexts);
    this.loadingSubject.next({
      isLoading: this.loadingCount > 0,
      context: contexts.length > 0 ? contexts.join(', ') : undefined
    });
  }
}