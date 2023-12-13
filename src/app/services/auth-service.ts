import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { Observable } from 'rxjs';

// let url = '';
// // url = 'https://qa.getgoapp.com/api/v1/';
// url = 'https://dev.getgoapp.com/api/v1/';
// let apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = '';
  constructor(
    public http: HttpClient,
    public settingsService: SettingsService
  ) {}

  login(credentials: any) {
    this.apiUrl = JSON.parse(localStorage.getItem('url') || '{}');

    const url = JSON.parse(localStorage.getItem('url') || '{}');
    console.log(url);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(`${this.apiUrl}auth/`, credentials, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  profileUser(token: any) {
    const url = JSON.parse(localStorage.getItem('url') || '{}');
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Token ${token}` });

      this.http.get(`${url}profile/`, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
