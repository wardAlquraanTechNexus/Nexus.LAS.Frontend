import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';
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
import { TableDataPipePipe } from '../pipes/table-data-pipe-pipe';
import { SharedTable } from '../dashboard-components/shared-components/shared-table/shared-table';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete-component/confirm-delete-component';
import { ConfirmDeleteDirective } from '../directives/confirm-delete-directive';
import { MatSortModule } from '@angular/material/sort';
import { TableFormComponent } from '../dashboard-components/base-components/table-form-component/table-form-component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PersonOtherDocumentForm } from '../dashboard-components/person-components/shared-person-documents-components/person-other-document-form/person-other-document-form';
import { PersonIdDocumentForm } from '../dashboard-components/person-components/shared-person-documents-components/person-id-document-form/person-id-document-form';
import { MatCheckboxModule } from '@angular/material/checkbox';




@NgModule({
  declarations: [
    Navbar,
    Sidebar,
    Footer,
    TableDataPipePipe,
    SharedTable,
    ConfirmDeleteComponent,
    ConfirmDeleteDirective,
    PersonIdDocumentForm,
    PersonOtherDocumentForm
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
    MatCheckboxModule

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
    Navbar,
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
    TableDataPipePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    PersonIdDocumentForm,
    PersonOtherDocumentForm,
    MatCheckboxModule
  ]
})
export class ComponentsModule { }
