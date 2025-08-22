import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person-services/person-service';
import { PersonStatus } from '../../../enums/person-status';
import { PersonDetailsForm } from '../shared-person-components/person-details-form/person-details-form';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PersonDto } from '../../../models/persons/person-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '../../../services/menu-service';
import { environment } from '../../../../environment/environment';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-person-view',
  standalone: false,
  templateUrl: './person-view.html',
  styleUrl: './person-view.scss'
})
export class PersonView implements OnInit {
  personIdc = EntityIDc.person
  personsUrl: any;
  imageUrl: any;
  fallbackImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42mP8z8BQDwAFgwJ/lcu6zQAAAABJRU5ErkJggg==';
  selectedTab = 0
  showLoading = false;
  person: PersonDto | null = null;
  personId = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private errorHandler: ErrorHandlerService) { }
  ngOnInit(): void {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.getPerson();
      this.personsUrl = 
        this.menuService.getMenuByPath(environment.routes.AllPersons) ||
        this.menuService.getMenuByPath(environment.routes.ActivePersons) ||
        this.menuService.getMenuByPath(environment.routes.ActivePrivatePersons);
    }
  }


  private getPerson() {
    this.showLoading = true;
    this.personService.getPersonDto(this.personId).subscribe({
      next: (data) => {
        this.person = data;

        this.showLoading = false;
        if (data?.personImage && data?.contentType) {

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
    this.router.navigateByUrl(`${environment.routes.Persons}/${this.personsUrl.path}`);

  }
  getPersonStatusStyle() {
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

  getPersonPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.person?.private) {
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

  openPersonDialog(): void {
    const dialogRef = this.dialog.open(PersonDetailsForm, {
      width: '600px',
      data: this.person,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cdr.markForCheck();

        this.person = result;

      }
    });
  }

  exportToPdf() {
    this.personService.exportPersonToPdf({ id: this.personId }).subscribe(res => {
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
    });
  }

  openFilePicker(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];
    this.showLoading = true;
    this.personService.uploadImage({ file: file, personId: this.personId }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Image Uploaded Successfully")
        this.getPerson();
      }), error: (err => {
        this.showLoading = false;
        this.errorHandler.handleApiError(err, 'Image Upload');
      })
    })
  }
}



