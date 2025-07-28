import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { AuthRequest } from '../../models/auth-request';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {

      let authRequest: AuthRequest = this.loginForm.getRawValue();
      this.isSaving = true;
      this.authService.login(authRequest)
        .subscribe({
          next: (res) => {
            this.authService.saveSession(res);
            this.menuService.getMenus().subscribe({
              next: (menu => {
                localStorage.setItem("menu", JSON.stringify(menu));
                this.isSaving = false;
                this.cdr.detectChanges();
                this.router.navigate(['../'], { relativeTo: this.route });
              })
            }
            )
          },
          error: (err) => {

            this.isSaving = false
            this.cdr.detectChanges();
          }
        })
    } else {
      this.loginForm.markAllAsTouched();
      this.isSaving = false
      this.cdr.detectChanges();

    }
  }

}
