import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from 'src/app/core/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  users = ['test'];

  constructor(
    private http: HttpClient
  ) { }

  readonly PRODUCT_API_URL = `${environment.MAIN_API_URL}products/`;

  getAllProducts(filterVal: string) {
    return this.http.post<Product[]>(this.PRODUCT_API_URL, {name: filterVal});
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.PRODUCT_API_URL + id);
  }

  getProductByName(productName: string) {
    return this.http.get<Product>(`${this.PRODUCT_API_URL}/name/${productName}`);
  }

  deleteAllProducts() {
    return this.http.delete<Product>(`${this.PRODUCT_API_URL}`);
  }

  generateAllProducts() {
    return this.http.post(`${this.PRODUCT_API_URL}/generate`, {autogenerate: true});
  }
}
