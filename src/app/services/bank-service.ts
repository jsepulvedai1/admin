import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

let url = '';
// url = 'https://qa.getgoapp.com/api/v1/';
url = JSON.parse(localStorage.getItem('url') || '{}');
let apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
  private token;
  private header;

  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
  }

  getBanks(): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    return this.http.get<any[]>(`${this.apiUrl}bank/`, { headers: this.header }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createBank(bankInfo: any): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    return this.http.post(`${this.apiUrl}bank/`, bankInfo, { headers: this.header }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateBank(bankInfo: any, pk: string): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    return this.http.patch(`${this.apiUrl}bank/${pk}`, bankInfo, { headers: this.header }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteBank(pk: string): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    return this.http.delete(`${this.apiUrl}bank/${pk}`, { headers: this.header }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
