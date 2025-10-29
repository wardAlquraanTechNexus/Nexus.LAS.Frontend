import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { PropertyService } from '../../../../services/property-services/property-service';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { CommonStatus } from '../../../../enums/common-status';
import { PropertyDialogFormComponent } from '../../property-dialog-form-component/property-dialog-form-component';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { BaseViewComponent } from '../../../base-components/base-view-component/base-view-component';
import { EntityIDc } from '../../../../enums/entity-idc';

@Component({
  selector: 'app-property-view',
  standalone: false,
  templateUrl: './property-view-component.html',
  styleUrls: ['../../../_shared/styles/model-view-style.scss', './property-view-component.scss']
})
export class PropertyViewComponent extends BaseViewComponent {

  override idc = EntityIDc.Properties;

  property!: PropertyDTO;
  showLoading = false;

  constructor(
    protected service: PropertyService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    protected dialog: MatDialog,
    override cdr: ChangeDetectorRef,
  ) {
    super(cdr, langService, router, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.id) {
      this.getProperty();
    } else {
      this.backToTable();
    }

  }


  private getProperty() {
    this.showLoading = true;

    this.service.getDtoById(this.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res => {
          this.property = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          console.error('Error fetching property:', err);
        })
      });
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



  onEdit() {
    const dialogRef = this.dialog.open(PropertyDialogFormComponent, {
      disableClose: true,
      data: this.property,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    // Subscribe to dialog close with unsubscribe logic
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.getProperty();
        }
      });
  }



  exportToPdf() {
    this.service.exportToPdf({ id: this.property.id })
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

          downloadBlobFile(blob, res.fileName || 'property-report.pdf');
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
          // Add user notification here if needed
        }
      });
  }
}


