import { Component, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ComponentsModule } from '../components-module';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth-service';
import { AuthResponse } from '../../models/auth-response';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddPerson } from '../../dashboard-components/person-module/add-person/add-person';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: false
})
export class Navbar implements OnDestroy {
  searchText = '';
  searchResults: string[] = [];
  sidebarOpen = true;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  private destroy$ = new Subject<void>();

  languages = [
    {
      name: "العربية",
      value: "arabic"
    },
    {
      name: "English",
      value: "english"
    }
  ]

  listToCreated = [
    {
      name: "Person",
      value: environment.routes.AddPerson
    },
    {
      name: "Company",
      value: environment.routes.AddCompany
    },
    {
      name: "Real Estate",
      value: environment.routes.AddRealEstate
    },
    {
      name: "Law Firm",
      value: environment.routes.AddLawFirm
    },
    {
      name: "Transaction",
      value: environment.routes.AddTransaction
    },
    {
      name: "Documents Tracking",
      value: environment.routes.AddDocumentTracking
    },
    {
      name: "FPC",
      value: environment.routes.AddFpc
    }
  ]

  selectedLanguage = this.languages[0];

  user:AuthResponse|null;
  
  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = this.authService.getUser();
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
      window.location.reload();
    }
    this.router.navigateByUrl("");
  }

  onSearch() {
    // Simulate a search; replace with actual logic
    const allItems = ['Person A', 'Company B', 'Real Estate C', 'Law Firm D'];
    this.searchResults = allItems.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  toggleSidebar() {
    if (!this.isBrowser) return;
    
    // Check if sidebar exists in current layout
    const sidebarElement = document.querySelector('app-sidebar');
    if (!sidebarElement) {
      return; // Don't toggle if no sidebar present
    }
    
    this.sidebarOpen = !this.sidebarOpen;
    // Emit event or use a service to communicate with sidebar component
    const event = new CustomEvent('toggleSidebar', { detail: this.sidebarOpen });
    document.dispatchEvent(event);
  }

  // Check if sidebar should be shown (for conditional display of toggle button)
  get shouldShowToggle(): boolean {
    if (!this.isBrowser) return false;
    return !!document.querySelector('app-sidebar');
  }

  openAddDialog(item: any): void {
    switch (item.value) {
      case environment.routes.AddPerson:
        const dialogRef = this.dialog.open(AddPerson, {
          width: '600px',
          maxHeight: '90vh',
          disableClose: true,
          autoFocus: false,
          panelClass: 'custom-dialog-container'

        });

        dialogRef.afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            if (result) {
              console.log('Person created with ID:', result);
              // Handle after-close logic
            }
          });
        break;
      default:
        console.log(item.value)
        break;
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
