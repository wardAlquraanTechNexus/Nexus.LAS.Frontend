import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorSnackbar } from '../components/snackbars/error-snackbar/error-snackbar';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);


    return next(req).pipe(
        catchError((error: any) => {
            let message = '';

            if (error.error?.Title) {
                message = error.error.Title + " ";
            } else if (error.status === 0) {
                message = 'Network error. Please check your connection.';
            } else if (error.status >= 400 && error.status < 500) {
                message = `Request error: ${error.status}`;
            } else if (error.status >= 500) {
                message = `Server error: ${error.status}`;
            }

            if (error.error?.Errors) {
                // Collect all error messages into a single string
                const errors = error.error.Errors;
                const messages: string[] = [];

                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        messages.push(...errors[key]);
                    }
                }

                message += messages.join('\n');  // Or use '<br>' if showing in HTML
            }

            if (error.status == 401) {
                if(message == '')
                    message = 'Unauthorized.';
                router.navigateByUrl('auth');
            }else if(message == '')
                message = 'An unexpected error occurred.';
            

            snackBar.openFromComponent(ErrorSnackbar, {
                duration: 4000,
                data: message,
                panelClass: ['error-snackbar']
            });

            return throwError(() => error);
        })
    );
};
