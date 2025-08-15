import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppError {
  message: string;
  details?: string;
  code?: string;
  timestamp: Date;
  context?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Handle API errors with consistent display
   */
  handleApiError(error: HttpErrorResponse, context?: string): void {
    const appError = this.parseHttpError(error, context);
    this.displayError(appError);
    this.logError(appError);
  }

  /**
   * Handle general application errors
   */
  handleError(message: string, details?: string, context?: string): void {
    const appError: AppError = {
      message,
      details,
      timestamp: new Date(),
      context
    };
    
    this.displayError(appError);
    this.logError(appError);
  }

  /**
   * Show success message
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['success-snackbar']
    });
  }

  /**
   * Show warning message
   */
  showWarning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['warning-snackbar']
    });
  }

  /**
   * Show info message
   */
  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['info-snackbar']
    });
  }

  /**
   * Display error to user
   */
  private displayError(appError: AppError): void {
    const message = this.formatErrorMessage(appError);
    
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  /**
   * Parse HTTP error response
   */
  private parseHttpError(error: HttpErrorResponse, context?: string): AppError {
    let message = 'An unexpected error occurred';
    let details = '';
    let code = '';

    if (error.error) {
      if (typeof error.error === 'string') {
        message = error.error;
      } else if (error.error.message) {
        message = error.error.message;
        details = error.error.details || '';
        code = error.error.code || '';
      } else if (error.error.title) {
        message = error.error.title;
        details = error.error.detail || '';
      }
    }

    // Handle specific HTTP status codes
    switch (error.status) {
      case 0:
        message = 'Connection failed. Please check your internet connection.';
        break;
      case 400:
        if (!message || message === 'An unexpected error occurred') {
          message = 'Invalid request. Please check your input.';
        }
        break;
      case 401:
        message = 'Authentication required. Please login again.';
        break;
      case 403:
        message = 'Access denied. You do not have permission to perform this action.';
        break;
      case 404:
        message = 'Requested resource not found.';
        break;
      case 409:
        message = 'Conflict detected. The resource may have been modified by another user.';
        break;
      case 422:
        if (!message || message === 'An unexpected error occurred') {
          message = 'Validation failed. Please check your input.';
        }
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      case 502:
      case 503:
      case 504:
        message = 'Service temporarily unavailable. Please try again later.';
        break;
    }

    return {
      message,
      details,
      code,
      timestamp: new Date(),
      context
    };
  }

  /**
   * Format error message for display
   */
  private formatErrorMessage(appError: AppError): string {
    let message = appError.message;
    
    if (appError.context) {
      message = `${appError.context}: ${message}`;
    }
    
    return message;
  }

  /**
   * Log error for debugging
   */
  private logError(appError: AppError): void {
    console.error('Application Error:', {
      message: appError.message,
      details: appError.details,
      code: appError.code,
      context: appError.context,
      timestamp: appError.timestamp
    });
  }
}