import { Component, ViewChild } from '@angular/core';
import { ComponentsModule } from '../components-module';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MatMenuTrigger } from '@angular/material/menu';

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

  constructor(private router: Router) {

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
}
