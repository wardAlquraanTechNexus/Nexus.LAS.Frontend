import { Component } from '@angular/core';

@Component({
  selector: 'app-person-documents-group',
  standalone:false,
  templateUrl: './person-documents-group.html',
  styleUrl: './person-documents-group.scss'
})
export class PersonDocumentsGroup {
selectedTab = 0;
}
