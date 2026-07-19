import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, throwError } from 'rxjs';

export const errorIntercptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(HotToastService);
  const currentLang = localStorage.getItem('language')

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
    let errorMessage = 'An unexpected error happen'
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    } else {
      errorMessage = error.error.message || `Error: ${error.message}`;
    }
    toast.error(errorMessage, {
      duration: 1500,
      position: currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    return throwError(() => error);
  })
  );
};
