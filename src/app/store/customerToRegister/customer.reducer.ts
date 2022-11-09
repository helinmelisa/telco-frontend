import { CorporateCustomerState, initialCorporateCustomerState } from './customer.state';
import { createReducer, on } from '@ngrx/store';

import { setCorporateCustomerInfoModel } from './customer.actions';

export const corporateCustomerReducer = createReducer<CorporateCustomerState>(
   initialCorporateCustomerState,
   on(setCorporateCustomerInfoModel, (currentState, action) => {
      console.log('corparate action', action);
      console.log('corparate current state', currentState);

      return { ...currentState, corporateCustomerInfo: action.corporateCustomerInfoModel };
   })
);