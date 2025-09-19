import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-table-view',
  standalone: false,
  templateUrl: './property-table-view.html',
  styleUrl: './property-table-view.scss'
})
export class PropertyTableView implements OnInit  {

  propertyId:number = 0;
  showLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.showLoading = true;
    this.route.queryParams.subscribe(params => {
      if(params['id']){
        this.propertyId = parseInt(params['id']);
      }else{
        this.propertyId = 0;
      }
      this.showLoading = false;
      
    })
    
    
  }

  backToTable(){
    this.propertyId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }

}
