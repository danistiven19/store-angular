import { Component } from '@angular/core';
import { filter, from, map, Observable, switchMap } from 'rxjs';
import { ProductService } from '../core/services/product/product.service';
import { Product } from 'src/app/core/models/products.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StoreConfirmationModal } from 'src/app/core/shared/confirmationModal/confirmation-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products$: Observable<Product[]> = from([]);
  constructor(
    private productService: ProductService,
    private route: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
   this.loadData();
  }

  loadData() {
    this.products$ = this.productService.getAllProducts()
    .pipe(
      map((data: Product[]) => data)
    );

    return this.products$;
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

  deleteAll() {
    const confirmationDialog =this.dialog.open(StoreConfirmationModal);
    confirmationDialog.afterClosed()
    .pipe(
      filter((result) => result),
      switchMap(() => this.productService.deleteAllProducts()),
      switchMap(() => this.loadData())
    )
    .subscribe((result) => console.log(result));
  }

  onScrollReached(value: any) {
    console.log(value);
    
  }
}
