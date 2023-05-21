import { Component } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from 'src/core/models/products.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products$: Observable<Product[]> = from([]);
  constructor(
    private productService: ProductService,
    private route: Router
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map((data: Product[]) => data)
      );
  }

  trackByProductIdFn = (index: number, product: Product) => {
    return product.id;
  };

  goToDetails(product: Product, e: Event) {
    if (!product || !product.id || product.isBlocked) {
      e.preventDefault();
      return;
    }

    this.route.navigate(['/product', product.id]);
  }
}
