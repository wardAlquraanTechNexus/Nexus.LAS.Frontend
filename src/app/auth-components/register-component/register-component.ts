import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbar } from '../../components/snackbars/error-snackbar/error-snackbar';
import { AuthRequest } from '../../models/auth-request';
import { AuthService } from '../../services/auth-service';
import { RegisterRequest } from '../../models/register-request';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessSnackbar } from '../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.html',
  standalone: false,
  styleUrl: './register-component.scss'
})
export class RegisterComponent implements OnInit {


  isSaving = false;
  registerForm!: FormGroup;
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  onRegister() {
    if (this.registerForm.valid) {

      let registerRequest: RegisterRequest = this.registerForm.getRawValue();
      this.isSaving = true;
      this.authService.register(registerRequest)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: (res) => {
            this.snackBar.openFromComponent(SuccessSnackbar, {
              duration: 4000,
              data: "Registered Successfully"
            });
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => {
            this.isSaving = false;
          }
        })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}