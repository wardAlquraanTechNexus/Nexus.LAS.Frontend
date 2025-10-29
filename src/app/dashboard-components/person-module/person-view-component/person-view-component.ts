import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person-services/person-service';
import { PersonStatus } from '../../../enums/person-status';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PersonDto } from '../../../models/person-models/person-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '../../../services/menu-service';
import { environment } from '../../../../environment/environment';
import { PersonDialogFormComponent } from '../person-dialog-form-component/person-dialog-form-component';
import { LanguageService } from '../../../services/language-service';
import { takeUntil } from 'rxjs';
import { BaseViewComponent } from '../../base-components/base-view-component/base-view-component';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-person-view-component',
  standalone: false,
  templateUrl: './person-view-component.html',
  styleUrls: ['../../_shared/styles/model-view-style.scss']
})
export class PersonViewComponent extends BaseViewComponent {


  override idc: EntityIDc = EntityIDc.Person;
  imageUrl: any;
  fallbackImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42mP8z8BQDwAFgwJ/lcu6zQAAAABJRU5ErkJggg==';
  showLoading = false;
  person: PersonDto | null = null;


  // Add these new properties

  constructor(
    override route: ActivatedRoute,
    override router: Router,
    private personService: PersonService,
    protected override cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private errorHandler: ErrorHandlerService,
    override langService: LanguageService,
  ) {
    super(cdr, langService, router, route);
  }

  override ngOnInit(): void {
    // Subscribe to query params with unsubscribe logic
    super.ngOnInit();

    if (this.id) {
      this.getPerson();
    } else {
      this.backToTable();
    }



  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Clean up image URL to prevent memory leaks
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  private getPerson() {
    this.showLoading = true;

    this.personService.getPersonDto(this.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.person = data;
          this.showLoading = false;

          if (data?.personImage && data?.contentType) {
            // Clean up previous image URL
            if (this.imageUrl) {
              URL.revokeObjectURL(this.imageUrl);
            }

            // If dataFile is base64
            const base64Data = data?.personImage;
            const blob = this.base64ToBlob(base64Data, data.contentType);
            const url = URL.createObjectURL(blob);
            this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error fetching person:', err);
          this.cdr.detectChanges();
        }
      });
  }

  base64ToBlob(base64: any, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  navigateToPersons() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    switch (this.person?.personStatus) {
      case PersonStatus.Active:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case PersonStatus.Inactive:
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
    switch (this.person?.personStatus) {
      case PersonStatus.Active:
        return 'check_circle';
      case PersonStatus.Inactive:
        return 'cancel';
      default:
        return 'star';
    }
  }

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.person?.private) {
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

  openPersonDialog(): void {
    const dialogRef = this.dialog.open(PersonDialogFormComponent, {
      width: '600px',
      data: this.person,
      disableClose: true
    });

    // Subscribe to dialog close with unsubscribe logic
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.cdr.markForCheck();
          this.person = result;
        }
      });
  }

  exportToPdf() {
    this.personService.exportToPdf({ id: this.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // Assuming res.data is a base64 string
          const binaryString = atob(res.data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], {
            type: 'application/pdf'
          });

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = res.fileName || 'report.pdf';
          link.click();
          URL.revokeObjectURL(link.href);
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
        }
      });
  }

  openFilePicker(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.showLoading = true;

    this.personService.uploadImage({ file: file, personId: this.id! })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.errorHandler.showSuccess("Image Uploaded Successfully");
          this.getPerson();
        },
        error: (err) => {
          this.showLoading = false;
          this.errorHandler.handleApiError(err, 'Image Upload');
        }
      });
  }






}



