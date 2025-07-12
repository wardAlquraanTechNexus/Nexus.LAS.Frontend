import { Component } from '@angular/core';
import { AdminLayoutRoutingModule } from "../admin-layout-routing-module";
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Navbar } from "../../../components/navbar/navbar";
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-admin-layout',
  imports: [AdminLayoutRoutingModule, Sidebar, Navbar, Footer],
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.scss'
})
export class AdminLayoutComponent {

}
