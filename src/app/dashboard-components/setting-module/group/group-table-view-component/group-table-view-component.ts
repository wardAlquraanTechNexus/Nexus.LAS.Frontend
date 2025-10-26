import { ChangeDetectorRef, Component } from '@angular/core';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { UserGroupService } from '../../../../services/user-group-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-group-table-view',
  standalone: false,
  templateUrl: './group-table-view-component.html',
  styleUrls: ['./group-table-view-component.scss']
})
export class GroupTableViewComponent {

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  groupId : number | null = null;
  showTable?: boolean | null = null;
  constructor(
    private service: UserGroupService,
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
        this.groupId = parseInt(params['id']);
        this.showTable = false;
        // this.getGroup();
      }else{
        this.showTable = true;
        this.groupId = null;
        // this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

   protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }
}
