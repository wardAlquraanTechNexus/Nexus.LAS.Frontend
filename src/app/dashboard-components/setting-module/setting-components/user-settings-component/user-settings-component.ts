import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetUserParam } from '../../../../models/user/get-user-dto/get-user-param';
import { UserDto } from '../../../../models/user/get-user-dto/user-dto';
import { User } from '../../../../models/user/user';
import { UserService } from '../../../../services/user-service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { UserGroupService } from '../../../../services/user-group-service';
import { UserGroupDto } from '../../../../models/user-group/user-group-dto/user-group-dto';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';
import { UpsertCollectionOfUsersCommand, UpsertUserCommand } from '../../../../models/user-group/upsert-collection-of-users/upsert-collection-of-users';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-user-settings-component',
  standalone: false,
  templateUrl: './user-settings-component.html',
  styleUrl: './user-settings-component.scss'
})
export class UserSettingsComponent extends TableFormComponent<User> {

  selectedUsers: UserDto[] = [];
  labels: any;
  groupId!: number;
  userGroups: UserGroupDto[] = [];
  override data: PaginateRsult<UserDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetUserParam = {
    username: null,
    personsIdN: null,
    page: 0,
    pageSize: 10
  };


  override displayColumns: DisplayColumn[] = [
    {
      key: "select",
      label: "Select",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "personsIdN",
      label: "Person Id",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "firstName",
      label: "First Name",
    },
    {
      key: "lastName",
      label: "Last Name",
    },
    {
      key: "loginName",
      label: "Login Name",
    }
    ,
    {
      key: "nTLogin",
      label: "NT Login",
    },

  ]

  constructor(
    override service: UserService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private userGroupService: UserGroupService,
    protected dialog: MatDialog,
    private langService: LanguageService

  ) {
    super(service, cdr, fb, router, errorHandler, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.langService.language$.subscribe(lang => {
      this.labels = Labels[lang as keyof typeof Labels];
    });
  }

  override fetchData() {
    this.showLoading = true;
    this.service.searchUser(this.params).subscribe({
      next: (users => {
        this.data = users;
        this.selectedUsers = this.data.collection;
        this.route.queryParams.subscribe(params => {
          this.groupId = +params['id'];
          this.userGroupService.getAllUserGroupDTOs({
            groupId: this.groupId
          }).subscribe({
            next: (userGroups => {
              this.userGroups = userGroups;
              this.data.collection.forEach(user => {
                const exists = this.userGroups.some(g => g.userId === parseInt(user.id));
                user.isChecked = exists;
              });
              this.showLoading = false;
              this.cdr.markForCheck();
            }),
            error: (err => {
              this.showLoading = false;
              this.cdr.markForCheck();

            })
          })
        });
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

      })
    })
  }

  onSelectionChange(selectedRows: UserDto[]) {
    this.selectedUsers = selectedRows;
    this.cdr.detectChanges();
  }


  onAddUsers() {

    let users: UpsertUserCommand[] = [];
    

    this.data.collection.forEach(user => {
      users.push({
        id:parseInt(user.id),
        isChecked : user.isChecked
      })
    });

    let params: UpsertCollectionOfUsersCommand = {
      users: users,
      groupId: this.groupId
    }
    this.showLoading = true;
    this.userGroupService.upsertCollectionOfUsers(params).subscribe({
      next: (res => {
        this.showLoading = false;
        this.errorHandler.showSuccess('Users updated successfully.');
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }

}
