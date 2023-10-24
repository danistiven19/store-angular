import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, debounceTime, distinctUntilChanged, first, of, switchMap, timer, map } from "rxjs";
import { ProductService } from "../services/product/product.service";
import { Product } from 'src/app/core/models/products.model';

export class ProductValidator {
    static productNameAsync(productService: ProductService) {
        return (control: FormControl): Observable<ValidationErrors | null> => {
            console.log(productService.users);
            if (!control || !control.value) {
                return of({ required: true });
            }

            if (control.pristine) {
                return of({});
            }

            return timer(500).pipe(
                switchMap(() => productService.getProductByName(control.value)),
                map((product: Product) => {
                    if (product && product.id) {
                        return { duplicated: true };
                    }
                    return of(null);
                })
            )
            // productService.getProductByName(control.value)
            // .pipe(
            //     switchMap((product: Product) => {
            //         if (product && product.id) {
            //             return of({ duplicated: true });
            //         }
            //         return of(null);
            //     }),
            //     first()
            // )
        };
    }
    
}