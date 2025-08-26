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
      } else {
        this.dataSource = new MatTableDataSource(this.paginateResult.collection);
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
  transform(
    value: any,
    element: any,
    column: DisplayColumn,
    pipes?: string[]
  ): Observable<string> {
    if (!pipes || pipes.length === 0) {
      return of(value?.toString() ?? '');
    }

    for (const pipe of pipes) {
      switch (pipe.toLowerCase()) {
        case 'personstatus':
        case 'companystatus':
          switch (value) {
            case 0: return of('New');
            case 1: return of('Active');
            case 2: return of('Inactive');
            default: return of(value?.toString() ?? '');
          }

        case 'company-license-status':
          switch (value) {
            case 0: return of('Expired');
            case 1: return of('Active');
            default: return of(value?.toString() ?? '');
          }

        case 'privateperson':
        case 'privatecompany':
          return of(value === true ? 'Private' : 'Public');

        case 'persondocumentprimary':
          return of(value === true ? 'Primary' : '');

        case 'date-time':
          const dateTime = value instanceof Date ? value : new Date(value);
          return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));

        case 'date':
          const date = value instanceof Date ? value : new Date(value);
          return of(isNaN(date.getTime()) ? '' : this.formatDate(date));

        case 'company-activity':
          return this.dlService
            .GetAllByParentId(environment.rootDynamicLists.companyActivity)
            .pipe(
              map(list => list.find(x => x.id === value)?.name || '')
            );

        case 'capital-currency':
          if (column.compareKey) {
            return this.dlService
              .GetAllByParentId(environment.rootDynamicLists.currencies)
              .pipe(
                map(list => value + " " + (list.find(x => x.id === element[column.compareKey!])?.name || ''))
              );
          }

          return of(value?.toString() ?? '');

        case 'register-id':
          // if (element[column.compareKey!] === EntityIDc.Person) {
          //   return this.personService.getById(value).pipe(
          //     map(x => x?.personEnglishName ?? '') // ensure always string
          //   );
          // } else if (element[column.compareKey!] === EntityIDc.Company) {
          //   return this.companyService.getById(value).pipe(
          //     map(x => x?.companyEnglishName ?? '') // ensure always string
          //   );
          // }
          return of(value?.toString() ?? '');

          case 'register-type':
            if(value == EntityIDc.Person){
              return of('Person');
            }else if(value == EntityIDc.Company){
              return of('Company');
            }else{
              return of(value);
            }
        default:
          return of(value?.toString() ?? '');
      }
    }

    return of(value?.toString() ?? '');
  }
  formatDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
  formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} `
  }


  onToggleChange(element: any, key: string, newValue: boolean) {
    element[key] = newValue;
  }



}