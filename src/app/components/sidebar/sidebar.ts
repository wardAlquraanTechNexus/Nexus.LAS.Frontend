import { Component } from '@angular/core';
import { ComponentsModule } from "../components-module";
import { MenuTree } from '../../models/menus/menu-tree';
import { MenuService } from '../../services/menu-service';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false,
})
export class Sidebar {

  defaultItem: MenuTree = {
  name: 'Dashboard',
  menuId: 0,
  path: environment.routes.dashboard,
  iconClass: "home",
  inDashboard : true,
  children: []
};

  menuItems: MenuTree[] = [];
  childrenAccessor = (node: any) => node.children ?? [];

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  constructor(
  ) {


  }
  

  ngOnInit() {
    
    const menuJson = localStorage.getItem("menu");
    if (menuJson) {
      this.menuItems = JSON.parse(menuJson) as MenuTree[];
      this.menuItems = this.filterInDashboard(this.menuItems);
    } else {
      this.menuItems = []; // or null or whatever default you want
    }
    this.menuItems.unshift(this.defaultItem);
  }


  filterInDashboard(items: MenuTree[]): MenuTree[] {
  return items
    .filter(item => item.inDashboard)
    .map(item => ({
      ...item,
      children: this.filterInDashboard(item.children || [])
    }));
}
}
