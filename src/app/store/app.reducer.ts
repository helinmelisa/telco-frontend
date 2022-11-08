import { authReducer } from './auth/auth.reducer';
import { corporateCustomerReducer } from './customerToRegister/customer.reducer';
import { individualCustomerReducer } from './individualCustomerStore/individualCustomer.reducer';

export const appReducers = {
  auth: authReducer,
  corporateCustomer: corporateCustomerReducer,
  individualCustomer: individualCustomerReducer
  // customerToRegister: customerToRegisterReducer,
};
