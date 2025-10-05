import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-company-view-component',
  standalone: false,
  templateUrl: './company-view-component.html',
  styleUrl: './company-view-component.scss'
})
export class CompanyViewComponent implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  selectedCompanyBoard?: CompanyBoardDto | null;
  @Output() backToTableEmit = new EventEmitter();
  company!: GetCompanyDto
  showLoading = false;
  companyId = 0;
  labels: any;


  selectedTab = 0;
  constructor(
    private service: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    protected langService: LanguageService,
    private dialog: MatDialog,
    protected cdr: ChangeDetectorRef,

  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.companyId = parseInt(params['id']);
        this.getCompany();
      }else{
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getCompany() {
    this.showLoading = true;
    this.service.getCompanyById(this.companyId).subscribe({
      next: (res => {
        this.company = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
      })
    });
  }

  backToTable() {
    this.backToTableEmit.emit();
  }
  getCompanyStatusStyle() {
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

  getCompanyPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.company?.private) {
      borderColor = '#423e3ede';
      color = '#423e3ede';
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



  onEdit() {
    const dialogRef = this.dialog.open(CompanyFormDialog, {
      disableClose: true,
      data: this.company
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCompany();
      }
    });
  }

  showBoardMember = false;
  onSelectCompanyBoard(event: CompanyBoardDto) {
    this.selectedCompanyBoard = event;
    this.showBoardMember = false;
    setTimeout(() => {
      this.showBoardMember = true;
      this.cdr.markForCheck();
    })
  }

}


