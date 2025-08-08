import { Component, ViewChild } from '@angular/core';
import { ComponentsModule } from '../components-module';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth-service';
import { AuthResponse } from '../../models/auth-response';
import { AddPerson } from '../../dashboard-components/person-module/add-person/add-person';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: false
})
export class Navbar {
  searchText = '';
  searchResults: string[] = [];
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

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
  constructor(private router: Router, private dialog: MatDialog, private authService:AuthService) {
    this.user = this.authService.getUser();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("");
    window.location.reload();
  }

  onSearch() {
    // Simulate a search; replace with actual logic
    const allItems = ['Person A', 'Company B', 'Real Estate C', 'Law Firm D'];
    this.searchResults = allItems.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
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

        dialogRef.afterClosed().subscribe(result => {
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
}
