import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../services/user-service';
import { Observable, Subscription } from 'rxjs';
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
  loadGroupFn!: (search: string) => Observable<PaginateRsult<Group>>;
  private subscriptions = new Subscription();

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override snackBar: MatSnackBar,
    protected override sanitizer: DomSanitizer,
    private userService: UserService,
    private groupService: GroupService
  ) {
    super(fb, cdr, snackBar, sanitizer);
  }

  override ngOnInit(): void {
    this.setup(this.userGroup);
    super.ngOnInit();
    this.loadUsers();
    this.loadGroups();
    this.loadGroupFn = (search: string) => this.groupService.searchGroupByName(search);


  }

  loadUsers() {
    this.isLoadingUsers = true;
    this.userService.searchUser({ username: this.userSearchText }).subscribe(users => {
      this.allUsers = users.collection;
      this.filteredUsers = users.collection;
      this.isLoadingUsers = false;
    });
  }

  loadGroups() {
    this.isLoadingUsers = true;
    this.groupService.searchGroup({ groupName: this.groupSearchText }).subscribe(groups => {
      this.allGroups = groups.collection;
      this.filteredGroups = groups.collection;
      this.isLoadingUsers = false;
    });
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
