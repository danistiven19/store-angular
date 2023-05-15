import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  readonly PRODUCT_API_URL = `${environment.MAIN_API_URL}products`;

  getAllProducts() {
    return this.http.get(this.PRODUCT_API_URL);
  }

}
