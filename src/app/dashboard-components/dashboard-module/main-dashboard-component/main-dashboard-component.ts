import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-main-dashboard-component',
  standalone: false,
  templateUrl: './main-dashboard-component.html',
  styleUrl: './main-dashboard-component.scss'
})
export class MainDashboardComponent implements OnInit {
  currentUser: string = '';
  currentDate = new Date();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.currentUser = user?.userName || 'User';
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
