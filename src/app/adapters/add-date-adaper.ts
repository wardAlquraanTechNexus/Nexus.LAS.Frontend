import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    debugger
    if (!value) return null;

    if (typeof value === 'string') {
      // Handle dd/MM/yyyy
      const parts = value.trim().split('/');
      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const year = Number(parts[2]);
        return new Date(year, month, day);
      }
    }

    // fallback for Date object or other cases
    return value instanceof Date ? value : null;
  }

  override format(date: Date, displayFormat: any): string {
    debugger;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
