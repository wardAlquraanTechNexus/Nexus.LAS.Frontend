import { Component } from '@angular/core';
import { ComponentsModule } from '../components-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: false
})
export class Navbar {

  menuItems = [
    {
      name : "العربية",
      value: "arabic"
    },
    {
      name : "English",
      value: "english"
    }
  ]

  selectedMenuItem = this.menuItems[0];

  constructor(private router: Router){

  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("");
    window.location.reload();
  }
}
