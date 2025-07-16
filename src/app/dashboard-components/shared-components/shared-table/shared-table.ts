import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const All_ARTICLES: any[] = [
  { id: 1, title: 'Angular 2 Tutorial', category: 'Angular', writer: 'Krishna' },
  { id: 2, title: 'Angular 6 Tutorial', category: 'Angular', writer: 'Mahesh' },
  { id: 3, title: 'Spring MVC tutorial', category: 'Spring', writer: 'Aman' },
  { id: 4, title: 'Spring Boot tutorial', category: 'Spring', writer: 'Suraj' },
  { id: 5, title: 'FreeMarker Tutorial', category: 'FreeMarker', writer: 'Krishna' },
  { id: 6, title: 'Thymeleaf Tutorial', category: 'Thymeleaf', writer: 'Mahesh' },
  { id: 7, title: 'Java 8 Tutorial', category: 'Java', writer: 'Aman' },
  { id: 8, title: 'Java 9 Tutorial', category: 'Java', writer: 'Suraj' }
];
@Component({
  selector: 'app-shared-table',
  standalone: false, 
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss'
})
export class SharedTable implements AfterViewInit {
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;


  displayedColumns: string[] = ['id', 'title', 'category', 'writer'];
  dataSource = new MatTableDataSource(All_ARTICLES);
  totalRecords = 0;
  totalPages = 0;

  constructor() {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.totalRecords = All_ARTICLES.length;
    this.totalPages = this.totalRecords / this.dataSource.paginator.pageSize
  }


  onPageChange(event: PageEvent): void {
  const pageIndex = event.pageIndex;
  const pageSize = event.pageSize;

  console.log('Page changed:', pageIndex);
  console.log('Page size changed:', pageSize);
}
}