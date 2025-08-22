import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../services/user-service';
import { map, Observable, Subscription } from 'rxjs';
import { User } from '../../../../models/user/user';
import { GroupService } from '../../../../services/group-service';
import { Group } from '../../../../models/group/group';
import { PaginateRsult } from '../../../../models/paginate-result';

@Component({
  selector: 'app-user-group-form',
  standalone: false,
  templateUrl: './user-group-form.html',
  styleUrl: './user-group-form.scss'
})
export class UserGroupForm extends BaseFormComponent {
  @Input() userGroup!: any;
  userSearchText = '';
  groupSearchText = '';

  allUsers: User[] = [];
  filteredUsers: User[] = [];

  allGroups: Group[] = [];
  filteredGroups: Group[] = [];


  isLoadingUsers = false;
  loadGroupFn!: (search: string) => Observable<Group[]>;
  loadUsersFn!: (search: string) => Observable<User[]>;
  private subscriptions = new Subscription();

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    private userService: UserService,
    private groupService: GroupService
  ) {
    super(fb, cdr, sanitizer);
  }

  override ngOnInit(): void {
    this.setup(this.userGroup);
    super.ngOnInit();
    this.loadGroupFn = (search: string) => this.groupService.searchGroupByName(search).pipe(map(res=>res.collection));
    this.loadUsersFn = (search: string) => this.userService.searchUserByName(search).pipe(map(res=>res.collection));
  }

  // Optional: Clear search input when dropdown closes
  onUserSelectOpened(opened: boolean) {
    if (!opened) {
      this.userSearchText = '';
      this.filteredUsers = this.allUsers;
    }
  }

  override ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    super.ngOnDestroy();
  }
}
