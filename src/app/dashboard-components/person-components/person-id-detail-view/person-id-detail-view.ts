import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonIdDetailService } from '../../../services/person-id-detail-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsIDDetail } from '../../../models/person-id-details/person-id-details';
import { PersonIdDetailDto } from '../../../models/person-id-details/person-id-details-dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-person-id-detail-view',
  standalone: false,
  templateUrl: './person-id-detail-view.html',
  styleUrl: './person-id-detail-view.scss'
})
export class PersonIdDetailView implements OnInit {
  personProperties = [
  ];
  imageUrl: SafeResourceUrl | null = null;
  personIdDetail!: PersonIdDetailDto;
  id: number = 0;
  showLoading = false;
  constructor(
    private service: PersonIdDetailService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.id = parseInt(id);
      this.showLoading = true;
      this.service.getDTOById(this.id).subscribe(
        {
          next: (data) => {
            this.personIdDetail = data;
            this.personIdDetail = data;

        if (data.dataFile && data.contentType) {

          // If dataFile is base64
          const base64Data = data.dataFile;
          const blob = this.base64ToBlob(base64Data, data.contentType);
          const url = URL.createObjectURL(blob);

          this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
            this.showLoading = false;
            this.cdr.detectChanges();
          },
          error: (error) => {
            this.showLoading = false;
            this.snackBar.open('Error loading person ID details', 'Close', { duration: 3000 });
          }
        }
      )

    }
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
  getPrimaryStyle() {
    if (this.personIdDetail.isPrimary) {
      return {
        'border': `2px solid #025EBA`,
        'color': '#025EBA',
        'border-radius': '20px',
        'padding': '10px'

      };
    }
    return {}
  }
}
