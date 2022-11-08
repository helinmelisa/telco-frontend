import { createAction, props } from '@ngrx/store';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';


export const setCorporateCustomerInfoModel = createAction(
  '[Customer] Set Customer Info',
  props<{ corporateCustomerInfoModel: CorporateCustomerInfoModel }>()
);