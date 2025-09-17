import { Directive, ElementRef, HostListener, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appThousandSeparator]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThousandSeparatorDirective),
      multi: true
    }
  ]
})
export class ThousandSeparatorDirective implements ControlValueAccessor, OnInit {
  @Input() decimals: number = 2;
  @Input() thousandSeparator: string = ',';
  @Input() decimalSeparator: string = '.';
  @Input() allowNegative: boolean = true;
  @Input() allowDecimal: boolean = true;
  @Input() maxValue?: number;
  @Input() minValue?: number;

  private el: HTMLInputElement;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    // Format initial value if present
    if (this.el.value) {
      this.el.value = this.formatNumber(this.el.value);
    }
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.el.value = this.formatNumber(value.toString());
    } else {
      this.el.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.disabled = isDisabled;
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    const value = (event.target as HTMLInputElement).value;
    // Remove formatting on focus for easier editing
    this.el.value = this.unformatNumber(value);

    // Select all text for easy replacement
    setTimeout(() => {
      this.el.select();
    }, 0);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onTouched();

    // Clean and validate the input
    const cleanedValue = this.cleanNumber(value);

    // Validate range if specified
    let numericValue = parseFloat(cleanedValue);
    if (!isNaN(numericValue)) {
      if (this.maxValue !== undefined && numericValue > this.maxValue) {
        numericValue = this.maxValue;
      }
      if (this.minValue !== undefined && numericValue < this.minValue) {
        numericValue = this.minValue;
      }
    }

    // Format and display
    const formattedValue = this.formatNumber(numericValue.toString());
    this.el.value = formattedValue;

    // Emit the numeric value
    this.onChange(isNaN(numericValue) ? null : numericValue);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // Allow only valid characters while typing
    let cleanValue = value;

    // Remove invalid characters
    const allowedChars = '0123456789' +
                        (this.allowNegative ? '-' : '') +
                        (this.allowDecimal ? this.decimalSeparator : '');

    cleanValue = value.split('').filter(char => allowedChars.includes(char)).join('');

    // Ensure only one decimal separator
    if (this.allowDecimal) {
      const parts = cleanValue.split(this.decimalSeparator);
      if (parts.length > 2) {
        cleanValue = parts[0] + this.decimalSeparator + parts.slice(1).join('');
      }

      // Limit decimal places
      if (parts.length === 2 && parts[1].length > this.decimals) {
        cleanValue = parts[0] + this.decimalSeparator + parts[1].substring(0, this.decimals);
      }
    }

    // Ensure minus sign is only at the beginning
    if (this.allowNegative) {
      const minusCount = (cleanValue.match(/-/g) || []).length;
      if (minusCount > 1) {
        cleanValue = '-' + cleanValue.replace(/-/g, '');
      } else if (cleanValue.indexOf('-') > 0) {
        cleanValue = '-' + cleanValue.replace(/-/g, '');
      }
    }

    // Update input value if it was modified
    if (value !== cleanValue) {
      this.el.value = cleanValue;
    }

    // Emit the numeric value
    const numericValue = parseFloat(this.cleanNumber(cleanValue));
    this.onChange(isNaN(numericValue) ? null : numericValue);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow navigation keys
    const navigationKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                           'Home', 'End', 'ArrowLeft', 'ArrowRight',
                           'ArrowUp', 'ArrowDown'];

    if (navigationKeys.includes(event.key)) {
      return;
    }

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    // Allow digits
    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    // Allow decimal separator
    if (this.allowDecimal && event.key === this.decimalSeparator) {
      // Check if decimal separator already exists
      if (this.el.value.includes(this.decimalSeparator)) {
        event.preventDefault();
      }
      return;
    }

    // Allow minus sign at the beginning
    if (this.allowNegative && event.key === '-') {
      // Only allow at the beginning and if not already present
      if (this.el.selectionStart !== 0 || this.el.value.includes('-')) {
        event.preventDefault();
      }
      return;
    }

    // Prevent all other keys
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text');

    if (pastedText) {
      // Clean the pasted text
      const cleanedText = this.cleanNumber(pastedText);
      const numericValue = parseFloat(cleanedText);

      if (!isNaN(numericValue)) {
        // Insert at cursor position
        const start = this.el.selectionStart || 0;
        const end = this.el.selectionEnd || 0;
        const currentValue = this.el.value;

        const newValue = currentValue.substring(0, start) +
                        cleanedText +
                        currentValue.substring(end);

        this.el.value = newValue;

        // Trigger input event
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', { value: this.el, writable: false });
        this.onInput(inputEvent);

        // Set cursor position after pasted text
        const newCursorPos = start + cleanedText.length;
        this.el.setSelectionRange(newCursorPos, newCursorPos);
      }
    }
  }

  private formatNumber(value: string): string {
    if (!value || value === '') {
      return '';
    }

    // Clean the value first
    const cleanValue = this.cleanNumber(value);
    const numericValue = parseFloat(cleanValue);

    if (isNaN(numericValue)) {
      return '';
    }

    // Split into integer and decimal parts
    const parts = cleanValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];

    // Handle negative numbers
    const isNegative = integerPart.startsWith('-');
    if (isNegative) {
      integerPart = integerPart.substring(1);
    }

    // Add thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);

    // Reconstruct the number
    let formattedValue = integerPart;

    if (this.allowDecimal && decimalPart !== undefined) {
      // Pad or trim decimal places
      let formattedDecimal = decimalPart;
      if (formattedDecimal.length > this.decimals) {
        formattedDecimal = formattedDecimal.substring(0, this.decimals);
      } else {
        formattedDecimal = formattedDecimal.padEnd(this.decimals, '0');
      }

      if (formattedDecimal) {
        formattedValue += this.decimalSeparator + formattedDecimal;
      }
    } else if (this.allowDecimal && this.decimals > 0) {
      // Add decimal zeros if required
      formattedValue += this.decimalSeparator + ''.padEnd(this.decimals, '0');
    }

    // Add negative sign back
    if (isNegative) {
      formattedValue = '-' + formattedValue;
    }

    return formattedValue;
  }

  private unformatNumber(value: string): string {
    if (!value) {
      return '';
    }

    // Remove thousand separators
    let unformatted = value.split(this.thousandSeparator).join('');

    // Replace decimal separator with period for parsing
    if (this.decimalSeparator !== '.') {
      unformatted = unformatted.replace(this.decimalSeparator, '.');
    }

    // Remove trailing decimal zeros for cleaner editing
    if (unformatted.includes('.')) {
      unformatted = unformatted.replace(/\.?0+$/, '');

      // Keep the decimal point if it was just entered
      if (value.endsWith(this.decimalSeparator)) {
        unformatted += '.';
      }
    }

    return unformatted;
  }

  private cleanNumber(value: string): string {
    if (!value) {
      return '0';
    }

    // Remove thousand separators
    let cleaned = value.split(this.thousandSeparator).join('');

    // Replace decimal separator with period
    if (this.decimalSeparator !== '.') {
      cleaned = cleaned.replace(this.decimalSeparator, '.');
    }

    // Remove any non-numeric characters except minus and period
    cleaned = cleaned.replace(/[^0-9.-]/g, '');

    // Ensure only one minus at the beginning
    const minusCount = (cleaned.match(/-/g) || []).length;
    if (minusCount > 1) {
      cleaned = '-' + cleaned.replace(/-/g, '');
    } else if (cleaned.indexOf('-') > 0) {
      cleaned = '-' + cleaned.replace(/-/g, '');
    }

    // Ensure only one period
    const periodCount = (cleaned.match(/\./g) || []).length;
    if (periodCount > 1) {
      const parts = cleaned.split('.');
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    return cleaned || '0';
  }
}