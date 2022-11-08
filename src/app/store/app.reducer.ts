import { authReducer } from './auth/auth.reducer';
import { corporateCustomerReducer } from './customerToRegister/customer.reducer';

export const appReducers = {
  auth: authReducer,
  corporateCustomer: corporateCustomerReducer,
  // customerToRegister: customerToRegisterReducer,
};
