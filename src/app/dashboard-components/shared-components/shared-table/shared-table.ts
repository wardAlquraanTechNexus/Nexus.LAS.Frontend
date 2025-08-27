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

@Component({
  selector: 'app-shared-table',
  standalone: false,
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss'
})
export class SharedTable implements OnInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      // Refresh the table data when collection changes
      if (this.dataSource) {
        this.dataSource.data = this.paginateResult.collection;
        this.cdRef.markForCheck();
      } else {
        this.dataSource = new MatTableDataSource(this.paginateResult.collection);
        this.cdRef.markForCheck();
      }
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
    });



  }

  onPageChange(event: PageEvent): void {
    this.onChangePage.emit({
      page: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  onRowClick(element: any, key: any) {
    let rowClick = { element, key }
    this.rowClick.emit(rowClick);
  }


  lastSortColumn: string | null = null;

  onSortChange(sortState: Sort) {
    this.onSortChangeEvent.emit(sortState);
  }


  getCellStyle(value: any, pipes: string[] | undefined): { [key: string]: string } {
    if (!pipes) return {};

    let styles: { [key: string]: string } = {};

    for (let pipe of pipes) {
      if (!pipe) continue;

      switch (pipe.toLowerCase()) {
        case 'link':
          styles['text-decoration'] = 'underline';
          styles['color'] = '#025EBA';
          styles['cursor'] = 'pointer';
          styles['padding'] = '10px';
          break;

        case 'personstatus':
        case 'companystatus':
        case 'company-license-status':

          let statusBorder = '#9E77ED';
          let statusColor = '#9E77ED';
          if (value === 1) {
            statusBorder = '#22C993';
            statusColor = '#22C993';
          } else if (value === 2) {
            statusBorder = '#423e3ede';
            statusColor = '#423e3ede';
          }
          styles['border'] = `2px solid ${statusBorder}`;
          styles['color'] = statusColor;
          styles['border-radius'] = '20px';
          styles['padding'] = '10px';
          break;


        case 'company-shareholder-status':

        // let shareholderStatusBorder = '#9E77ED';
        // let shareholderStatusColor = '#9E77ED';
        // if (value) {
        //   statusBorder = '#22C993';
        //   statusColor = '#22C993';
        // } else {
        //   statusBorder = '#423e3ede';
        //   statusColor = '#423e3ede';
        // }
        // styles['border'] = `2px solid ${shareholderStatusBorder}`;
        // styles['color'] = shareholderStatusColor;
        // styles['border-radius'] = '20px';
        // styles['padding'] = '10px';
        // break;

        case 'privateperson':
        case 'privatecompany':
          let privateColor = value.toString() === 'true' ? '#025EBA' : '#423e3ede';
          styles['border'] = `2px solid ${privateColor}`;
          styles['color'] = privateColor;
          styles['border-radius'] = '20px';
          styles['padding'] = '10px';
          break;
        case 'person-company-in-charge':
          if (!value || value.toString().toLowerCase() == 'inactive') {
            styles['color'] = 'red';
          } else {
            styles['color'] = '#025EBA';
          }
          break;
        case 'persondocumentprimary':
          if (value.toString() === 'true') {
            styles['border'] = `2px solid #025EBA`;
            styles['color'] = '#025EBA';
            styles['border-radius'] = '20px';
            styles['padding'] = '10px';
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