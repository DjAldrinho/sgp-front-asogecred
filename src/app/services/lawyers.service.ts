import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lawyer} from '../models/lawyer.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {LawyerInterface} from '../interfaces/lawyer.interface';
import {UserService} from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LawyersService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  // tslint:disable-next-line:variable-name
  getLawyers(page?: number, per_page?: number): Observable<{ lawyers: Lawyer[], total: number }> {
    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    const url = `${base_url}/lawyers/all?page=${page}&per_page=${per_page}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const lawyers: Lawyer[] = resp.lawyers.data;
          const total: number = resp.lawyers.total;
          return {lawyers, total};
        })
      );
  }

  createLawyer(lawyer: LawyerInterface, file?: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.token}`,
      'Content-Type': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    formData.append('name', lawyer.name);
    formData.append('email', lawyer.email);
    formData.append('phone', lawyer.phone);
    formData.append('document_type', lawyer.document_type);
    formData.append('document_number', lawyer.document_number);
    formData.append('professional_card', file, file.name);
    return this.http.post(`${base_url}/lawyers/create`, formData, {headers});
  }

  updateLawyer(lawyer: LawyerInterface, id: number, file?: File): Observable<any> {
    const body = {
      name: lawyer.name,
      phone: lawyer.phone,
      email: lawyer.email
    };
    return this.http.patch(`${base_url}/lawyers/update/${id}`, body);
  }

  deleteLawyer(lawyer: Lawyer): Observable<any> {
    const url = `${base_url}/lawyers/delete/${lawyer.id}`;
    return this.http.delete(url);
  }
}
