import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyEmailDto } from '../../../../models/company-models/company-email/dtos/company-email-dto';
import { CompanyEmailService } from '../../../../services/company-services/company-email-service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyEmailDialogFormComponent } from './company-email-dialog-form-component/company-email-dialog-form-component';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-email-component',
  standalone: false,

  templateUrl: './company-email-component.html',
  styleUrl: './company-email-component.scss'
})
export class CompanyEmailComponent implements OnInit {

  @Input() company!: GetCompanyDto;
  showLoading = false;
  companyEmails: CompanyEmailDto[] = [];

  get label() {
    return this.langService.currentLabels;
  }

  constructor(
    private route: ActivatedRoute,
    private service: CompanyEmailService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private langService: LanguageService
  ) { }


  ngOnInit(): void {
    this.fetchData();
  }






  private fetchData() {
    this.showLoading = true;
    this.service.getAll({ companyId: this.company.id }).subscribe(res => {
      this.showLoading = false;
      this.companyEmails = res;
      this.cdr.detectChanges();
    });
  }

  getRemoveEmailCallback(index: number): () => void {
    return () => this.removeEmailAddress(index);
  }
  removeEmailAddress(id: number): void {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;
        this.cdr.detectChanges();
      }),
      error: (err => {
        this.showLoading = false;
      })
    })


    return;
  }

  onAdd() {
    let companyEmail: CompanyEmailDto = {
      id: 0,
      companyId: this.company.id,
      emailPrimary: false,
      email: ""
    };
    const dialogRef = this.dialog.open(CompanyEmailDialogFormComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: companyEmail

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onEdit(companyEmail: any) {

    const dialogRef = this.dialog.open(CompanyEmailDialogFormComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: companyEmail

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  getPrimaryStyle(isPrimary: boolean) {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!isPrimary) {
      return {};
    }
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };
  }

  getRemoveCallback(id: number): () => void {
    return () => this.removeAddress(id);
  }

  removeAddress(id: number): void {
    this.showLoading = true;

    this.service.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.fetchData();
      }),
      error: (err => {
        this.showLoading = false;
      })
    })
  }
}
