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
        catchError((error: HttpErrorResponse) => {
            let message = 'An unexpected error occurred.';

            if (error.error?.Title) {
                message = error.error.Title;
            } else if (error.status === 0) {
                message = 'Network error. Please check your connection.';
            }else if(error.status == 401){
                message = 'Unauthorization.';
                router.navigateByUrl("auth");
            }
             else if (error.status >= 400 && error.status < 500) {
                message = `Request error: ${error.status}`;
            } else if (error.status >= 500) {
                message = `Server error: ${error.status}`;
            }

            snackBar.openFromComponent(ErrorSnackbar, {
                duration: 4000,
                data: message
            });

            return throwError(() => error);
        })
    );
};
