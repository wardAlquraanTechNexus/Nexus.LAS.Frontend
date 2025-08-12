import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'select-auto-complete',
  standalone: false,
  templateUrl: './select-auto-complete.html',
  styleUrl: './select-auto-complete.scss'
})
export class SelectAutoComplete implements OnInit, OnDestroy {
  @Input() fnGet!: (search: string) => Observable<PaginateRsult<any>>;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() keyToShow!: any;
  @Input() isRequired = false;
  @Input() label!: string;

  isLoading = false;
  searchText = '';
  data: PaginateRsult<any> = {
    page: 0,
    pageSize: 25,
    totalPages: 0,
    totalRecords: 0,
    collection: []
  };

  private subscription?: Subscription;

  ngOnInit(): void {
    this.loadData();
  }

  onSelect(event: any) {
    this.searchText = '';
  }

  loadData() {
    this.isLoading = true;

    this.subscription?.unsubscribe();

    this.subscription = this.fnGet(this.searchText).subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
