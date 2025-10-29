import { ChangeDetectorRef, Component } from '@angular/core';
import { CompanyService } from '../../../services/company-services/company-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { LanguageService } from '../../../services/language-service';
import { CompanyFormDialog } from '../company-form-dialog/company-form-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CompanyBoardDto } from '../../../models/company-models/company-board/dtos/company-board-dto';
import { downloadBlobFile } from '../../_shared/shared-methods/downloadBlob';
import { CompanyCapitalDto } from '../../../models/company-models/company-capital/dtos/company-capital-dto';
import { takeUntil } from 'rxjs';
import { BaseViewComponent } from '../../base-components/base-view-component/base-view-component';
import { CommonStatus } from '../../../enums/common-status';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-company-view-component',
  standalone: false,
  templateUrl: './company-view-component.html',
  styleUrls: ['../../_shared/styles/model-view-style.scss' , './company-view-component.scss']
})
export class CompanyViewComponent extends BaseViewComponent {
  

  override idc: EntityIDc = EntityIDc.Company;
  selectedCompanyBoard?: CompanyBoardDto | null;
  company!: GetCompanyDto
  showLoading = false;

  showBoardMember = false;

  constructor(
    private service: CompanyService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    private dialog: MatDialog,
    override cdr: ChangeDetectorRef,
  ) {
    super(cdr, langService, router, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    // Subscribe to query params with unsubscribe logic
   
        if (this.id) {
          this.getCompany();
        } else {
          this.backToTable();
        }
    

  }

  

  private getCompany() {
    this.showLoading = true;
    
    this.service.getCompanyById(this.id!)
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

 

  getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    
    switch (this.company?.companyStatus.toString()) {
      case CommonStatus[CommonStatus.Active]:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case CommonStatus[CommonStatus.Inactive]:
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
      case CommonStatus.Active:
        return 'check_circle';
      case CommonStatus.Inactive:
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


