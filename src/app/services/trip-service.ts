import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

let url = '';
// url = 'https://qa.getgoapp.com/api/v1/';
url = JSON.parse(localStorage.getItem('url') || '{}');
let apiUrl = url;

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
  private token = '';
  constructor(public http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  getTrips(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    console.log(this.token);
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    return this.http.get<any[]>(`${this.apiUrl}trip/normal/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getTripDetail(pk: string): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    console.log(this.token);
    return this.http.get<any[]>(`${this.apiUrl}trip/detail/${pk}/`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
