import { IndividualCustomerState, initialIndividualCustomerState } from "./individualCustomer.state";
import { createReducer, on } from "@ngrx/store";

import { setIndividualCustomerInfoModel } from "./individualCustomer.action";

export const individualCustomerReducer = createReducer<IndividualCustomerState>(
   initialIndividualCustomerState,
   on(setIndividualCustomerInfoModel, (currentState, action) => {
      return { ...currentState, individualCustomerInfo: action.individualCustomerInfoModel };
   })
);