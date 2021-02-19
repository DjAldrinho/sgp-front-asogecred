import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../models/dashboard.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDataDashboard(): Observable<Dashboard> {
    const url = `${base_url}/dashboard/all`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const dashboard: Dashboard = resp;
          return dashboard;
        })
      );
  }


}
