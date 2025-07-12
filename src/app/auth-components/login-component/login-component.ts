import { Component, OnInit } from '@angular/core';
import { AuthLayoutModule } from '../../layouts/auth-layout/auth-layout-module';
import { AuthComponentsModule } from '../auth-components/auth-components-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsModule } from "../../components/components-module";
import { AuthService } from '../../services/auth-service';
import { AuthRequest } from '../../models/auth-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbar } from '../../components/snackbars/error-snackbar/error-snackbar';

@Component({
  selector: 'app-login-component',
  imports: [AuthComponentsModule, ComponentsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  showPassword = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {

      let authRequest: AuthRequest = this.loginForm.getRawValue();

      this.authService.login(authRequest).subscribe({
        next: (res) => {
          this.authService.saveSession(res);
        },
        error: (err) => {
          this.snackBar.openFromComponent(ErrorSnackbar, {
            duration: 4000,
              data:err
          });
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
