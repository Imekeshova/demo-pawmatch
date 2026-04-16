import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.base}${url}`).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.base}${url}`, body).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}${url}`, body).pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.base}${url}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Что-то пошло не так 🐾';
    if (error.status === 0) {
      message = 'Сервер недоступен. Проверьте подключение.';
    } else if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.status === 400) {
      message = JSON.stringify(error.error);
    }
    return throwError(() => new Error(message));
  }
}
