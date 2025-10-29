import { Component, Inject, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuTree } from '../../models/menus/menu-tree';
import { environment } from '../../../environment/environment';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageService } from '../../services/language-service';
import { Direction } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false,
})
export class Sidebar implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private toggleListener: ((event: any) => void) | null = null;
  private collapseListener: ((event: any) => void) | null = null;
  private langSub?: Subscription;
  private routerSub?: Subscription;

  menuItems: MenuTree[] = [];
  originalMenuItems: MenuTree[] = []; // Store original menu items for translation
  sidebarOpen = true;
  expandedNodes = new Set<number>(); // Track expanded menu items
  currentRoute: string = '';
  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  dir: Direction = 'ltr';
  get labels() {
    return Labels[this.currentLang as keyof typeof Labels];
  };

  currentLang: LanguageCode = 'en';


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

      // Listen for collapse all menus event from navbar
      this.collapseListener = (event: any) => {
        this.collapseAllMenus();
      };
      document.addEventListener('collapseSidebar', this.collapseListener);
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

      // Set current route
      this.currentRoute = this.router.url;

      // Subscribe to router events to track current route
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.currentRoute = event.urlAfterRedirects;
          this.autoExpandActiveParent();
        });
    } else {
      this.originalMenuItems = [];
    }

    this.translateMenuItems();

    // Auto-expand parent of active child menu
    this.autoExpandActiveParent();

    // Subscribe to language changes
    this.langSub = this.langService.language$.subscribe(lang => {
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.currentLang = lang;
      this.translateMenuItems();
    });
  }

  private translateMenuItems(): void {
    this.menuItems = this.translateMenuTree([...this.originalMenuItems]);
  }

  private translateMenuTree(items: MenuTree[]): MenuTree[] {
    return items.map(item => ({
      ...item,
      name: this.getTranslatedMenuName(item.name.toLowerCase()),
      children: item.children ? this.translateMenuTree(item.children) : []
    }));
  }

  private getTranslatedMenuName(name: string): string {
    if (!this.labels) return name;

    // Map common menu names to translations (case-insensitive)
    const menuTranslations: { [key: string]: string } = {
      // Common menu items
      'dashboard': this.labels.COMMON?.DASHBOARD || 'Dashboard',
      'companies': this.labels.COMPANY?.COMPANIES || 'Companies',
      'persons': this.labels.PERSON?.PERSONS || 'Persons',
      'settings': this.labels.COMMON?.SETTINGS || 'Settings',
      'users': this.labels.COMMON?.USERS || 'Users',
      'groups': this.labels.SETTINGS.GROUPS || 'Groups',
      'menus': this.labels.SETTINGS?.MENUS || 'Menus',
      // 'reports': this.labels.COMMON?.REPORTS || 'Reports',

      "real estates": this.labels.PROPERTY.REAL_EASTATES || 'Real Estates',
      "all properties": this.labels.PROPERTY.ALL_PROPERTIES || 'ALL Properties',
      "active properties": this.labels.PROPERTY.ACTIVE_PROPERTIES || 'Active Properties',
      "inactive properties": this.labels.PROPERTY.INACTIVE_PROPERTIES || 'Inactive Properties',
      "active public properties": this.labels.PROPERTY.ACTIVE_PUBLIC_PROPERTIES || 'Active Public Properties',
      "active private properties": this.labels.PROPERTY.ACTIVE_PRIVATE_PROPERTIES || 'Active Private Properties',
      // Company submenu
      'all companies': this.labels.COMPANY?.ALL_COMPANIES || 'All Companies',
      'active companies': this.labels.COMPANY?.ACTIVE_COMPANIES || 'Active Companies',
      'active public companies': this.labels.COMPANY?.ACTIVE_PUBLIC_COMPANIES || 'Active Public Companies',
      'active private companies': this.labels.COMPANY?.ACTIVE_PRIVATE_COMPANIES || 'Active Private Companies',

      "law firms": this.labels.LAW_FIRM.LAW_FIRMS || 'Law Firms',
      "all law firms": this.labels.LAW_FIRM.ALL_LAW_FIRMS || 'All Law Firms',
      "active law firms": this.labels.LAW_FIRM.ACTIVE_LAW_FIRMS || 'Active Law Firms',
      "active public law firms": this.labels.LAW_FIRM.ACTIVE_PUBLIC_LAW_FIRMS || 'Active Public Law Firms',
      "active private law firms": this.labels.LAW_FIRM.ACTIVE_PRIVATE_LAW_FIRMS || 'Active Private Law Firms',
      // "inactive law firms": this.labels.LAW_FIRM.INACTIVE_LAW_FIRMS || 'Inactive Law Firms',

      "transactions": this.labels.TRANSACTION.TRANSACTIONS || 'Transactions',
      "all transactions": this.labels.TRANSACTION.ALL_TRANSACTIONS || 'All Transactions',
      "active transactions": this.labels.TRANSACTION.ACTIVE_TRANSACTIONS || 'Active Transactions',
      "active public transactions": this.labels.TRANSACTION.ACTIVE_PUBLIC_TRANSACTIONS || 'Active Public Transactions',
      "active private transactions": this.labels.TRANSACTION.ACTIVE_PRIVATE_TRANSACTIONS || 'Active Private Transactions',
      // "inactive transactions": this.labels.TRANSACTION.INACTIVE_TRANSACTIONS || 'Inactive Transactions',

      "fpcs": this.labels.FPC.FPCS || 'FPCs',
      "all fpcs": this.labels.FPC.ALL_FPCS || 'All FPCs',
      "active fpcs": this.labels.FPC.ACTIVE_FPCS || 'Active FPCs',
      "active public fpcs": this.labels.FPC.ACTIVE_PUBLIC_FPCS || 'Active Public FPCs',
      "active private fpcs": this.labels.FPC.ACTIVE_PRIVATE_FPCS || 'Active Private FPCs',
      // "inactive fpcs": this.labels.FPC.INACTIVE_FPCS || 'Inactive FPCs',

      "doc. tracking": this.labels.DOCUMENT_TRACKING.DOCUMENT_TRACKING || 'Doc. Tracking',
      "all doc. trackings": this.labels.DOCUMENT_TRACKING.DOCUMENT_TRACKINGS || 'All Doc. Trackings',
      // Person submenu
      'all persons': this.labels.PERSON?.ALL_PERSONS || 'All Persons',
      'active persons': this.labels.PERSON?.ACTIVE_PERSONS || 'Active Persons',
      'active public persons': this.labels.PERSON?.ACTIVE_PUBLIC_PERSONS || 'Active Public Persons',
      'active private persons': this.labels.PERSON?.ACTIVE_PRIVATE_PERSONS || 'Active Private Persons',

      "dynamic list": this.labels.SETTINGS.DYNAMIC_LIST || 'Dynamic List',

    };

    // Convert input name to lowercase for case-insensitive lookup
    return menuTranslations[name.toLowerCase()] || name;
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      if (this.toggleListener) {
        document.removeEventListener('toggleSidebar', this.toggleListener);
      }
      if (this.collapseListener) {
        document.removeEventListener('collapseSidebar', this.collapseListener);
      }
    }
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  // Check if a menu item is active
  isMenuActive(menuItem: MenuTree): boolean {
    if (!menuItem.path) return false;

    // Normalize paths for comparison
    const currentPath = this.currentRoute.split('?')[0].toLowerCase();
    const menuPath = menuItem.path.split('?')[0].toLowerCase();

    // Exact match or starts with (for child routes)
    return currentPath === menuPath || currentPath.startsWith(menuPath + '/');
  }

  // Check if parent menu has any active child
  hasActiveChild(menuItem: MenuTree): boolean {
    if (!menuItem.children || menuItem.children.length === 0) return false;
    return menuItem.children.some(child => this.isMenuActive(child));
  }

  // Auto-expand parent menu if child is active
  private autoExpandActiveParent(): void {
    this.menuItems.forEach(parent => {
      if (parent.children && parent.children.length > 0) {
        const hasActiveChild = parent.children.some(child => this.isMenuActive(child));
        if (hasActiveChild && !this.expandedNodes.has(parent.menuId)) {
          this.expandedNodes.add(parent.menuId);
        }
      }
    });
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

  // Toggle expansion of menu items (accordion-style: only one menu expanded at a time)
  toggleNode(node: MenuTree): void {
    if (this.hasChild(0, node)) {
      if (this.expandedNodes.has(node.menuId)) {
        // Collapse if already expanded
        this.expandedNodes.delete(node.menuId);
      } else {
        // Clear all other expanded nodes first (accordion behavior)
        this.expandedNodes.clear();
        // Then expand the clicked node
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
    } else {
      if (!node.path) {
        node.path = "";
      }

      // Collapse all menus when navigating to dashboard (root path)
      if (node.path === '' || node.path === '/' || node.path.toLowerCase().includes('dashboard')) {
        this.collapseAllMenus();
      }

      // Always remove query params by navigating without preserving them
      this.router.navigate([node.path], { queryParams: {} });
    }
  }

  // Collapse all expanded menu items
  collapseAllMenus(): void {
    this.expandedNodes.clear();
  }
}
