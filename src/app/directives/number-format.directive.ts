import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy, Optional, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'input[type="number"], input[appNumberFormat]',
  standalone: false
})
export class NumberFormatDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() thousandSeparator: string = ',';
  @Input() decimalSeparator: string = '.';
  @Input() decimals: number = 2;
  @Input() autoFormat: boolean = true;

  private el: HTMLInputElement;
  private valueChangeSub?: Subscription;
  private isFocused: boolean = false;

  constructor(
    private elementRef: ElementRef,
    @Optional() private ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    // Change type to text to allow formatting
    if (this.el.type === 'number') {
      this.el.type = 'text';
      this.el.setAttribute('inputmode', 'decimal');
      this.el.setAttribute('pattern', '[0-9,.-]*');
    }
  }

  ngAfterViewInit() {
    // Initialize value formatting after view is ready
    if (this.ngControl && this.ngControl.control) {
      // Format initial value
      const initialValue = this.ngControl.value;
      if (!this.isFocused && initialValue !== null && initialValue !== undefined) {
        setTimeout(() => {
          this.el.value = this.formatNumber(initialValue);
          this.cdr.detectChanges();
        }, 100); // Small delay to ensure dialog is fully rendered

        // Subscribe to value changes
        this.valueChangeSub = this.ngControl.control.valueChanges.subscribe(value => {
          // Only format if not focused and value is set programmatically
          if (!this.isFocused && value !== null && value !== undefined) {
            setTimeout(() => {
              if (!this.isFocused) {
                const currentValue = this.el.value;
                const unformattedCurrent = this.unformatNumber(currentValue);
                // Only update if the value actually changed
                if (parseFloat(unformattedCurrent) !== value) {
                  this.el.value = this.formatNumber(value);
                  this.cdr.detectChanges();
                }
              }
            }, 0);
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    this.isFocused = true;
    const target = event.target as HTMLInputElement;

    // Keep formatting while editing - just select all text
    setTimeout(() => {
      target.select();
    }, 0);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    this.isFocused = false;
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Clean and parse the value
    const cleanedValue = this.cleanNumber(value);
    const numericValue = parseFloat(cleanedValue);

    if (!isNaN(numericValue)) {
      // Format the display value
      target.value = this.formatNumber(numericValue);

      // Update the form control value with the numeric value
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(numericValue, {
          emitEvent: true,
          emitModelToViewChange: false,
          emitViewToModelChange: true
        });
      }
    } else if (value === '' || value === '-') {
      target.value = '';
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(null, {
          emitEvent: true,
          emitModelToViewChange: false,
          emitViewToModelChange: true
        });
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.isFocused) return; // Only process input when focused

    const target = event.target as HTMLInputElement;
    const cursorPosition = target.selectionStart || 0;
    let value = target.value;

    // Remove existing formatting
    const unformatted = this.unformatNumber(value);

    // Allow only valid characters
    const validPattern = /[^0-9.-]/g;
    const cleanedValue = unformatted.replace(validPattern, '');

    // Parse the numeric value
    const numericValue = parseFloat(cleanedValue);

    // Format the display value in real-time
    if (!isNaN(numericValue)) {
      // Calculate how many commas were before cursor
      const beforeCursor = value.substring(0, cursorPosition);
      const commasBefore = (beforeCursor.match(/,/g) || []).length;

      // Format the number
      const formatted = this.formatNumberWhileTyping(cleanedValue);
      target.value = formatted;

      // Calculate new cursor position
      const afterCursor = formatted.substring(0, cursorPosition);
      const commasAfter = (afterCursor.match(/,/g) || []).length;
      const newPosition = cursorPosition + (commasAfter - commasBefore);

      // Restore cursor position
      setTimeout(() => {
        target.setSelectionRange(newPosition, newPosition);
      }, 0);

      // Update form control
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(numericValue, {
          emitEvent: false,
          emitModelToViewChange: false,
          emitViewToModelChange: true
        });
      }
    } else if (cleanedValue === '' || cleanedValue === '-' || cleanedValue === '.') {
      // Allow intermediate states while typing
      target.value = cleanedValue;

      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(null, {
          emitEvent: false,
          emitModelToViewChange: false,
          emitViewToModelChange: true
        });
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow navigation and control keys
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                        'Home', 'End', 'ArrowLeft', 'ArrowRight',
                        'ArrowUp', 'ArrowDown'];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Allow Ctrl combinations
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Allow numbers
    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    // Allow decimal point
    if (event.key === '.' || event.key === this.decimalSeparator) {
      const target = event.target as HTMLInputElement;
      const unformatted = this.unformatNumber(target.value);
      if (unformatted.includes('.')) {
        event.preventDefault();
      }
      return;
    }

    // Allow minus sign only at the beginning
    if (event.key === '-') {
      const target = event.target as HTMLInputElement;
      const unformatted = this.unformatNumber(target.value);
      if (target.selectionStart !== 0 || unformatted.includes('-')) {
        event.preventDefault();
      }
      return;
    }

    // Allow thousand separator (user might type it, we'll handle it)
    if (event.key === this.thousandSeparator) {
      event.preventDefault(); // Prevent it but don't block - formatting will add it automatically
      return;
    }

    // Prevent all other characters
    event.preventDefault();
  }

  private formatNumber(value: number | string): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '';
    }

    // Check if original value has decimals
    const stringValue = value.toString();
    const hasDecimals = stringValue.includes('.');

    // Use Intl.NumberFormat for consistent formatting
    // Only show minimum decimals if the original value had them
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: hasDecimals ? Math.min(this.decimals, (stringValue.split('.')[1] || '').length) : 0,
      maximumFractionDigits: this.decimals,
      useGrouping: true
    });

    let formatted = formatter.format(numericValue);

    // Replace separators if different from default
    if (this.thousandSeparator !== ',') {
      formatted = formatted.replace(/,/g, this.thousandSeparator);
    }
    if (this.decimalSeparator !== '.') {
      formatted = formatted.replace(/\./g, this.decimalSeparator);
    }

    return formatted;
  }

  private formatNumberWhileTyping(value: string): string {
    if (!value || value === '-' || value === '.') {
      return value;
    }

    // Split into integer and decimal parts
    const parts = value.split('.');
    let integerPart = parts[0] || '';
    const decimalPart = parts[1];

    // Handle negative numbers
    const isNegative = integerPart.startsWith('-');
    if (isNegative) {
      integerPart = integerPart.substring(1);
    }

    // Add thousand separators to integer part only
    if (integerPart.length > 0) {
      // Remove leading zeros except for "0" itself
      integerPart = integerPart.replace(/^0+/, '') || '0';

      // Add thousand separators
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
    }

    // Reconstruct the number
    let formatted = integerPart;

    // Add decimal part if present (keep user's decimal input)
    if (value.includes('.')) {
      formatted += this.decimalSeparator;
      if (decimalPart !== undefined) {
        // Limit decimal places while typing
        const limitedDecimal = decimalPart.substring(0, this.decimals);
        formatted += limitedDecimal;
      }
    }

    // Add negative sign back
    if (isNegative) {
      formatted = '-' + formatted;
    }

    return formatted;
  }

  private unformatNumber(value: string): string {
    if (!value) {
      return '';
    }

    // Remove thousand separators
    let unformatted = value.split(this.thousandSeparator).join('');

    // Replace custom decimal separator with period
    if (this.decimalSeparator !== '.') {
      unformatted = unformatted.replace(this.decimalSeparator, '.');
    }

    return unformatted;
  }

  private cleanNumber(value: string): string {
    if (!value) {
      return '';
    }

    // First remove thousand separators (commas)
    let cleaned = value.replace(/,/g, '');

    // Remove all non-numeric characters except minus and period
    cleaned = cleaned.replace(/[^0-9.-]/g, '');

    // Ensure only one minus at the beginning
    if (cleaned.indexOf('-') > 0) {
      cleaned = '-' + cleaned.replace(/-/g, '');
    }

    // Ensure only one period
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    return cleaned;
  }
}