import { createReducer, on } from "@ngrx/store";
import { setIndividualCustomerInfoModel } from "./individualCustomer.action";
import { IndividualCustomerState, initialIndividualCustomerState } from "./individualCustomer.state";

export const individualCustomerReducer = createReducer<IndividualCustomerState>(
    initialIndividualCustomerState,
    on(setIndividualCustomerInfoModel, (currentState, action) => {
      console.log('action',action);
      console.log('state',currentState);
      
  
      return { ...currentState, individualCustomerInfo: action.individualCustomerInfoModel };
    })
);