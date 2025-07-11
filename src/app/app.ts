import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nexus.las');
  constructor(private authService: AuthService) {
    this.login();
  }

  login() {
    this.authService.login({ email: "ward", password: "Ward12" }).subscribe({
       next: (res) => {
        this.authService.saveSession(res);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    })
  }
}
