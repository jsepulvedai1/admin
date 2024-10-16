import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

let url = '';
// url = 'https://qa.getgoapp.com/api/v1/';
url = JSON.parse(localStorage.getItem('url') || '{}');
let apiUrl = url;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
  private token = '';
  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  getGlobalConfigApp(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}config-global/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getGlobalConfig(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}config-global/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getTravelRates(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}travelrates/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateTravelRates(pk: number, body: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.patch<any[]>(`${this.apiUrl}travelrates/${pk}`, body, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getGlobalApp(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}config-app/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  UpdateGlobalConfig(globalInfo: any): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.patch<any[]>(`${this.apiUrl}config-global/1/`, globalInfo, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getColorsConfig(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}vehicle/color/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getColorsConfigDetail(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}vehicle/color/1`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createColorsConfig(color: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.post<any[]>(`${this.apiUrl}vehicle/color/`, color, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getwithdrawalorder(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    return this.http.get<any[]>(`${this.apiUrl}withdrawalorder/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
