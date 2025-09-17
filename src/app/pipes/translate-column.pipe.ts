import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language-service';

@Pipe({
  name: 'translateColumn',
  standalone: false,
  pure: false  // This ensures the pipe re-evaluates on every change detection cycle
})
export class TranslateColumnPipe implements PipeTransform {

  constructor(private langService: LanguageService) {}

  transform(label: string): string {
    if (!label) return '';

    const labels = this.langService.currentLabels;
    if (!labels || !labels.COMMON) return label;

    // Translate common labels
    switch (label.toLowerCase()) {
      case 'id':
      case 'group id':
        return labels.COMMON.ID || label;
      case 'name':
      case 'group name':
        return labels.COMMON.NAME || label;
      case 'description':
        return labels.COMMON.DESCRIPTION || label;
      case 'action':
      case 'actions':
        return labels.COMMON.ACTIONS || label;
      case 'status':
        return labels.COMMON.STATUS || label;
      case 'username':
        return labels.COMMON.USERNAME || label;
      case 'email':
        return labels.COMMON.EMAIL || label;
      case 'first name':
        return labels.COMMON.FIRST_NAME || label;
      case 'last name':
        return labels.COMMON.LAST_NAME || label;
      case 'login name':
        return labels.COMMON.LOGIN_NAME || label;
      case 'nt login':
        return labels.COMMON.NT_LOGIN || label;
      default:
        return label;
    }
  }
}