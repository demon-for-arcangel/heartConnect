import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }
  url = environment.baseUrl+environment.myProfile

  getUserByToken(): Observable<User | undefined>{
    return this.http.get(this.url, {withCredentials: true})
  }

  isLoggedIn(): boolean{
    const user = this.getCurrentUser();
    return user !== null;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getRolesOfToken(): any {
    try {
      let token = JSON.parse(localStorage.getItem('user') as string).token.split('.')[1];
      const rolesOfToken = JSON.parse(atob(token)).roles || [];
      return rolesOfToken;
    } catch (error){
      return null;
    }
  }

  getIdOfToken(): any {
    try {
      let token = JSON.parse(localStorage.getItem('user') as string).token.split('.')[1]
      const idOfToken = JSON.parse(atob(token)).uid;
      return idOfToken;
    } catch (error){
      return null;
    }
  }

  isAdmin(): Observable<boolean> {
    let token = localStorage.getItem('user');
    if (!token) {
       return throwError(() => new Error('No se encontró token'));
    }
   
    try {
       const decodedToken = JSON.parse(atob(token.split('.')[1]));
       const userId = decodedToken.uid;
   
       return this.userService.getUserById(userId).pipe(
         map((user: User | undefined) => {
           if (!user) {
             throw new Error('User not found');
           }

           const isAdmin = user.roles?.some(role => role.name === 'administrador');
           if (isAdmin) {
             console.log('El usuario es administrador');
             return true;
           } else {
             console.log('El usuario no es administrador');
             return false;
           }
         }),
         catchError((error: any) => {
           console.error('Error al obtener los detalles del usuario', error);
           return throwError(() => new Error('Error al obtener los detalles del usuario'));
         }),
       );
    } catch (error: any) {
       console.error('Error al decodificar el token', error);
       return throwError(() => new Error('Error al decodificar el token'));
    }
   }
}