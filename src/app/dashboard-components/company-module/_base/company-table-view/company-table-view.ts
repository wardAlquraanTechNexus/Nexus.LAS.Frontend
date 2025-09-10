import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-table-view',
  standalone:false,
  template: '',
  styleUrls: ['./company-table-view.scss' , '../../_base/base-companies-component/base-companies-component.scss'] 
})
export class CompanyTableView implements OnInit {

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

