import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalInfoDTO } from '../../../models/global-models/global-info/global-info-dto';
import { GlobalService } from '../../../services/global-services/global-service';

@Component({
  selector: 'global-cards',
  standalone:false,
  templateUrl: './global-cards-component.html',
  styleUrl: './global-cards-component.scss'
})
export class GlobalCardsComponent implements OnInit {
  
  isFetching = false;
  globalInfo:GlobalInfoDTO[] = [];
  constructor(
    private globalService:GlobalService,
    private cdr:ChangeDetectorRef
  ){

  }
  
  ngOnInit(): void {
    this.isFetching = true;
    this.globalService.globalInfo().subscribe({
      next:(res=>{
        this.globalInfo = res;
        this.isFetching = false;
        this.cdr.markForCheck();
      }),error:(err=>{
        this.isFetching = false;
        this.cdr.markForCheck();
      })
    })
  }

}
