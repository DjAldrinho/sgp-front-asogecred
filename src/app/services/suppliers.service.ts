import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupplierForm } from '../interfaces/supplier-form.interface';
import { Supplier } from '../models/supplier.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  getSuppliers(page?: number, per_page?: number, all: boolean = false): Observable<{suppliers: Supplier[], total:number}>{

    let url = "";

    if(all){
      url = `${base_url}/suppliers/all`;
    }else{
      url = `${base_url}/suppliers/all?page=${page}&per_page=${per_page}`;
    }

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10
    }

    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        const suppliers: Supplier[] = resp.suppliers.data;
        const total: number = resp.suppliers.total;
        return {suppliers, total};
      })
    );
  }

  createSupplier(supplier: SupplierForm): Observable<any> {
    return this.http.post(`${base_url}/suppliers/create`, supplier);
  }

  updateSupplier(supplier: SupplierForm, id: number): Observable<any> {
    return this.http.patch(`${base_url}/suppliers/update/${id}`, supplier);
  }

  deleteSupplier(supplier: Supplier): Observable<any> {
    const url = `${base_url}/suppliers/delete/${supplier.id}`;
    return this.http.delete(url);
  }


}
