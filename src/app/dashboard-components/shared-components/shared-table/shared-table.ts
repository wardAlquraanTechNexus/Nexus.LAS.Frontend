import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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


  @Input() displayedColumns: DisplayColumn[] = [];

  @Input() paginateResult!: PaginateRsult<any>;

  @Output() onChangePage = new EventEmitter<BaseParam>;


  dataSource!: MatTableDataSource<any, MatPaginator>
  totalPages = 0;
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  displayedColumnKeys: any;
  constructor(private cdRef: ChangeDetectorRef) {

  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.paginateResult.collection);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.totalPages = this.paginateResult.totalPages;
    this.displayedColumnKeys = this.displayedColumns.map(c => c.key);
    this.pageEvent = {
      pageIndex: this.paginateResult.page - 1, // convert 1-based to 0-based
      pageSize: this.paginateResult.pageSize,
      length: this.paginateResult.totalRecords
    };
    this.cdRef.detectChanges()
    if (this.paginateResult.totalRecords <= this.pageEvent.pageSize) {
    console.warn('Only one page of data is available. Ensure totalRecords is accurate from backend.');
  }
  }

onPageChange(event: PageEvent): void {
  
  this.pageEvent = {
    pageIndex: event.pageIndex,
    pageSize: event.pageSize,
    length : this.paginateResult.totalRecords
  };

  // Emit to parent or fetch data (1-based)
  this.onChangePage.emit({
    page: event.pageIndex + 1, // API expects 1-based
    pageSize: event.pageSize
  });
}

}