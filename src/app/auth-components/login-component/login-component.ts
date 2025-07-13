import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { AuthRequest } from '../../models/auth-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbar } from '../../components/snackbars/error-snackbar/error-snackbar';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute) { }

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
            this.isSaving = false;
            this.router.navigate(['../'], { relativeTo: this.route });

          },
          error: (err) => {
            this.snackBar.openFromComponent(ErrorSnackbar, {
              duration: 4000,
              data: err
            });
            this.isSaving = false
          }
        })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
