import { authReducer } from './auth/auth.reducer';
import { corporateCustomerReducer } from './customerToRegister/customer.reducer';
import { individualCustomerReducer } from './individualCustomerStore/individualCustomer.reducer';
import { selectedCatalogsReducer } from './catalog-store/selectedCatalogs.reducer';

export const appReducers = {
  auth: authReducer,
  corporateCustomer: corporateCustomerReducer,
  individualCustomer: individualCustomerReducer,
  selectedCatalogs: selectedCatalogsReducer 
  // customerToRegister: customerToRegisterReducer,
};
