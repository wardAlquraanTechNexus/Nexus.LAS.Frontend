import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayColumn } from '../../../models/columns/display-column';
import { PaginateRsult } from '../../../models/paginate-result';
import { BaseParam } from '../../../models/base/base-param';
import { SelectionModel } from '@angular/cdk/collections';
import { Person } from '../../../models/persons/person';

@Component({
  selector: 'app-shared-table',
  standalone: false,
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss'
})
export class SharedTable implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() displayedColumns: DisplayColumn[] = [];

  @Input() paginateResult!: PaginateRsult<any>;

  @Output() onChangePage = new EventEmitter<BaseParam>;
  @Output() rowClick = new EventEmitter<any>();
  @Output() onSortChangeEvent = new EventEmitter<Sort>();
  @Output() selectionChange = new EventEmitter<any[]>();

  @Input() action!: TemplateRef<any>;

  selection = new SelectionModel<any>(true, []);


  dataSource!: MatTableDataSource<any, MatPaginator>
  displayedColumnKeys: any;
  constructor(private cdRef: ChangeDetectorRef) {

  }


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.paginateResult.collection);
    this.displayedColumnKeys = this.displayedColumns.map(c => c.key);

    this.cdRef.detectChanges()
  }

  onPageChange(event: PageEvent): void {
    this.onChangePage.emit({
      page: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  onRowClick(element: any, key:any) {  
    let rowClick =  {element  , key }
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
          let privateColor = value.toString() === 'true' ? '#025EBA' : '#423e3ede';
          styles['border'] = `2px solid ${privateColor}`;
          styles['color'] = privateColor;
          styles['border-radius'] = '20px';
          styles['padding'] = '10px';
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSomeSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => {
          this.selection.select(row);
      });
    }
     this.selectionChange.emit(this.selection.selected);
  }

  toggleRow(row: any): void {
    this.selection.toggle(row);
     this.selectionChange.emit(this.selection.selected);
  }


  transform(value: any, pipes?: string[]) {

    if (!pipes) return value;
    for (const pipe of pipes) {
      switch (pipe.toLowerCase()) {
        case 'personstatus':
          switch (value) {
            case 0:
              return 'New';
            case 1:
              return 'Active';
            case 2:
              return 'Inactive';
            default:
              return value;
          }
        case 'privateperson':
          switch (value) {
            case true:
              return 'Private';
            default:
              return 'Public';
          }
        case 'persondocumentprimary':
          switch (value) {
            case true:
              return 'Primary';
            case false:
              return '';
            default:
              return value;
          }
        case 'date-time':
          if (value instanceof Date) {
            return value;
          }

          if (typeof value === 'string' || typeof value === 'number') {
            const date = new Date(value);
            return isNaN(date.getTime()) ?
              null : this.formatDateTime(date);
          }
          return value;
        case 'date':
          if (value instanceof Date) {
            return value;
          }

          if (typeof value === 'string' || typeof value === 'number') {
            const date = new Date(value);
            return isNaN(date.getTime()) ?
              null : this.formatDate(date);
          }
          return value;

        default:
          return value;
      }
    }
  }

  formatDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
  formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} `
  }

 



}