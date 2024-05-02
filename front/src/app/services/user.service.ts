import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  private urlLogin: string = this.baseUrl + environment.login;
  private urlRegister: string = this.baseUrl + environment.register;
  private urlShowUser: string = this.baseUrl + environment.myProfile;
  private urlActiveUsers: string = this.baseUrl + environment.activeUsers;
  private urlInactiveUsers: string = this.baseUrl + environment.inactiveUsers;

  login(user: User): Observable<User | undefined>{
    return this.http.post<User>(this.urlLogin, user, {withCredentials: false}).pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  register(user: User): Observable<User | undefined> {
    return this.http.post<User>(this.urlRegister, user, {withCredentials: false}).pipe(
      catchError((error) => {
        console.error('Error al registrar el usuario:', error);
        return of(error);
      })
    );
  }

  getUserById(userId: string): Observable<User | undefined> {
    const userUrl = `${this.urlShowUser}/${userId}`;
    return this.http.get<User>(userUrl);
  }

  getActiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlActiveUsers}`);
  }

  getInactiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlInactiveUsers}`);
  }

  deleteUser(userId: number): Observable<any> {
    const deleteUserUrl = `${this.baseUrl}/${userId}`;
    return this.http.delete(`${deleteUserUrl}`);
  }
}