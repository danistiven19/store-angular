import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterActions } from '../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  value$: Observable<string>;

  constructor(private store: Store<{ filter: string }>) {
    this.value$ = store.select('filter');
  }

  search(val: string) {
    this.store.dispatch(filterActions.applyFilter({filterValue: val}));
  }

  reset() {
    this.store.dispatch(filterActions.resetFilter());
  }

}
