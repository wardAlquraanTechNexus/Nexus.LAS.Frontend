import { Component, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuTree } from '../../models/menus/menu-tree';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false,
})
export class Sidebar implements OnDestroy {
  private isBrowser: boolean;
  private toggleListener: ((event: any) => void) | null = null;

  defaultItem: MenuTree = {
    name: 'Home',
    menuId: 0,
    path: environment.routes.dashboard,
    iconClass: "home",
    inDashboard: true,
    children: []
  };

  menuItems: MenuTree[] = [];
  sidebarOpen = true;
  expandedNodes = new Set<number>(); // Track expanded menu items
  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  iconClass = "sidebar-toggle-btn-opened";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Listen for toggle events from navbar only in browser
    if (this.isBrowser) {
      this.toggleListener = (event: any) => {
        this.sidebarOpen = event.detail;
        this.iconClass = this.sidebarOpen
          ? "sidebar-toggle-btn-opened"
          : "sidebar-toggle-btn";
      };
      document.addEventListener('toggleSidebar', this.toggleListener);
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.iconClass = this.sidebarOpen
      ? "sidebar-toggle-btn-opened"
      : "sidebar-toggle-btn";
  }

  ngOnInit() {
    if (this.isBrowser) {
      const menuJson = localStorage.getItem("menu");
      if (menuJson) {
        this.menuItems = JSON.parse(menuJson) as MenuTree[];
        this.menuItems = this.filterInDashboard(this.menuItems);

        // Build full paths for all menu items
        this.buildFullPaths(this.menuItems);
      } else {
        this.menuItems = [];
      }
    } else {
      this.menuItems = [];
    }

    this.menuItems.unshift(this.defaultItem);
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.toggleListener) {
      document.removeEventListener('toggleSidebar', this.toggleListener);
    }
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

  // Toggle expansion of menu items
  toggleNode(node: MenuTree): void {
    if (this.hasChild(0, node)) {
      if (this.expandedNodes.has(node.menuId)) {
        this.expandedNodes.delete(node.menuId);
      } else {
        this.expandedNodes.add(node.menuId);
      }
    }
  }

  // Check if node is expanded
  isExpanded(node: MenuTree): boolean {
    return this.expandedNodes.has(node.menuId);
  }

  // Handle menu item click
  onMenuItemClick(node: MenuTree, event: Event): void {
    event.stopPropagation();

    if (this.hasChild(0, node)) {
      console.log('Toggling node:', node);
      this.toggleNode(node);
    } else if (node.path) {
      console.log('Navigating to:', node.path);
      // Always remove query params by navigating without preserving them
      this.router.navigate([node.path], { queryParams: {} });
    }
  }
}
