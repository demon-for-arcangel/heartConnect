import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = environment.baseUrl;
  private urlGetFile: string = this.baseUrl + environment.getFile;

  constructor(private http: HttpClient) { }

  /* getFileById(fileId: string): Observable<string> {
    const fileUrl = `${this.urlGetFile}/${fileId}`;
    return this.http.get<string>(fileUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener el archivo:', error);
        return of('');
      })
    );
  } */

  getFileById(assetId: string): Observable<{ filePath: string }> {
    return this.http.get<{ filePath: string }>(`${this.urlGetFile}/${assetId}`);
  }
}