import { Component } from '@angular/core';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts()
    .subscribe((data) => {
console.log(data);

    });
  }
}
