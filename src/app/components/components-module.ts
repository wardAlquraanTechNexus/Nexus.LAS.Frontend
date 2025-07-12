import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    Navbar,
    Sidebar,
    Footer,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    Sidebar,
    Navbar,
    Footer,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ComponentsModule { }
