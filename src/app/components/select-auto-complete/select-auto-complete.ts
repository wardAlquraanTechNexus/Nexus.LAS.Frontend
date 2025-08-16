import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable, Subscription } from 'rxjs';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'select-auto-complete',
  standalone: false,
  templateUrl: './select-auto-complete.html',
  styleUrl: './select-auto-complete.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class SelectAutoComplete implements OnInit, OnChanges, OnDestroy {
  @Input() fnGet!: (search: string) => Observable<any[]>;
  @Input() withNullOption: boolean = false;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() keyToShow!: any;
  @Input() isRequired = false;
  @Input() label!: string;
  @Input() valueKey!: string;
  @Input() searchText!: string;

  @Output() selectEmitter = new EventEmitter<any>();

  isLoading = false;
  data!: any[];

  private subscription?: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {

  }


  ngOnInit(): void {
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fnGet'] && !changes['fnGet'].firstChange) {
      this.loadData();
    }
  }

  onSelect(event: any) {
    this.searchText = '';
  }

  loadData() {
    this.isLoading = true;

    this.subscription?.unsubscribe();

    this.subscription = this.fnGet(this.searchText || '').subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.cdr.markForCheck();
      }
    })
  }

  selectionChange(event: any) {
    this.selectEmitter.emit(event.value);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
