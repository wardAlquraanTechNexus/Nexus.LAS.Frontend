import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout-module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AdminLayoutModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nexus.las');
  constructor() {

  }

}
