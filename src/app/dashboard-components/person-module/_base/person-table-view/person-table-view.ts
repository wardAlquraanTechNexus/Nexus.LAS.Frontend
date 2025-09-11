import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-table-view',
  standalone:false,
  templateUrl: './person-table-view.html',
  styleUrl: './person-table-view.scss'
})
export class PersonTableView implements OnInit {

  personId?:number | null= null;
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
        this.personId = parseInt(params['id']);
      }else{
        this.personId = null;
      }
      this.showLoading = false;
      
    })
    
    
  }

  backToTable(){
    this.personId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }

  

}
