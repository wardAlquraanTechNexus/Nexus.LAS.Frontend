import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';
import { GroupService } from '../../../../services/group-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../../../models/group/group';
import { BaseViewComponent } from '../../../base-components/base-view-component/base-view-component';
import { EntityIDc } from '../../../../enums/entity-idc';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-group-view',
  standalone: false,
  templateUrl: './group-view-component.html',
  styleUrls: ['../../../_shared/styles/model-view-style.scss', './group-view-component.scss']
})
export class GroupViewComponent extends BaseViewComponent {

  override idc = EntityIDc.Group;
  group!: Group;
  showLoading = false;

  constructor(
    private service: GroupService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    override cdr: ChangeDetectorRef,

  ) {
    super(cdr, langService, router, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.id) {
      this.getGroup();
    } else {
      this.backToTable();
    }
  }

  private getGroup() {
    this.showLoading = true;
    this.service.getById(this.id!)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res => {
          this.group = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
        })
      });
  }



}


