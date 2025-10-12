import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayColumn } from '../../../models/columns/display-column';
import { PaginateRsult } from '../../../models/paginate-result';
import { BaseParam } from '../../../models/base/base-param';
import { SelectionModel } from '@angular/cdk/collections';
import { Person } from '../../../models/person-models/person';
import { LanguageService } from '../../../services/language-service';
import { Direction } from '@angular/cdk/bidi';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { environment } from '../../../../environment/environment.prod';
import { map, Observable, of } from 'rxjs';
import { PersonService } from '../../../services/person-services/person-service';
import { CompanyService } from '../../../services/company-services/company-service';
import { EntityIDc } from '../../../enums/entity-idc';
import { CompanyContractStatus } from '../../../enums/company-contract-status';
import { CompanyLicenseStatus } from '../../../enums/company-license-status';
import { PersonStatus } from '../../../enums/person-status';
import { CompanyStatus } from '../../../enums/company-status';
import { CommonStatus } from '../../../enums/common-status';

@Component({
  selector: 'app-shared-table',
  standalone: false,
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss'
})
export class SharedTable implements OnInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() selectedRowIndex: number = -1;

  @Input() displayedColumns: DisplayColumn[] = [];

  @Input() paginateResult!: PaginateRsult<any>;

  @Output() onChangePage = new EventEmitter<BaseParam>;
  @Output() rowClick = new EventEmitter<any>();
  @Output() onSortChangeEvent = new EventEmitter<Sort>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Input() keyToCheck!: string;

  @Input() action!: TemplateRef<any>;

  selection = new SelectionModel<any>(true, []);

  dataSource!: MatTableDataSource<any, MatPaginator>
  displayedColumnKeys: any;

  dir: Direction = "ltr";
  labels: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    protected langService: LanguageService,
    private dlService: DynamicListService,
    private personService: PersonService,
    private companyService: CompanyService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginateResult'] && this.paginateResult?.collection) {
      if (this.dataSource) {
        this.dataSource.data = this.paginateResult.collection;
        this.cdRef.detectChanges();
      } else {
        this.dataSource = new MatTableDataSource(this.paginateResult.collection);
        this.cdRef.detectChanges();
      }
    }

    // Update displayedColumnKeys when displayedColumns changes
    if (changes['displayedColumns']) {
      this.displayedColumnKeys = this.displayedColumns.map(c => c.key);
      this.cdRef.detectChanges();
    }
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.paginateResult.collection);
    this.displayedColumnKeys = this.displayedColumns.map(c => c.key);

    this.cdRef.detectChanges();

    this.langService.language$.subscribe(lang => {
      if (lang == 'en')
        this.dir = 'ltr';
      else
        this.dir = 'rtl';

      this.labels = this.langService.getLabels(lang);
      this.cdRef.detectChanges();
    });



  }

  trackColumn(index: number, column: DisplayColumn): string {
    return `${column.key}_${index}`;
  }

  onPageChange(event: PageEvent): void {
    this.onChangePage.emit({
      page: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  onRowClick(element: any, key: any, index: number) {
    this.selectedRowIndex = index;
    let rowClick = { element, key, index }
    this.rowClick.emit(rowClick);
  }


  lastSortColumn: string | null = null;

  onSortChange(sortState: Sort) {
    this.onSortChangeEvent.emit(sortState);
  }


  getCellStyle(value: any, pipes: string[] | undefined): { [key: string]: string } {
    if (!pipes) return {};

    const styles: { [key: string]: string } = {};

    for (const pipe of pipes) {
      if (!pipe) continue;

      switch (pipe.toLowerCase()) {
        case 'link':
          Object.assign(styles, {
            'text-decoration': 'underline',
            'color': '#025EBA',
            'cursor': 'pointer',
            'padding': '10px'
          });
          break;

        case 'company-contract-status':
          if (value) {
            const isActive = value == CompanyContractStatus.Active;
            const isExpired = value == CompanyContractStatus.Expired;
            const color = isActive ? '#22C993' : isExpired ? '#423e3ede' : '';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;

        case 'person-status':
          {
            let color = '#9E77ED';
            if (value === PersonStatus.Active) color = '#22C993';
            else if (value === PersonStatus.Inactive) color = '#423e3ede';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;

        case 'company-status':
          {
            let color = '#9E77ED';
            if (value === CompanyStatus.Active) color = '#22C993';
            else if (value === CompanyStatus.Inactive) color = '#423e3ede';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;
        case 'common-status':
          {
            let color = '#9E77ED';
            if (value === CommonStatus[CommonStatus.Active]) color = '#22C993';
            else if (value === CommonStatus[CommonStatus.Inactive]) color = '#423e3ede';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;

        case 'company-license-status':
          {
            let color = '#9E77ED';
            if (value === CompanyLicenseStatus.Active) color = '#22C993';
            else if (value === CompanyLicenseStatus.Expired) color = '#423e3ede';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;

        case 'active':
        case 'company-shareholder-status':
        case 'private-person':
        case 'private-company':
        case 'capital-active':
        case 'signatory-active':
        case 'private':

          const color = value ? '#025EBA' : '#423e3ede';
          Object.assign(styles, {
            'border': `2px solid ${color}`,
            'color': color,
            'border-radius': '20px',
            'padding': '10px'
          });
          break;

        case 'person-company-in-charge':
          {
            let color = '#9E77ED';
            if (value == 'Active') color = '#22C993';
            else if (value == 'Inactive') color = '#423e3ede';
            Object.assign(styles, {
              'border': `2px solid ${color}`,
              'color': color,
              'border-radius': '20px',
              'padding': '10px'
            });
          }
          break;

        case 'person-document-primary':
        case 'person-in-charge-primary':
        case 'primary':
          if (value.toString() === 'true') {
            Object.assign(styles, {
              'border': `2px solid #025EBA`,
              'color': '#025EBA',
              'border-radius': '20px',
              'text-overflow': 'ellipsis',
              'padding': '5px'
            });
          }
          break;

        default:
          break;
      }
    }

    return styles;
  }

  masterToggle(event: MatCheckboxChange): void {
    if (event.checked) {
      // select all rows
      this.dataSource.data.forEach(row => {
        if (this.keyToCheck) {
          row[this.keyToCheck] = true;
        }
        this.selection.select(row)
      });
    } else {

      this.dataSource.data.forEach(row => {
        if (this.keyToCheck) {
          row[this.keyToCheck] = false;
        }
        this.selection.deselect(row)
      });
    }

    // emit the current selection
    this.selectionChange.emit(this.selection.selected);
  }

  // Individual row checkbox: add/remove based on checked state
  toggleRow(event: MatCheckboxChange, row: any): void {
    if (event.checked) {
      this.selection.select(row); // add
    } else {
      this.selection.deselect(row); // remove
    }
    if (this.keyToCheck) {
      row[this.keyToCheck] = event.checked;
    }

    this.selectionChange.emit(this.selection.selected);
  }

  // Helpers
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows && numRows > 0;
  }

  isSomeSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  onToggleChange(element: any, key: string, newValue: boolean) {
    element[key] = newValue;
  }



}