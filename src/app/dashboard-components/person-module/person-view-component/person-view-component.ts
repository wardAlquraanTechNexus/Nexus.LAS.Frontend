import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person-services/person-service';
import { PersonStatus } from '../../../enums/person-status';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PersonDto } from '../../../models/person-models/person-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '../../../services/menu-service';
import { environment } from '../../../../environment/environment';
import { EntityIDc } from '../../../enums/entity-idc';
import { PersonFormComponent } from '../person-form-component/person-form-component';
import { PersonDialogFormComponent } from '../person-dialog-form-component/person-dialog-form-component';
import { LanguageService } from '../../../services/language-service';
import { LanguageCode } from '../../../models/types/lang-type';
import { Labels } from '../../../models/consts/labels';

@Component({
  selector: 'app-person-view-component',
  standalone: false,
  templateUrl: './person-view-component.html',
  styleUrl: './person-view-component.scss'
})
export class PersonViewComponent implements OnInit {
  personIdc = EntityIDc.Person
  personsUrl: any;
  imageUrl: any;
  fallbackImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42mP8z8BQDwAFgwJ/lcu6zQAAAABJRU5ErkJggg==';
  selectedTab = 0
  showLoading = false;
  person: PersonDto | null = null;
  personId : number | null = null;

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  @Output() backToTableEmit = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private errorHandler: ErrorHandlerService,
    private langService: LanguageService,
  ) { }
  ngOnInit(): void {
    // react to query param changes
    this.route.queryParams.subscribe(params => {
      let personId = params['id'];
      if (personId > 0) {
        this.personId = parseInt(personId, 10);
        this.getPerson();
        this.personsUrl =
          this.menuService.getMenuByPath(environment.routes.AllPersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicPersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivatePersons);
      }
    });

    // still keep language subscription
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }


  private getPerson() {
    this.showLoading = true;
    this.personService.getPersonDto(this.personId!).subscribe({
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
    this.backToTableEmit.emit();
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

   getIcon(){
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cdr.markForCheck();

        this.person = result;

      }
    });
  }

  exportToPdf() {
    this.personService.exportToPdf({ id: this.personId }).subscribe(res => {
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
    this.personService.uploadImage({ file: file, personId: this.personId! }).subscribe({
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



