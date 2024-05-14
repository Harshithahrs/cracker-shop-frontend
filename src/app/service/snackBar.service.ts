import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public open(message: string, action: string = 'Success', duration: number = 4000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
    });
  }

  public handleError(error: HttpErrorResponse | any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.open(errorMessage, 'Error', 5000); // Display error message using MatSnackBar
    return throwError(errorMessage);
  }
}
