import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-on-board-main-component',
  templateUrl: './on-board-main-component.html',
  styleUrls: ['./on-board-main-component.scss'],
  standalone: false,
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class OnBoardMainComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getStarted(): void {
    this.completeOnboarding();
  }

  skipOnboarding(): void {
    this.completeOnboarding();
  }

  private completeOnboarding(): void {
    // Mark onboarding as completed
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_date', new Date().toISOString());
    
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}
