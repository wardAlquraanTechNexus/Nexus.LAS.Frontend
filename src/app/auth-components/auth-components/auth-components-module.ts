import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login-component/login-component';
import { RegisterComponent } from '../register-component/register-component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AuthComponentsModule { }
