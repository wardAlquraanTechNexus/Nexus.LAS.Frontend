import { Component } from '@angular/core';
import { LawFirmViewComponent } from '../_base/law-firm-view-component/law-firm-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-all-law-firms-component',
  standalone: false,
  templateUrl: './all-law-firms-component.html',
  styleUrl: './all-law-firms-component.scss'
})
export class AllLawFirmsComponent  extends BaseTableViewComponent
{

}
