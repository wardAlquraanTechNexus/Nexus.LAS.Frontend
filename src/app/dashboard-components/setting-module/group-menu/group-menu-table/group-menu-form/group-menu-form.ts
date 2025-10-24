import { ChangeDetectorRef, Component, Inject, Input, Optional, PLATFORM_ID } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupMenu } from '../../../../../models/group-menu/group-menu';
import { PaginateRsult } from '../../../../../models/paginate-result';
import { Group } from '../../../../../models/group/group';
import { map, Observable } from 'rxjs';
import { MenuService } from '../../../../../services/menu-service';
import { GroupService } from '../../../../../services/group-service';
import { Menu } from '../../../../../models/menus/menu';
import { SearchGroupMenuDTO } from '../../../../../models/group-menu/search-group-menu/search-group-menu-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-user-group-form',
  standalone: false,
  templateUrl: './group-menu-form.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class GroupMenuForm extends BaseFormComponent {
  @Input() groupMenu!: SearchGroupMenuDTO;

  loadGroupFn!: (search: string) => Observable<Group[]>;
  loadMenusFn!: (search: string) => Observable<Menu[]>;

  override get label() {
    return this.langService.currentLabels;
  }

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected menuService: MenuService,
    protected groupService: GroupService,
    protected override errorHandler: ErrorHandlerService,
    protected override langService: LanguageService

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.groupMenu);
    super.ngOnInit();
    this.loadGroupFn = (search: string) => this.groupService.searchGroupByName(search).pipe(map(res => res.collection));
    this.loadMenusFn = (search: string) => this.getMenusByName(search);

  }


  getMenusByName(menuName: string): Observable<Menu[]> {
    return this.menuService.searchMenu({ name: menuName, pageSize: 100 }).pipe(
      map(res => res.collection)
    );
  }

}
