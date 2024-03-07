import { Component } from '@angular/core';
import { filter, from, map, Observable, switchMap, tap, take } from 'rxjs';
import { ProductService } from '../core/services/product/product.service';
import { Product } from 'src/app/core/models/products.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StoreConfirmationModal } from 'src/app/core/shared/confirmationModal/confirmation-modal';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filterActions } from '../core/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products$: Observable<Product[]> = from([]);
  filterValue$: Observable<string>;

  constructor(
    private productService: ProductService,
    private route: Router,
    private dialog: MatDialog,
    private store: Store<{ filter: string }>
    ) {
    this.filterValue$ = store.select('filter');
    // this.filterValue$.pipe(
    //     takeUntilDestroyed(),
    //     filter((filterVal) => !filterVal || filterVal.length >= 3),
    //     switchMap((filterVal) => this.loadData(filterVal))
    //   ).subscribe();
    this.reloadData();
  }

  reloadData(limit?: number) {
    const takeFn = () => limit ? take(limit) : takeUntilDestroyed();
    this.filterValue$.pipe(
      filter((filterVal) => !filterVal || filterVal.length >= 3),
      switchMap((filterVal) => this.loadData(filterVal)),
      takeFn()
    ).subscribe();
  }

  loadData(filterVal: string) {
    console.log(filterVal)
    this.products$ = this.productService.getAllProducts(filterVal)
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
      tap(() => this.reloadData(1))
    )
    .subscribe();
  }

  generate() {
    const confirmationDialog =this.dialog.open(StoreConfirmationModal);
    confirmationDialog.afterClosed()
    .pipe(
      filter((result) => result),
      switchMap(() => this.productService.generateAllProducts()),
      tap(() => this.reloadData(1))
    )
    .subscribe();
  }

  onScrollReached(value: any) {
    console.log(value);

  }
}
