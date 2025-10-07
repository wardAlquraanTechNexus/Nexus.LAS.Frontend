import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fpc-table-view-component',
  standalone: false,
  templateUrl: './fpc-table-view-component.html',
  styleUrls: ['./fpc-table-view-component.scss']
})
export class FpcTableViewComponent  implements OnInit {

  companyId:number = 0;
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
        this.companyId = parseInt(params['id']);
      }else{
        this.companyId = 0;
      }
      this.showLoading = false;
      
    })
    
    
  }

  backToTable(){
    this.companyId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }

  

}

