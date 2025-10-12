import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { PropertyService } from '../../../../services/property-services/property-service';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { CommonStatus } from '../../../../enums/common-status';
import { PropertyDialogFormComponent } from '../../property-dialog-form-component/property-dialog-form-component';
import { EntityIDc } from '../../../../enums/entity-idc';

@Component({
  selector: 'app-property-view',
  standalone: false,
  templateUrl: './property-view-component.html',
  styleUrl: './property-view-component.scss'
})
export class PropertyViewComponent implements OnInit, OnDestroy {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
  property!: PropertyDTO;
  showLoading = false;
  propertyId = 0;

  propertyIdc = EntityIDc.Properties;

  selectedTab = 0;
  constructor(
    protected service: PropertyService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected langService: LanguageService,
    protected dialog: MatDialog,
    protected cdr: ChangeDetectorRef,

  ) {
    console.log('PropertyViewComponent constructor');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.propertyId = parseInt(params['id']);
        this.getProperty();
      }else{
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getProperty() {
    this.showLoading = true;
    this.service.getDtoById(this.propertyId).subscribe({
      next: (res => {
        this.property = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
      })
    });
  }

  navigateToTable() {
    this.backToTableEmit.emit();
  }
   getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    switch (this.property?.status) {
      case CommonStatus.Active:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case CommonStatus.Inactive:
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
    switch (this.property?.status) {
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
    if (!this.property?.private) {
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
  }



  onEdit() {
    const dialogRef = this.dialog.open(PropertyDialogFormComponent, {
      disableClose: true,
      data: this.property,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProperty();
      }
    });
  }

   backToTable(){
    this.propertyId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }


  ngOnDestroy(): void {
    console.log('PropertyViewComponent ngOnDestroy');
  }

 

}


