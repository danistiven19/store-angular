import { createAction, props } from "@ngrx/store";

export const filterActions = {
    applyFilter: createAction('[Filter] Apply Filter', props<{ filterValue: string }>()),
    resetFilter: createAction('[Filter] Reset Filter')
};