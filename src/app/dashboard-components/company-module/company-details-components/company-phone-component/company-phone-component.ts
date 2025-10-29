import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyPhone } from '../../../../models/company-models/company-phone/company-phone';
import { CompanyPhoneService } from '../../../../services/company-services/company-phone-service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PersonPhone } from '../../../../models/person-models/person-phone/person-phone';
import { PersonPhoneDialogComponent } from '../../../person-module/shared-person-components/person-phone-details/person-phone-dialog-component/person-phone-dialog-component';
import { CompanyPhoneDialogFormComponent } from './company-phone-dialog-form-component/company-phone-dialog-form-component';
import { CompanyPhoneDto } from '../../../../models/company-models/company-phone/dtos/company-phone-dto';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';

@Component({
  selector: 'app-company-phone-component',
  standalone: false,
  templateUrl: './company-phone-component.html',
  styleUrl: './company-phone-component.scss'
})
export class CompanyPhoneComponent implements OnInit {
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  @Input() company!: GetCompanyDto;


  personId = 0;
  companyPhones: CompanyPhone[] = [];
  showLoading = false;

  

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private service: CompanyPhoneService,
    private dialog: MatDialog,
    private langService: LanguageService,

  ) { }



  ngOnInit(): void {
    this.fetchData();
     this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });

  }

  private fetchData() {
    this.showLoading = true;
    this.service.getAll({ companyId: this.company.id }).subscribe({
      next: (res => {
        this.showLoading = false;
        this.companyPhones = res;
        this.cdr.detectChanges();

      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();

      })
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


  onAdd() {
    const element: CompanyPhoneDto = {
      id: 0,
      companyId: this.company.id,
      phonePrimary: false,
      phoneType: '',
      phoneNumber: '',
      phoneNumberNote: ''
    };

    const dialogRef = this.dialog.open(CompanyPhoneDialogFormComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: element

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onedit(element: any) {


    const dialogRef = this.dialog.open(CompanyPhoneDialogFormComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: element

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
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
