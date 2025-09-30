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
import { MatExpansionModule } from '@angular/material/expansion';
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
import { NumberSeperatorPipe } from '../pipes/number-seperator-pipe';
import { ThousandSeparatorDirective } from '../directives/thousand-separator.directive';
import { NumberFormatDirective } from '../directives/number-format.directive';

import { DatePickerModule } from 'primeng/datepicker';
import { SaveButtonComponent } from './save-button/save-button';
import { DlSelectAutoComplete } from './dl-select-auto-complete/dl-select-auto-complete';
import { SharedPropertyComponent } from '../dashboard-components/shared-components/shared-property-component/shared-property-component';
import { LawFirmFormComponent } from '../dashboard-components/law-firm-module/law-firm-form-component/law-firm-form-component';
import { LawFirmDialogFormComponent } from '../dashboard-components/law-firm-module/law-firm-dialog-form-component/law-firm-dialog-form-component';
import { TransactionFormComponent } from '../dashboard-components/transaction-module/transaction-form-component/transaction-form-component';
import { TransactionDialogFormComponent } from '../dashboard-components/transaction-module/transaction-dialog-form-component/transaction-dialog-form-component';



@NgModule({
  declarations: [
    NavbarComponent,
    Sidebar,
    Footer,
    SharedTable,
    ConfirmDeleteComponent,
    ConfirmDeleteDirective,
    ThousandSeparatorDirective,
    NumberFormatDirective,
    BaseDialogComponent,
    BaseDialogFormComponent,
    BaseFormComponent,
    SharedTreeComponent,
    SelectAutoComplete,
    TableDataPipe,
    TextPipe,
    NumberSeperatorPipe,
    SharedRegisterNoteTable,
    SharedRegisterNoteForm,
    SharedRegisterNoteFormDialog,
    CompanyForm,
    CompanyFormDialog,
    PersonFormComponent,
    PersonDialogFormComponent,
    SharedCompanyShareholderComponent,
    DateInputComponent,
    SaveButtonComponent,
    DlSelectAutoComplete,
    SharedPropertyComponent,
    LawFirmFormComponent,
    LawFirmDialogFormComponent,
    TransactionFormComponent,
    TransactionDialogFormComponent

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
    MatExpansionModule,
    DatePickerModule

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
    // NavbarEnComponent,
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
    ThousandSeparatorDirective,
    NumberFormatDirective,
    MatSortModule,
    TableDataPipe,
    TextPipe,
    NumberSeperatorPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    BaseDialogComponent,
    BaseFormComponent,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
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
    DateInputComponent,
    DatePickerModule,
    SaveButtonComponent,
    DlSelectAutoComplete,
    SharedPropertyComponent,
    LawFirmFormComponent,
    LawFirmDialogFormComponent,
    TransactionFormComponent,
    TransactionDialogFormComponent

  ],
  providers: [

  ]
})
export class ComponentsModule { }
