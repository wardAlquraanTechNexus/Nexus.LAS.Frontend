import { Component } from '@angular/core';
import { ComponentsModule } from '../../../components/components-module';
import { Sidebar } from "../../../components/sidebar/sidebar";

@Component({
  selector: 'app-admin-layout',
  imports: [ComponentsModule, Sidebar],
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.scss'
})
export class AdminLayoutComponent {

}
