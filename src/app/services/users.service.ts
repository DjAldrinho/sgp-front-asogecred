import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserForm } from '../interfaces/user-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page?: number, per_page?: number): Observable<{ users: User[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    const url = `${base_url}/auth/users?page=${page}&per_page=${per_page}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const users: User[] = resp.users.data;
          const total: number = resp.users.total;
          return {users, total};
        })
      );
  }

  createUser(user: UserForm): Observable<any> {
    return this.http.post(`${base_url}/auth/register`, user);
  }

}
