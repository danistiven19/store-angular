import { createReducer, on } from "@ngrx/store";
import { filterActions } from "./actions";

export const initialState = '';

export const filterReducer = createReducer(
    initialState,
    on(filterActions.resetFilter, (state) => `${initialState}`),
    on(filterActions.applyFilter, (state, {filterValue}) => filterValue)
);
