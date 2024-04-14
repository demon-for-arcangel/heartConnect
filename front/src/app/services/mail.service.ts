import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }
  private urlSendMail = environment.baseUrl + environment.sendMail;

  sendMail(data: any): Observable<any>{
    return this.http.post(this.urlSendMail, data);
  }
}
