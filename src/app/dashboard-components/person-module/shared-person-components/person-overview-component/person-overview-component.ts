import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PersonDto } from '../../../../models/person-models/person-dto';

@Component({
  selector: 'app-person-overview-component',
  standalone:false,
  templateUrl: './person-overview-component.html',
  styleUrls: ['./../../../_shared/styles/model-view-style.scss' ]
})
export class PersonOverviewComponent implements OnInit, OnChanges {

  @Input() person!: PersonDto;

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] && changes['person'].currentValue) {
    }
  }

  
}
