import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { NavbarComponent } from './navbar-components/navbar-components';
import { Footer } from './footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedTable } from '../dashboard-components/shared-components/shared-table/shared-table';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete-component/confirm-delete-component';
import { ConfirmDeleteDirective } from '../directives/confirm-delete-directive';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseDialogComponent } from '../dashboard-components/base-components/base-dialog-component/base-dialog-component';
import { BaseFormComponent } from '../dashboard-components/base-components/base-form-component/base-form-component';
import { SharedTreeComponent } from './shared-tree-component/shared-tree-component';
import { SelectAutoComplete } from './select-auto-complete/select-auto-complete';
import { NavbarEnComponent } from './navbar-components/navbar-en-component/navbar-en-component';
import { NavbarArComponent } from './navbar-components/navbar-ar-component/navbar-ar-component';
import { BaseDialogFormComponent } from '../dashboard-components/base-components/base-dialog-form-component/base-dialog-form-component';
import { TableDataPipe } from '../pipes/table-data-pipe';
import { TextPipe } from '../pipes/text-pipe';
import { SharedRegisterNoteFormDialog } from '../dashboard-components/shared-components/shared-register-note/shared-register-note-form-dialog/shared-register-note-form-dialog';
import { SharedRegisterNoteForm } from '../dashboard-components/shared-components/shared-register-note/shared-register-note-form/shared-register-note-form';
import { SharedRegisterNoteTable } from '../dashboard-components/shared-components/shared-register-note/shared-register-note-table/shared-register-note-table';
import { CompanyFormDialog } from '../dashboard-components/company-module/company-form-dialog/company-form-dialog';
import { CompanyForm } from '../dashboard-components/company-module/company-form/company-form';
import { PersonDialogFormComponent } from '../dashboard-components/person-module/person-dialog-form-component/person-dialog-form-component';
import { SharedCompanyShareholderComponent } from '../dashboard-components/shared-components/shared-company-shareholder-component/shared-company-shareholder-component';
import { PersonFormComponent } from '../dashboard-components/person-module/shared-person-components/person-form-component/person-form-component';
import { DateInputComponent } from './date-input-component/date-input-component';




@NgModule({
  declarations: [
    NavbarComponent,
    NavbarEnComponent,
    NavbarArComponent,
    Sidebar,
    Footer,
    SharedTable,
    ConfirmDeleteComponent,
    ConfirmDeleteDirective,
    BaseDialogComponent,
    BaseDialogFormComponent,
    BaseFormComponent,
    SharedTreeComponent,
    SelectAutoComplete,
    TableDataPipe,
    TextPipe,
    SharedRegisterNoteTable,
    SharedRegisterNoteForm,
    SharedRegisterNoteFormDialog,
    CompanyForm,
    CompanyFormDialog,
    PersonFormComponent,
    PersonDialogFormComponent,
    SharedCompanyShareholderComponent,
    DateInputComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTreeModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioGroup,
    MatRadioButton,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,


  ],
  exports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTreeModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    NavbarComponent,
    NavbarEnComponent,
    NavbarArComponent,
    Sidebar,
    Footer,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioGroup,
    MatRadioButton,
    MatButtonToggleModule,
    MatSlideToggleModule,
    SharedTable,
    MatDialogModule,
    ConfirmDeleteComponent,
    ConfirmDeleteDirective,
    MatSortModule,
    TableDataPipe,
    TextPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    BaseDialogComponent,
    BaseFormComponent,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    SharedTreeComponent,
    SelectAutoComplete,
    BaseDialogFormComponent,
    SharedRegisterNoteTable,
    SharedRegisterNoteForm,
    SharedRegisterNoteFormDialog,
    CompanyForm,
    CompanyFormDialog,
    PersonFormComponent,
    PersonDialogFormComponent,
    SharedCompanyShareholderComponent,
    DateInputComponent
  ],
  providers: [

  ]
})
export class ComponentsModule { }
