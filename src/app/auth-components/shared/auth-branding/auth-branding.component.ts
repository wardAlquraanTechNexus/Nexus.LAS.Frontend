import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-branding',
  templateUrl: './auth-branding.component.html',
  styleUrls: ['./auth-branding.component.scss'],
  standalone: false
})
export class AuthBrandingComponent {
  systemName = 'Legal Assistance System';
  systemSubtitle = 'Nexus LAS';
  logoPath = 'assets/images/logo.jpg';
}