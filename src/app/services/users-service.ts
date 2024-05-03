import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
export class UserService {
  private apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
  private token = '';
  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  getUsers(): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?type_user=0`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getWomanUsers(): Observable<any> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?is_validated=0&type_user=0`, { headers }).pipe(
      map((response: any) => {
        const womanUser = response.filter((user: { sex: number }) => user.sex == 2);
        return womanUser;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getWomanUsersCanceled(): Observable<any> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?is_validated=3&type_user=0`, { headers }).pipe(
      map((response: any) => {
        const womanUser = response.filter((user: { sex: number }) => user.sex == 2);
        return womanUser;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getDrivers(): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?type_user=1&is_validated=2`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUserDetail(pk: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.get<any[]>(` ${this.apiUrl}users/${pk}`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUsersToApprove() {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.get<any[]>(` ${this.apiUrl}users/?is_validated=1&type_user=1`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUsersToApproveCancel() {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.get<any[]>(` ${this.apiUrl}users/?is_validated=3&type_user=1`, { headers }).pipe(
      map((response: any) => {
        console.log('fff', response);
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUsersRecord(pk: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.get<any[]>(` ${this.apiUrl}user-record/${pk}`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createUser(userData: any) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.post<any[]>(` ${this.apiUrl}register/`, userData, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUserProfile(userPk: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.get<any[]>(` ${this.apiUrl}profile-info/users/${userPk}`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  approveUserWoman(pk: string, userData: any) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_woman_validated: 1, is_validated: 2 }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  rejectUserWoman(pk: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_woman_validated: 2, is_validated: 3 }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  approveUser(pk: string, userData: any) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_validated: 2 }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  rejectUser(pk: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_validated: 3 }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  rejecDocument(pk: string, userData: any) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}user-record/update/${pk}`, userData, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  private encodeFormData(data: any): string {
    const params = new HttpParams({ fromObject: data });
    return params.toString();
  }

  async createBulkUser(count: number, mode: string, code: string) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`
      });
      let refCode = code;
      for (let i = 0; i < count; i++) {
        const userData = this.generateRandomUserData(refCode);
        const resultResponse = await this.http.post<any>(`${this.apiUrl}register/`, userData, { headers }).toPromise();
        if (mode === '2') {
          const res = await this.getUserDetail(resultResponse.pk).toPromise();
          refCode = res.ref_code;
        }
      }
    } catch (error) {
      console.error('Error creating bulk users:', error);
      // Puedes realizar acciones específicas en caso de error si es necesario
    }
  }

  async getUserDetail2(pk: string) {
    try {
      apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`
      });

      const response = await this.http.get<any[]>(`${this.apiUrl}users/${pk}`, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  private generateRandomUserData(code: string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const dataUserPhone: string = Array.from({ length: 2 }, () => Math.floor(Math.random() * 9) + 1).join('');
    return {
      email: `user_${result}@gmail.com`,
      first_name: `nombre_${result}`,
      last_name: `apellido_${result}`,
      phone: dataUserPhone,
      antecedentes_back: '',
      antecedentes_front: '',
      type_user: '0',
      sex: '0',
      parent_id: code,
      password: '12340'
    };
  }

  createUserTool(count: number) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const userData = { email: `user_${result}+@gmail.com`, first_name: `nombre_${result}`, last_name: `apellido_${result}` };

    this.http.post<any[]>(` ${this.apiUrl}register/`, userData, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
