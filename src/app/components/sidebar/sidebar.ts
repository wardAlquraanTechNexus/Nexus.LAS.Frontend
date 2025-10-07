import { Component, Inject, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuTree } from '../../models/menus/menu-tree';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language-service';
import { Direction } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false,
})
export class Sidebar implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private toggleListener: ((event: any) => void) | null = null;
  private langSub?: Subscription;

  defaultItem: MenuTree = {
    name: 'Home',
    menuId: 0,
    path: environment.routes.dashboard,
    iconClass: "home",
    inDashboard: true,
    children: []
  };

  menuItems: MenuTree[] = [];
  originalMenuItems: MenuTree[] = []; // Store original menu items for translation
  sidebarOpen = true;
  expandedNodes = new Set<number>(); // Track expanded menu items
  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  dir: Direction = 'ltr';
  labels: any;

  iconClass = "sidebar-toggle-btn-opened";

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private langService: LanguageService
  ) {
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
        this.originalMenuItems = JSON.parse(menuJson) as MenuTree[];
        this.originalMenuItems = this.filterInDashboard(this.originalMenuItems);

        // Build full paths for all menu items
        this.buildFullPaths(this.originalMenuItems);
      } else {
        this.originalMenuItems = [];
      }
    } else {
      this.originalMenuItems = [];
    }

    // Subscribe to language changes
    this.langSub = this.langService.language$.subscribe(lang => {
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.labels = this.langService.getLabels(lang);
      this.translateMenuItems();
    });
  }

  private translateMenuItems(): void {
    // Create translated copy of menu items
    this.menuItems = this.translateMenuTree([...this.originalMenuItems]);

    // Translate and add the default Home item
    const translatedHome: MenuTree = {
      ...this.defaultItem,
      name: this.getTranslatedMenuName('Home')
    };
    this.menuItems.unshift(translatedHome);
  }

  private translateMenuTree(items: MenuTree[]): MenuTree[] {
    return items.map(item => ({
      ...item,
      name: this.getTranslatedMenuName(item.name),
      children: item.children ? this.translateMenuTree(item.children) : []
    }));
  }

  private getTranslatedMenuName(name: string): string {
    if (!this.labels) return name;

    // Map common menu names to translations
    const menuTranslations: { [key: string]: string } = {
      // Common menu items
      'Home': this.labels.COMMON?.HOME || 'Home',
      'Dashboard': this.labels.COMMON?.DASHBOARD || 'Dashboard',
      'Companies': this.labels.COMPANY?.COMPANIES || 'Companies',
      'Persons': this.labels.PERSON?.PERSONS || 'Persons',
      'Settings': this.labels.COMMON?.SETTINGS || 'Settings',
      'Users': this.labels.COMMON?.USERS || 'Users',
      'Groups': this.labels.COMMON?.GROUPS || 'Groups',
      'Menus': this.labels.COMMON?.MENUS || 'Menus',
      'Reports': this.labels.COMMON?.REPORTS || 'Reports',

      // Company submenu
      'All Companies': this.labels.COMPANY?.ALL_COMPANIES || 'All Companies',
      'Active Companies': this.labels.COMPANY?.ACTIVE_COMPANIES || 'Active Companies',
      'Active Public Companies': this.labels.COMPANY?.ACTIVE_PUBLIC_COMPANIES || 'Active Public Companies',
      'Active Private Companies': this.labels.COMPANY?.ACTIVE_PRIVATE_COMPANIES || 'Active Private Companies',

      // Person submenu
      'All Persons': this.labels.PERSON?.ALL_PERSONS || 'All Persons',
      'Active Persons': this.labels.PERSON?.ACTIVE_PERSONS || 'Active Persons',
      'Active Public Persons': this.labels.PERSON?.ACTIVE_PUBLIC_PERSONS || 'Active Public Persons',
      'Active Private Persons': this.labels.PERSON?.ACTIVE_PRIVATE_PERSONS || 'Active Private Persons',

      // Settings submenu
      'User Management': this.labels.COMMON?.USER_MANAGEMENT || 'User Management',
      'Group Management': this.labels.COMMON?.GROUP_MANAGEMENT || 'Group Management',
      'Menu Management': this.labels.COMMON?.MENU_MANAGEMENT || 'Menu Management',
      'Dynamic Lists': this.labels.COMMON?.DYNAMIC_LISTS || 'Dynamic Lists',
      'User Groups': this.labels.COMMON?.USER_GROUPS || 'User Groups',
      'Group Menus': this.labels.COMMON?.GROUP_MENUS || 'Group Menus'
    };

    return menuTranslations[name] || name;
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.toggleListener) {
      document.removeEventListener('toggleSidebar', this.toggleListener);
    }
    if (this.langSub) {
      this.langSub.unsubscribe();
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
      this.toggleNode(node);
    } else if (node.path) {
      // Always remove query params by navigating without preserving them
      this.router.navigate([node.path], { queryParams: {} });
    }
  }
}
