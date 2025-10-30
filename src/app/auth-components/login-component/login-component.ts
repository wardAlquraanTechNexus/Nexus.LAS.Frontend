import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { AuthRequest } from '../../models/auth-request';
import { ErrorSnackbar } from '../../components/snackbars/error-snackbar/error-snackbar';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  standalone: false,
  styleUrl: './login-component.scss'
})
export class LoginComponent implements OnInit {

  isSaving = false;
  loginForm!: FormGroup;
  showPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      let authRequest: AuthRequest = this.loginForm.getRawValue();
      this.isSaving = true;
      
      this.authService.login(authRequest)
        .pipe(
          finalize(() => {
            this.isSaving = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Login successful:', res);
            
            this.menuService.getMenus().subscribe({
              next: (menu) => {
                console.log('Menus loaded:', menu);
                // Get return URL or go to home
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
              },
              error: (menuError) => {
                console.error('Failed to load menus:', menuError);
                // Even if menu fails, redirect to home
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
              }
            });
          },
          error: (err) => {
            console.error('Login failed:', err);
            // Handle login error (show error message)
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.isSaving = false;
      this.cdr.detectChanges();
    }
  }
}
