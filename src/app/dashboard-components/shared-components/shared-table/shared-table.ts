import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayColumn } from '../../../models/columns/display-column';
import { PaginateRsult } from '../../../models/paginate-result';
import { BaseParam } from '../../../models/base/base-param';

@Component({
  selector: 'app-shared-table',
  standalone: false,
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss'
})
export class SharedTable implements AfterViewInit {
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;

  @Input() sortDir: "asc" | "desc" = "asc";
  @Input() displayedColumns: DisplayColumn[] = [];

  @Input() paginateResult!: PaginateRsult<any>;

  @Output() onChangePage = new EventEmitter<BaseParam>;
  @Output() rowClick = new EventEmitter<any>();
  @Output() onSortChangeEvent = new EventEmitter<Sort>();

  @Input() action!: TemplateRef<any>;


  dataSource!: MatTableDataSource<any, MatPaginator>
  displayedColumnKeys: any;
  constructor(private cdRef: ChangeDetectorRef) {

  }

  
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.paginateResult.collection);
    this.dataSource.sort = this.sort;
    this.displayedColumnKeys = this.displayedColumns.map(c => c.key);
    this.cdRef.detectChanges()
  }

  onPageChange(event: PageEvent): void {
    this.onChangePage.emit({
      page: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  onRowClick(element: any) {
    this.rowClick.emit(element);
  }

  
lastSortColumn: string | null = null;

onSortChange(sortState: Sort) {
    // this.onSortChangeEvent.emit(sortState);
}

  getCellStyle(displayColumn: DisplayColumn, value: any) {
    let borderColor = 'white';
    let color = 'black';

    switch (displayColumn.pipe?.toLowerCase()) {
      case 'personstatus':
        borderColor = '#9E77ED';
        color = '#9E77ED';
        if (value === 1) {
          borderColor = '#22C993';
          color = '#22C993';
        } else if (value === 2) {
          borderColor = '#423e3ede';
          color = '#423e3ede';
        }
        return {
          'border': `2px solid ${borderColor}`,
          'color': color,
          'border-radius': '20px',
          'padding': '10px',

        };

      case 'privateperson':
        borderColor = '#025EBA';
        color = '#025EBA';
        if (value.toString() === 'true') {
          borderColor = '#025EBA';
          color = '#025EBA';
        } else {
          borderColor = '#423e3ede';
          color = '#423e3ede';
        }
        return {
          'border': `2px solid ${borderColor}`,
          'color': color,
          'border-radius': '20px',
          'padding': '10px'

        };

      default:
        return {};
    }
  }





}