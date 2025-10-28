import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../../services/company-services/company-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { CompanyStatus } from '../../../enums/company-status';
import { LanguageService } from '../../../services/language-service';
import { LanguageCode } from '../../../models/types/lang-type';
import { Labels } from '../../../models/consts/labels';
import { CompanyFormDialog } from '../company-form-dialog/company-form-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CompanyBoardDto } from '../../../models/company-models/company-board/dtos/company-board-dto';
import { downloadBlobFile } from '../../_shared/shared-methods/downloadBlob';
import { CompanyCapitalDto } from '../../../models/company-models/company-capital/dtos/company-capital-dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-company-view-component',
  standalone: false,
  templateUrl: './company-view-component.html',
  styleUrl: './company-view-component.scss'
})
export class CompanyViewComponent implements OnInit, OnDestroy {
  
  // Unsubscribe subject
  private destroy$ = new Subject<void>();

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  selectedCompanyBoard?: CompanyBoardDto | null;
  @Output() backToTableEmit = new EventEmitter();
  company!: GetCompanyDto
  showLoading = false;
  companyId?: number | null = null;
  labels: any;

  selectedTab = 0;
  showBoardMember = false;

  constructor(
    private service: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    protected langService: LanguageService,
    private dialog: MatDialog,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Subscribe to query params with unsubscribe logic
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.companyId = parseInt(params['id']);
          this.getCompany();
        } else {
          this.backToTable();
        }
      });

    // Subscribe to language changes with unsubscribe logic
    this.langService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.applyLanguage(lang);
      });
  }

  ngOnDestroy(): void {
    // Complete the destroy subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCompany() {
    this.showLoading = true;
    
    this.service.getCompanyById(this.companyId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res => {
          this.company = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          console.error('Error fetching company:', err);
        })
      });
  }

  backToTable() {
    this.companyId = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    
    switch (this.company?.companyStatus) {
      case CompanyStatus.Active:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case CompanyStatus.Inactive:
        borderColor = '#423e3ede';
        color = '#423e3ede';
        break;
    }

    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',
    };
  }

  getIcon() {
    switch (this.company?.companyStatus) {
      case CompanyStatus.Active:
        return 'check_circle';
      case CompanyStatus.Inactive:
        return 'cancel';
      default:
        return 'star';
    }
  }

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    
    if (!this.company?.private) {
      borderColor = '#FFA500';
      color = '#FFA500';
    }
    
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',
    };
  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
    this.labels = Labels[lang as keyof typeof Labels];
  }

  onEditCapital(event: CompanyCapitalDto) {
    this.getCompany();
  }

  onEdit() {
    const dialogRef = this.dialog.open(CompanyFormDialog, {
      disableClose: true,
      data: this.company
    });

    // Subscribe to dialog close with unsubscribe logic
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.getCompany();
        }
      });
  }

  onSelectCompanyBoard(event: CompanyBoardDto) {
    this.selectedCompanyBoard = event;
    this.showBoardMember = false;
    setTimeout(() => {
      this.showBoardMember = true;
      this.cdr.markForCheck();
    });
  }

  exportToPdf() {
    this.service.exportToPdf({ id: this.company.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // Convert base64 to blob
          const binaryString = atob(res.data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], {
            type: 'application/pdf'
          });

          downloadBlobFile(blob, res.fileName || 'company-report.pdf');
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
          // Add user notification here if needed
        }
      });
  }
}


