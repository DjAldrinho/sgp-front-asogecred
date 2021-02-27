import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DepositProcessForm } from '../interfaces/deposit-process-form.interface';
import { NewProcessForm } from '../interfaces/new-process-form.interface';
import { Process } from '../models/process.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor(private http: HttpClient) { }

  getProcesses(page?: number, per_page?: number, lawyerId?: number): Observable<{ processes: Process[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    let urlLawyer = ""

    if(lawyerId != null){
      urlLawyer = `&lawyer=${lawyerId}`
    }

    const url = `${base_url}/processes/all?page=${page}&per_page=${per_page}${urlLawyer}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const processes: Process[] = resp.processes.data;
          const total: number = resp.processes.total;
          return {processes, total};
        })
      );
  }

  getProcessById(id: number) : Observable<Process> {
    return this.http.get(`${base_url}/processes/info/${id}`)
    .pipe(
      map((resp: any) => {
        const process: Process = resp.process;
        return process;
      }),
    );
  }

  createProcess(process: NewProcessForm): Observable<any> {
    return this.http.post(`${base_url}/processes/create`, process);
  }

  depositProcess(depositProcess: DepositProcessForm): Observable<any> {
    return this.http.post(`${base_url}/processes/deposit`, depositProcess);
  }
}
