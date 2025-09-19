import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../services/dynamic-list-service';
import { DynamicList } from '../../models/dynamic-list/dynamic-list';

@Component({
  selector: 'dl-select-auto-complete',
  standalone: false,
  templateUrl: './dl-select-auto-complete.html',
  styleUrl: './dl-select-auto-complete.scss'
})
export class DlSelectAutoComplete implements OnInit
 {

  fnGet!: (search: string) => Observable<DynamicList[]>;
  @Input() withNullOption: boolean = false;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() isRequired = false;
  @Input() label!: string;
  @Input() searchText!: string;
  @Input() isMultiple: boolean = false;
  @Input() parentId!: number;

  @Output() selectEmitter = new EventEmitter<any>();

  constructor(
    private dlService: DynamicListService,
  ) { 
    
  }
  ngOnInit(): void {
    this.fnGet = (search: string) => this.dlService.GetAllByParentId(this.parentId, search);
  }

  onSelectChange(event: any) {
    this.selectEmitter.emit(event);
  }
}
