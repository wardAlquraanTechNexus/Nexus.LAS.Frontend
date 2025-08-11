import { Component } from '@angular/core';
import { MenuTree } from '../../models/menus/menu-tree';
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
    iconClass: "dashboard",
    inDashboard: true,
    children: []
  };

  menuItems: MenuTree[] = [];
  sidebarOpen = true;
  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  iconClass = "sidebar-toggle-btn-opened";

  constructor() {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.iconClass = this.sidebarOpen
      ? "sidebar-toggle-btn-opened"
      : "sidebar-toggle-btn";
  }

  ngOnInit() {
    const menuJson = localStorage.getItem("menu");
    if (menuJson) {
      this.menuItems = JSON.parse(menuJson) as MenuTree[];
      this.menuItems = this.filterInDashboard(this.menuItems);

      // Build full paths for all menu items
      this.buildFullPaths(this.menuItems);
    } else {
      this.menuItems = [];
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

  private buildFullPaths(items: MenuTree[], parentPath: string = ''): void {
    for (let item of items) {
      // Combine parent path + current path
      if (item.path) {
        // Ensure no double slashes
        item.path = `${parentPath}/${item.path}`.replace(/\/+/g, '/');
      } else {
        // If no path, inherit parent path
        item.path = parentPath;
      }

      if (item.children && item.children.length > 0) {
        this.buildFullPaths(item.children, item.path);
      }
    }
  }
}
