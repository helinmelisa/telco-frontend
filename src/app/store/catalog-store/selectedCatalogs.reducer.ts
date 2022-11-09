import { SelectedCatalogsState, initialSelectedCatalogsState } from "./selectedCatalogs.state";
import { createReducer, on } from "@ngrx/store";

import { setSelectedCatalogs } from "./selectedCatalogs.action";

export const selectedCatalogsReducer = createReducer<SelectedCatalogsState>(
    initialSelectedCatalogsState,
    on(setSelectedCatalogs, (currentState, action) => {
       console.log('selected catalogs action', action);
       console.log('selected catalogs current state', currentState);

       return { ...currentState, selectedCatalogs: action.selectedCatalogs };
    })
  );