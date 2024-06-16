import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = environment.baseUrl;
  private urlGetFile: string = this.baseUrl + environment.getFile;
  private urlUploadFile: string = this.baseUrl + environment.uploadAssets;
  private urlGetAssetsofUser: string = this.baseUrl + environment.getAssetsOfUser;
  private urlUpdatePhotoProfile: string = this.baseUrl + environment.updatePhotoProfile;

  constructor(private http: HttpClient) { }

  getFileById(assetId: string): Observable<{ filePath: string }> {
    return this.http.get<{ filePath: string }>(`${this.urlGetFile}/${assetId}`);
  }

  uploadProfileImage(formData: FormData, userId: number): Observable<any> {
    return this.http.put<any>(`${this.urlUpdatePhotoProfile}/${userId}`, formData);
  }

  uploadFile(file: File, userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const headers = new HttpHeaders({
      'file-name': file.name,
      'user-id': userId
    });

    return this.http.post<any>(this.urlUploadFile, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error al subir el archivo:', error);
        return of(null);
      })
    );
  }

  getUserAssets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlGetAssetsofUser}/${userId}`);
  }

  deleteAsset(assetId: number): Observable<any> {
    return this.http.delete<any>(`${this.urlGetFile}/${assetId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el archivo:', error);
        return of(null);
      })
    );
  }
}
