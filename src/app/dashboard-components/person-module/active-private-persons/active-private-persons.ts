import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonStatus } from '../../../enums/person-status';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetPersonsQuery } from '../../../models/person-models/get-persons/get-persons-query';
import { MenuService } from '../../../services/menu-service';
import { PersonService } from '../../../services/person-services/person-service';
import { BasePersonsComponent } from '../_base/base-persons-component/base-persons-component';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { LanguageService } from '../../../services/language-service';
import { PersonTableView } from '../_base/person-table-view/person-table-view';

@Component({
  selector: 'app-not-active-persons',
  standalone:false,
  templateUrl: './active-private-persons.html',
  styleUrls: ['./active-private-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePrivatePersons extends PersonTableView {}