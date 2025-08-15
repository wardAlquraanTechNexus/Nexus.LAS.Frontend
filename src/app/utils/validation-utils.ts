import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

/**
 * Common validation utilities for forms
 */
export class ValidationUtils {
  
  /**
   * Email validation
   */
  static email(): ValidatorFn {
    return Validators.email;
  }

  /**
   * Required field validation
   */
  static required(): ValidatorFn {
    return Validators.required;
  }

  /**
   * Minimum length validation
   */
  static minLength(length: number): ValidatorFn {
    return Validators.minLength(length);
  }

  /**
   * Maximum length validation
   */
  static maxLength(length: number): ValidatorFn {
    return Validators.maxLength(length);
  }

  /**
   * Phone number validation (basic pattern)
   */
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{7,15}$/;
      return phoneRegex.test(control.value) ? null : { phoneNumber: true };
    };
  }

  /**
   * URL validation
   */
  static url(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      try {
        new URL(control.value);
        return null;
      } catch {
        return { url: true };
      }
    };
  }

  /**
   * Date validation (not in future)
   */
  static pastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      return date <= today ? null : { pastDate: true };
    };
  }

  /**
   * Numeric only validation
   */
  static numeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const numericRegex = /^[0-9]+$/;
      return numericRegex.test(control.value) ? null : { numeric: true };
    };
  }

  /**
   * Password strength validation
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const hasMinLength = control.value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);
      const hasNumber = /\d/.test(control.value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      
      const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      
      return isValid ? null : {
        strongPassword: {
          hasMinLength,
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          hasSpecialChar
        }
      };
    };
  }

  /**
   * File size validation (in MB)
   */
  static maxFileSize(maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !(control.value instanceof File)) return null;
      
      const fileSizeMB = control.value.size / (1024 * 1024);
      return fileSizeMB <= maxSizeMB ? null : { 
        maxFileSize: { 
          actualSize: fileSizeMB.toFixed(2), 
          maxSize: maxSizeMB 
        } 
      };
    };
  }

  /**
   * File type validation
   */
  static allowedFileTypes(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !(control.value instanceof File)) return null;
      
      const fileType = control.value.type;
      const isAllowed = allowedTypes.some(type => 
        fileType.includes(type) || control.value.name.toLowerCase().endsWith(type)
      );
      
      return isAllowed ? null : { 
        allowedFileTypes: { 
          actualType: fileType, 
          allowedTypes 
        } 
      };
    };
  }

  /**
   * Get error message for validation
   */
  static getErrorMessage(control: AbstractControl | null, fieldName: string = 'Field'): string {
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return `${fieldName} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${fieldName} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['phoneNumber']) return 'Please enter a valid phone number';
    if (errors['url']) return 'Please enter a valid URL';
    if (errors['pastDate']) return 'Date cannot be in the future';
    if (errors['numeric']) return 'Only numbers are allowed';
    if (errors['maxFileSize']) return `File size cannot exceed ${errors['maxFileSize'].maxSize}MB`;
    if (errors['allowedFileTypes']) return `File type not allowed. Allowed types: ${errors['allowedFileTypes'].allowedTypes.join(', ')}`;
    
    if (errors['strongPassword']) {
      const requirements = [];
      const pwdErrors = errors['strongPassword'];
      if (!pwdErrors.hasMinLength) requirements.push('at least 8 characters');
      if (!pwdErrors.hasUpperCase) requirements.push('uppercase letter');
      if (!pwdErrors.hasLowerCase) requirements.push('lowercase letter');
      if (!pwdErrors.hasNumber) requirements.push('number');
      if (!pwdErrors.hasSpecialChar) requirements.push('special character');
      return `Password must contain: ${requirements.join(', ')}`;
    }

    return `${fieldName} is invalid`;
  }
}