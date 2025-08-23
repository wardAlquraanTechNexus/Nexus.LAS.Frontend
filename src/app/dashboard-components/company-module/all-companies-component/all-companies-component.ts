import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseCompaniesComponent } from '../_base/base-companies-component/base-companies-component';
import { CompanyService } from '../../../services/company-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { MenuService } from '../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetCompanyDto } from '../../../models/company/get-company-query/get-company-dto';
import { CompanyFormDialog } from '../company-form-dialog/company-form-dialog';
import { CompanyTableView } from '../_base/company-table-view/company-table-view';

@Component({
  selector: 'app-all-companies-component',
  standalone: false,
  templateUrl: './all-companies-component.html',
  styleUrls: ['./all-companies-component.scss']
})
export class AllCompaniesComponent extends CompanyTableView {

}