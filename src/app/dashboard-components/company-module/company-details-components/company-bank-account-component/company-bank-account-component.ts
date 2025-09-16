import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CompanyBankAccountService } from '../../../../services/company-services/company-bank-account-service';
import { CompanyBankAccountDto } from '../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyBankAccountDialogFormComponent } from './company-bank-account-dialog-form-component/company-bank-account-dialog-form-component';
import { MatDialog } from '@angular/material/dialog';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-bank-account-component',
  standalone: false,
  templateUrl: './company-bank-account-component.html',
  styleUrl: './company-bank-account-component.scss',
})
export class CompanyBankAccountComponent implements OnInit {
  showLoading = false;
  @Input() company!: GetCompanyDto
  list: CompanyBankAccountDto[] = [];

    get label() {
      return Labels[this.currentLang as keyof typeof Labels];
    }
    currentLang: LanguageCode = 'en';
  
  constructor(
    private service: CompanyBankAccountService,
    private dialog:MatDialog,
    private cdr: ChangeDetectorRef,
    private langService: LanguageService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.subscribeLanguage();
  }

  expandedMap: { [key: number]: boolean } = {};

  private fetchData() {
    this.showLoading = true;
    this.service.getAll({ companyId: this.company.id }).subscribe({
      next: (res => {
        this.list = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

      })
    });
  }

  subscribeLanguage(){
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });
    
  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }

  toggleCard(index: number) {
    this.expandedMap[index] = !this.expandedMap[index];
  }


  onAdd(){
      let element:CompanyBankAccountDto = {
      id: 0,
      companyId: this.company.id,
      bankName: "",
      bankAccountActive : false,
      accountNumber : "",
      note : "",
      bankAccountDate : "",
      
    }
      const dialogRef = this.dialog.open(CompanyBankAccountDialogFormComponent, {
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
  
      onEdit(element:CompanyBankAccountDto){ 
      const dialogRef = this.dialog.open(CompanyBankAccountDialogFormComponent, {
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

}
