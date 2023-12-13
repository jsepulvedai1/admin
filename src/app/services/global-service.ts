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
}
