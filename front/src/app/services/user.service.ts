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
  private urlShowUser: string = this.baseUrl + environment.showUser;
  private urlActiveUsers: string = this.baseUrl + environment.activeUsers;
  private urlInactiveUsers: string = this.baseUrl + environment.inactiveUsers;
  private urlDeleteUsers: string = this.baseUrl + environment.deleteUsers;
  private urlActivateUsers: string = this.baseUrl + environment.activateUsers;
  private urlDesactivateUsers: string = this.baseUrl + environment.desactivateUsers;
  private urlCreateUser: string = this.baseUrl + environment.createUser;
  private urlUpdateUser: string = this.baseUrl + environment.updateUser;
  private urlSearchUser: string = this.baseUrl + environment.searchUser;
  private urlSiginGoogle: string = this.baseUrl + environment.googleSignIn;

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

  createNewUser(user: User): Observable<User | undefined> {
    return this.http.post<User>(this.urlCreateUser, user).pipe(
      catchError((error) => {
        console.error('Error al crear un nuevo usuario:', error);
        return of(undefined);
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

  deleteUser(userIds: string[]): Observable<any> {
    return this.http.delete(`${this.urlDeleteUsers}`, {
       body: { userIds: userIds }
    });
  }

  activateUser(userIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlActivateUsers, { userIds: userIds }).pipe(
      catchError((error) => {
        console.error('Error al activar el usuario:', error);
        return of(error);
      })
    );
  }

  desactivateUser(userIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlDesactivateUsers, { userIds: userIds }).pipe(
      catchError((error) => {
        console.error('Error al desactivar el usuario:', error);
        return of(error);
      })
    );
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User | undefined> {
    const updateUrl = `${this.urlUpdateUser}/${userId}`;
    return this.http.put<User>(updateUrl, userData).pipe(
       catchError((error) => {
         console.error('Error al actualizar el usuario:', error);
         return of(undefined);
       })
    );
  }

  searchUsers(term: string): Observable<any[]> {
    const searchUrl = `${this.urlSearchUser}/${term}`;
    return this.http.get<any[]>(searchUrl).pipe(
      catchError((error) => {
        console.error('Error al buscar usuarios:', error);
        return of([]);
      })
    );
  }

  googleLogin(token: string): Observable<any> {
    return this.http.post(`${this.urlSiginGoogle}`, { id_token: token });
  }
}