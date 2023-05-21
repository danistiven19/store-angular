import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, filter, finalize, map, of, switchMap, takeUntil } from 'rxjs';
import { Product } from 'src/core/models/products.model';
import { ProductService } from 'src/core/services/product/product.service';
import { ProductValidator } from 'src/core/validators/productName.validator';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  private emptyProduct: Product = {
    id: '',
    name: '',
    price: 0,
    image: '',
    isBlocked: false
  };
  productForm!: FormGroup;
  isLoading: boolean = false;
  destroy$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadProduct()
    .pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return of(this.emptyProduct);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe((product: Product) => {
      this.initializeForm(product);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initializeForm(product: Product) {
    this.productForm = this.fb.group({
      name: [product.name || this.emptyProduct.name,[Validators.minLength(3)],[ProductValidator.productNameAsync(this.productService)]],
      price: product.price || this.emptyProduct.price,
      image: product.image || this.emptyProduct.image,
      isBlocked: product.isBlocked || this.emptyProduct.isBlocked
    });
  }

  loadProduct(): Observable<Product> {
    
    return this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')?.toString();
        if (!id) {
          return of(this.emptyProduct);
        }

        return this.productService.getProductById(id);
      }
    ));
  }
}
