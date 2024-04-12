import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
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
      const rolesOfToken = JSON.parse(atob(token)).roles;
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

  isAdmin(): boolean {
    let token = localStorage.getItem('user');
    if (!token){
      return false
    }

    try{
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.roles && decodedToken.roles.includes('admin');
    }catch (error) {
      console.error('Error al decodificar el token', error)
      return false
    }
  }
}
