import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Product } from 'src/core/models/products.model';
import { ProductService } from 'src/core/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product$: Observable<Product | null> = of(null);
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')?.toString();
        if (!id) {
          return of(null);
        }

        return this.productService.getProductById(id);
      })
    );
  }
}
