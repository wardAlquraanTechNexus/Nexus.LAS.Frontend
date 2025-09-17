# Thousand Separator Directives Usage Guide

## Overview
Two directives have been implemented to add thousand separator formatting to number inputs throughout the application:

1. **NumberFormatDirective** - Automatically applies to all `input[type="number"]` elements
2. **ThousandSeparatorDirective** - Advanced directive with more customization options

## 1. NumberFormatDirective (Automatic)

### How it Works
- **Automatically applies** to ALL `<input type="number">` elements in the application
- **No code changes needed** - works immediately on existing number inputs
- Formats numbers with thousand separators when the input loses focus
- Removes formatting when focused for easier editing

### Default Behavior
- Thousand separator: `,` (comma)
- Decimal separator: `.` (period)
- Max decimal places: 2
- Allows negative numbers

### Example
```html
<!-- This automatically gets thousand separator formatting -->
<input matInput type="number" formControlName="capitalAmount" required />

<!-- User types: 1234567.89 -->
<!-- Displays as: 1,234,567.89 when not focused -->
```

## 2. ThousandSeparatorDirective (Advanced)

### Usage
For more control over formatting, use the `appThousandSeparator` directive:

```html
<input
  matInput
  appThousandSeparator
  formControlName="amount"
  [decimals]="2"
  [thousandSeparator]="','"
  [decimalSeparator]="'.'"
  [allowNegative]="true"
  [allowDecimal]="true"
  [maxValue]="1000000"
  [minValue]="0"
/>
```

### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `decimals` | number | 2 | Number of decimal places |
| `thousandSeparator` | string | ',' | Character for thousand separation |
| `decimalSeparator` | string | '.' | Character for decimal separation |
| `allowNegative` | boolean | true | Allow negative numbers |
| `allowDecimal` | boolean | true | Allow decimal numbers |
| `maxValue` | number | undefined | Maximum allowed value |
| `minValue` | number | undefined | Minimum allowed value |

## Features

### User-Friendly Input
- **Focus behavior**: Removes formatting when focused for easy editing
- **Auto-select**: Selects all text on focus for quick replacement
- **Smart validation**: Prevents invalid characters while typing
- **Paste support**: Cleans and formats pasted numbers

### Automatic Formatting
- **On blur**: Applies thousand separators when leaving the field
- **Real-time validation**: Ensures only valid numeric input
- **Range enforcement**: Automatically caps values to min/max if specified

### Keyboard Support
- Allows all navigation keys (arrows, home, end, etc.)
- Supports Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
- Prevents non-numeric characters (except decimal and minus)
- Smart decimal point handling (only one allowed)
- Smart minus sign handling (only at beginning)

## Examples in the Application

### Company Capital Form
```html
<!-- Capital Amount with thousand separators -->
<mat-form-field>
  <mat-label>Capital Amount</mat-label>
  <input matInput type="number" formControlName="capitalAmount" required>
  <mat-error *ngIf="form.get('capitalAmount')?.hasError('required')">
    Capital amount is required
  </mat-error>
</mat-form-field>

<!-- Number of Shares -->
<mat-form-field>
  <mat-label>Number of Shares</mat-label>
  <input matInput type="number" formControlName="numberOfShares" required>
</mat-form-field>
```

### Account Signatory Form (with range)
```html
<!-- Amount ranges with validation -->
<mat-form-field>
  <mat-label>From Amount</mat-label>
  <input
    matInput
    type="number"
    formControlName="fromAmount"
    placeholder="Enter from amount"
    min="0">
</mat-form-field>

<mat-form-field>
  <mat-label>To Amount</mat-label>
  <input
    matInput
    type="number"
    formControlName="toAmount"
    placeholder="Enter to amount"
    min="0">
</mat-form-field>
```

### Custom Formatting (Currency)
```html
<!-- For special currency formatting -->
<mat-form-field>
  <mat-label>Price</mat-label>
  <input
    matInput
    appThousandSeparator
    formControlName="price"
    [decimals]="2"
    [allowNegative]="false"
    [minValue]="0"
    placeholder="0.00">
</mat-form-field>
```

## Integration with Angular Forms

Both directives work seamlessly with Angular Reactive Forms:

```typescript
// In your component
form = this.fb.group({
  capitalAmount: [0, [Validators.required, Validators.min(0)]],
  numberOfShares: [0, [Validators.required, Validators.min(1)]],
  nominalValue: [0, [Validators.required, Validators.min(0.01)]]
});

// The form value will contain the numeric value (not the formatted string)
onSubmit() {
  console.log(this.form.value);
  // Output: { capitalAmount: 1234567.89, numberOfShares: 1000, nominalValue: 10 }
}
```

## Important Notes

1. **Form Values**: The directives store numeric values in the form, not formatted strings
2. **Type Change**: The directive changes `type="number"` to `type="text"` internally to allow formatting
3. **Mobile Support**: Uses `inputmode="decimal"` for proper mobile keyboard
4. **Validation**: Works with Angular validators (required, min, max, etc.)
5. **Accessibility**: Maintains all accessibility features of standard inputs

## Browser Compatibility
- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Full support with numeric keyboard

## Troubleshooting

### Issue: Formatting not appearing
**Solution**: Ensure the input has `type="number"` or uses `appThousandSeparator` directive

### Issue: Decimal places not working
**Solution**: Check if `[allowDecimal]="true"` (default) and `[decimals]` is set correctly

### Issue: Can't enter negative numbers
**Solution**: Ensure `[allowNegative]="true"` (default) and enter minus at the beginning

### Issue: Value exceeds limits
**Solution**: Set `[maxValue]` and `[minValue]` to automatically cap values

## Performance Considerations
- Directives are lightweight and don't impact performance
- Formatting only occurs on blur to avoid interrupting typing
- Uses native JavaScript number formatting for efficiency

---
*Last Updated: 2025-09-17*
*Application: Nexus.LAS Frontend*