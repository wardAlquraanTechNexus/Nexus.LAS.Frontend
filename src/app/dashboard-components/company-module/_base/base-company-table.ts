import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language-service';

@Directive()
export abstract class BaseCompanyTableComponent implements OnInit, OnDestroy {
  displayColumns: any[] = [];
  private langSub!: Subscription;

  constructor(protected langService: LanguageService) {}

  ngOnInit(): void {
    this.langSub = this.langService.language$.subscribe(() => {
      this.setDisplayColumns();
    });
  }

  abstract setDisplayColumns(): void;

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}