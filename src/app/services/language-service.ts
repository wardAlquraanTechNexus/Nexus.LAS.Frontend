import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Labels } from '../models/consts/labels';
import { LanguageCode } from '../models/types/lang-type';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private lang$ = new BehaviorSubject<LanguageCode>(
    ((): LanguageCode => {
      const stored = localStorage.getItem('language');
      return stored === 'ar' ? 'ar' : 'en'; // fallback to 'en'
    })()
  );
  setLanguage(lang: LanguageCode) {
    localStorage.setItem('language', lang);
    this.lang$.next(lang);
  }

  get language$(): Observable<LanguageCode> {
    return this.lang$.asObservable();
  }

  getLabels(lang: LanguageCode) {
    return Labels[lang];
  }

  currentLanguage(): LanguageCode {
    return (localStorage.getItem('language') || 'en') as LanguageCode;
  }
}