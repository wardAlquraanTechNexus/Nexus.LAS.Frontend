import { Component } from '@angular/core';
import { ComponentsModule } from "../components-module";
import { MenuTree } from '../../models/menus/menu-tree';
import { MenuService } from '../../services/menu-service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [ComponentsModule]
})
export class Sidebar {
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
    } else {
      this.menuItems = []; // or null or whatever default you want
    }
  }
}
