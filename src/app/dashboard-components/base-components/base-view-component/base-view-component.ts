import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LanguageCode } from '../../../models/types/lang-type';
import { Labels } from '../../../models/consts/labels';
import { LanguageService } from '../../../services/language-service';
import { EntityIDc } from '../../../enums/entity-idc';
import { entityIcons } from '../../../enums/entity-icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-view-component',
  standalone: false,
  templateUrl: './base-view-component.html',
  styleUrl: './base-view-component.scss'
})
export class BaseViewComponent implements OnInit, OnDestroy {

  @Input() idc!: EntityIDc;
  @Input() id?:number | null;
  icon ?: string;

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }


  protected destroy$ = new Subject<void>();
  protected tabLoadingTimeouts = new Map<number, any>(); // Store timeouts for each tab

  public loadedTabs = new Set<number>(); // Track which tabs have been loaded

  protected selectedTab = 0

  constructor(
    protected cdr: ChangeDetectorRef,
    protected langService: LanguageService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadedTabs.add(this.selectedTab);
    if(this.idc){
      this.icon = entityIcons[this.idc.toString()];
    }
    // Initialize the first tab as loaded
    this.subscribeLang();
  }


  subscribeLang(){
      // Subscribe to language changes with unsubscribe logic
    this.langService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.applyLanguage(lang);
      });
    
  
  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }

  onTabChange(tabIndex: number): void {
    this.selectedTab = tabIndex;

    // If tab is not loaded yet, simulate loading delay and then mark as loaded
    if (!this.loadedTabs.has(tabIndex)) {
      // Clear any existing timeout for this tab
      if (this.tabLoadingTimeouts.has(tabIndex)) {
        clearTimeout(this.tabLoadingTimeouts.get(tabIndex));
      }

      // Set a timeout to simulate loading
      const timeout = setTimeout(() => {
        this.loadedTabs.add(tabIndex);
        this.cdr.detectChanges();
        this.tabLoadingTimeouts.delete(tabIndex);

        // Optional: Call specific initialization methods for each tab
      }, 500); // 500ms delay - adjust as needed

      this.tabLoadingTimeouts.set(tabIndex, timeout);
    }
  }

  // Optional: Method to force reload a specific tab
  reloadTab(tabIndex: number): void {
    this.loadedTabs.delete(tabIndex);
    this.cdr.detectChanges();

    setTimeout(() => {
      this.loadedTabs.add(tabIndex);
      this.cdr.detectChanges();
    }, 300);
  }

  // Optional: Method to reset all tabs
  resetAllTabs(): void {
    this.loadedTabs.clear();
    this.loadedTabs.add(this.selectedTab);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // Complete the destroy subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();

    // Clear any pending timeouts
    this.tabLoadingTimeouts.forEach(timeout => clearTimeout(timeout));
    this.tabLoadingTimeouts.clear();

  }

  backToTable() {
    this.id = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
