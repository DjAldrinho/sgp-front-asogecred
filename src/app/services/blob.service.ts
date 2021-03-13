import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  private base_url = environment.base_url;

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    const route = `${this.base_url}${url}`;
    return this.http.get(route, {responseType: 'blob'});
  }

  // @ts-ignore
  getFile(url: string, fileName: string, notBase: boolean = false): Observable<any> {
    const route = notBase ? url : `${this.base_url}${url}`;
    return this.http.get(route, {responseType: 'blob'})
      .pipe(
        map((blob) => {
          this.downloadFile(blob, fileName);
          return true;
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  downloadFile(blob: Blob, fileName): void {
    const route = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = route;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(route);
    a.remove();
  }
}
