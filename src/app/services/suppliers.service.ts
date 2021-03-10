import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {SupplierForm} from '../interfaces/supplier-form.interface';
import {Supplier} from '../models/supplier.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length
  getSuppliers(page?: number, perPage?: number, all: boolean = false, query?: string): Observable<{ suppliers: Supplier[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (perPage == null) {
      perPage = 10;
    }

    let search = '';
    if (query != null) {
      search = `&search=${query}`;
    }

    const url = all
      ? `${base_url}/suppliers/all`
      : `${base_url}/suppliers/all?page=${page}&per_page=${perPage}${search}`;

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
