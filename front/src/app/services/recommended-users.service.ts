import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendedUsersService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  private urlRecommend: string = this.baseUrl + environment.recommend;

  recommendUsers(userId: string): Observable<any[]>{
    const recommend = `${this.urlRecommend}/${userId}`;
    return this.http.get<any[]>(recommend);
  }
}