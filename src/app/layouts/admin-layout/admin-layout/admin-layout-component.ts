import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { Language } from '../../../components/navbar-components/models/language';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.scss',
  standalone: false
})
export class AdminLayoutComponent implements OnInit {

  dir:Direction = "ltr";

  constructor(private langService:LanguageService){

  }
  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.dir = lang == 'en' ? 'ltr' : 'rtl';
    });
  }

  changeLanguage(lang:Language){
    this.dir = lang.dir;
    this.langService.setLanguage(lang.value);
  }

}
