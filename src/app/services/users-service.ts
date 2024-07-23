import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
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

  getUsersTrips(userPk: any): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}trip/normal/?ordering=-date_created&user_customer=${userPk}`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getUsersBulk(): Observable<any[]> {
    const apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    const typeUsers = [2, 3, 4, 5]; // Los diferentes valores de type_user

    const requests = typeUsers.map(typeUser =>
      this.http.get<any[]>(`${apiUrl}users/?type_user=0&is_validated_user=${typeUser}`, { headers }).pipe(
        map((response: any) => response),
        catchError(error => throwError(() => error))
      )
    );

    return forkJoin(requests).pipe(
      map(responses => {
        return responses.flat();
      }),
      catchError(error => throwError(() => error))
    );
  }

  getUsersFilter(email: string, phone: string = ''): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?type_user=0&email=${email}&phone=${phone}`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getDriversFilter(email: string, phone: string = ''): Observable<any[]> {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}users/?type_user=1&is_validated=2&email=${email}&phone=${phone}`, { headers }).pipe(
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

    return this.http.get<any[]>(`${this.apiUrl}users/?is_validated_user=0&type_user=0`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getWomanUsersBulk(): Observable<any[]> {
    const apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    const typeUsers = [0, 1];

    const requests = typeUsers.map(typeUser =>
      this.http.get<any[]>(`${apiUrl}users/?type_user=0&is_validated_user=${typeUser}`, { headers }).pipe(
        map((response: any) => response),
        catchError(error => throwError(() => error))
      )
    );

    return forkJoin(requests).pipe(
      map(responses => {
        return responses.flat();
      }),
      catchError(error => throwError(() => error))
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

  // getUsersToApprove() {
  //   apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${this.token}`
  //   });
  //   console.log(this.token);
  //   return this.http.get<any[]>(` ${this.apiUrl}users/?is_validated=1&type_user=1`, { headers }).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(error => {
  //       return throwError(() => error);
  //     })
  //   );
  // }

  getDriverToApproveBulk(): Observable<any[]> {
    const apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });

    const typeUsers = [1, 3]; // Los diferentes valores de type_user

    const requests = typeUsers.map(typeUser =>
      this.http.get<any[]>(`${apiUrl}users/?type_user=1&is_validated=${typeUser}`, { headers }).pipe(
        map((response: any) => response),
        catchError(error => throwError(() => error))
      )
    );

    return forkJoin(requests).pipe(
      map(responses => {
        return responses.flat();
      }),
      catchError(error => throwError(() => error))
    );
  }

  getUsersToApprove() {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    console.log(this.token);
    return this.http.get<any[]>(` ${this.apiUrl}users/?is_validated=1&type_user=1`, { headers }).pipe(
      map((response: any) => {
        console.log(response);
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
    console.log(this.token);
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
    let is_woman_validated = 0;
    if (userData.sex === 2) {
      is_woman_validated = 1;
    }
    return this.http
      .patch<
        any[]
      >(`${this.apiUrl}users/${pk}`, { is_validated_user: userData.is_validated_user, id_number: userData.id_number, is_woman_validated, first_name: userData.first_name, last_name: userData.last_name }, { headers })
      .pipe(
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
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_woman_validated: 2, is_validated_user: 9 }, { headers }).pipe(
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
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_validated: 2, id_number: userData.id_number }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  approveUserRecord(pk: number) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}user-record/update/${pk}`, { is_active: true }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  UpdateStatusUser(pk: string, status: number) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_validated_user: status }, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  UpdateStatusDriver(pk: string, status: number) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http.patch<any[]>(`${this.apiUrl}users/${pk}`, { is_validated: status }, { headers }).pipe(
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

  rejecDocument(
    pk: string,
    type_vehicle: string,
    accept_trip_type_1: boolean,
    accept_trip_type_2: boolean,
    accept_trip_type_3: boolean,
    accept_trip_type_4: boolean
  ) {
    apiUrl = JSON.parse(localStorage.getItem('url') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.http
      .patch<
        any[]
      >(`${this.apiUrl}user-record/update/${pk}`, { type_vehicle: type_vehicle, accept_trip_type_1, accept_trip_type_2, accept_trip_type_3, accept_trip_type_4 }, { headers })
      .pipe(
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
