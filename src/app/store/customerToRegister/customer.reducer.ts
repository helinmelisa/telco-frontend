import { createReducer, on } from '@ngrx/store';
import { setCorporateCustomerInfoModel } from './customer.actions';
import { CorporateCustomerState, initialCorporateCustomerState } from './customer.state';

export const corporateCustomerReducer = createReducer<CorporateCustomerState>(
  initialCorporateCustomerState,
  on(setCorporateCustomerInfoModel, (currentState, action) => {
    console.log('action',action);
    console.log('state',currentState);
    

    return { ...currentState, corporateCustomerInfo: action.corporateCustomerInfoModel };
  })
);