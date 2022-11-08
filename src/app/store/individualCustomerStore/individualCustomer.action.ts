import { createAction, props } from "@ngrx/store";
import { IndividualCustomerInfoModel } from "src/app/models/individualCustomerInfoModel";

export const setIndividualCustomerInfoModel = createAction(
    '[Customer] Set Customer Info',
    props<{ individualCustomerInfoModel: IndividualCustomerInfoModel }>()
  );