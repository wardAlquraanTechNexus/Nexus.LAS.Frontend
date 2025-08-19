import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar-components';

@Component({
  selector: 'app-navbar-en-component',
  standalone:false,
  templateUrl: './navbar-en-component.html',
  styleUrl: '../navbar-components.scss'
})
export class NavbarEnComponent extends NavbarComponent
{

}
