import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company/company';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import GetCompanyQuery from '../../../../models/company/get-company-query/get-company-dto-command';

@Component({
  selector: 'app-base-companies-component',
  imports: [],
  templateUrl: './base-companies-component.html',
  styleUrl: './base-companies-component.scss'
})
export class BaseCompaniesComponent extends TableFormComponent<Company> implements OnInit {
    override params: GetCompanyQuery = {
      searchBy: null,
      private: null,
      status: null,
      page: 0,
      pageSize: 10
    }

      columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };
}
