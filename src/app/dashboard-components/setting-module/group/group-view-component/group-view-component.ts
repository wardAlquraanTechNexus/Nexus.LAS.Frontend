import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';
import { GroupDTO } from '../../../../models/group/group-dto/group-dto';
import { GroupService } from '../../../../services/group-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../../../models/group/group';

@Component({
  selector: 'app-group-view',
  standalone: false,
  templateUrl: './group-view-component.html',
  styleUrls: ['./group-view-component.scss']
})
export class GroupViewComponent implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
  group!: Group;
  showLoading = false;
  groupId: number | null = null;

  selectedTab = 0;
  constructor(
    private service: GroupService,
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
        this.getGroup();
      }else{
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getGroup() {
    this.showLoading = true;
    this.service.getById(this.groupId!)
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

  navigateToTable() {
    this.backToTable();
  }


  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }

   backToTable(){
    this.groupId = null;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }

}


