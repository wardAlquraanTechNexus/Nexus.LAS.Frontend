import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NumberFormatConfig {
  defaultDecimals: number;
  thousandSeparator: string;
  decimalSeparator: string;
  currencyDecimals: number;
  percentageDecimals: number;
}

@Injectable({
  providedIn: 'root'
})
export class NumberFormatConfigService {
  private defaultConfig: NumberFormatConfig = {
    defaultDecimals: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    currencyDecimals: 2,
    percentageDecimals: 2
  };

  private configSubject = new BehaviorSubject<NumberFormatConfig>(this.defaultConfig);
  public config$: Observable<NumberFormatConfig> = this.configSubject.asObservable();

  constructor() {
    // Load from localStorage if exists
    const savedConfig = localStorage.getItem('numberFormatConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        this.configSubject.next({ ...this.defaultConfig, ...config });
      } catch (e) {
        console.error('Failed to load number format config:', e);
      }
    }
  }

  getConfig(): NumberFormatConfig {
    return this.configSubject.value;
  }

  updateConfig(config: Partial<NumberFormatConfig>): void {
    const newConfig = { ...this.configSubject.value, ...config };
    this.configSubject.next(newConfig);
    localStorage.setItem('numberFormatConfig', JSON.stringify(newConfig));
  }

  resetToDefaults(): void {
    this.configSubject.next(this.defaultConfig);
    localStorage.removeItem('numberFormatConfig');
  }
}