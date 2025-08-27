import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { FormControl } from '@angular/forms';
import { CompanyAddressService } from '../../../../services/company-services/company-address-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyAddressDto } from '../../../../models/company-models/company-address/dtos/company-address-dto';
import { CompanyAddressDialogFormComponent } from './company-address-dialog-form-component/company-address-dialog-form-component';

@Component({
  selector: 'app-company-address-component',
  standalone: false,

  templateUrl: './company-address-component.html',
  styleUrl: './company-address-component.scss'
})
export class CompanyAddressComponent implements OnInit {

  @Input() company!: GetCompanyDto;
  showLoading = false;
  countries: Map<number, string> = new Map<number, string>();
  cities: Map<number, string> = new Map<number, string>();

  searchControl = new FormControl('');
  companyAddresses: CompanyAddressDto[] = [];
  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private service: CompanyAddressService,
    private dialog: MatDialog,
    private dlService: DynamicListService

  ) { }



  ngOnInit(): void {
    this.fetchData();
  }



  private fetchData() {
    this.service.getAll({ companyId:this.company.id }).subscribe(
      {
        next: (res => {
          this.companyAddresses = res;
          this.showLoading = false;
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.showLoading = false;
          this.cdr.detectChanges();
        })
      }
    );
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

  onAdd(){
    let element:CompanyAddressDto = {
    id: 0,
    companyId: this.company.id,
    addressPrimary: false,
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    poBoxNumber: '',
    poBoxCity: 0,
    poBoxCountry: 0
  }
    const dialogRef = this.dialog.open(CompanyAddressDialogFormComponent, {
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

    onEdit(element:CompanyAddressDto){ 
    const dialogRef = this.dialog.open(CompanyAddressDialogFormComponent, {
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


}

