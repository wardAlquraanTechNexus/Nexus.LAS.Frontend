import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { EntityIDc } from '../../../../enums/entity-idc';
import { LawFirmService } from '../../../../services/law-firm-services/law-firm-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { LawFirm } from '../../../../models/law-firm-models/law-firm/law-firm';
import { CommonStatus } from '../../../../enums/common-status';
import { LawFirmDialogFormComponent } from '../../law-firm-dialog-form-component/law-firm-dialog-form-component';

@Component({
  selector: 'app-law-firm-view',
  standalone: false,
  templateUrl: './law-firm-view-component.html',
  styleUrls: ['./law-firm-view-component.scss']
})
export class LawFirmViewComponent  implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
  lawFirm!: LawFirmDTO;
  showLoading = false;
  lawFirmId = 0;

  idc = EntityIDc.LawFirm;
  statuses = CommonStatus;

  selectedTab = 0;
  constructor(
    private service: LawFirmService,
    private router: Router,
    private route: ActivatedRoute,
    protected langService: LanguageService,
    private dialog: MatDialog,
    protected cdr: ChangeDetectorRef,

  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.lawFirmId = parseInt(params['id']);
        this.getLawFirm();
      }else{
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getLawFirm() {
    this.showLoading = true;
    this.service.getDtoById(this.lawFirmId)
    .subscribe({
      next: (res => {
        this.lawFirm = res;
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
    switch (this.lawFirm?.status) {
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

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.lawFirm?.private) {
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


  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }



  onEdit() {
    const dialogRef = this.dialog.open(LawFirmDialogFormComponent, {
      disableClose: true,
      data: this.lawFirm,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLawFirm();
      }
    });
  }

   backToTable(){
    this.lawFirmId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }

}


