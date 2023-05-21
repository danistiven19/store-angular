import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Product } from 'src/core/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  users = ['test'];

  constructor(
    private http: HttpClient
  ) { }

  readonly PRODUCT_API_URL = `${environment.MAIN_API_URL}products/`;

  getAllProducts() {
    return this.http.get<Product[]>(this.PRODUCT_API_URL);
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.PRODUCT_API_URL + id);
  }

  getProductByName(productName: string) {
    return this.http.get<Product>(`${this.PRODUCT_API_URL}/name/${productName}`);
  }
}
