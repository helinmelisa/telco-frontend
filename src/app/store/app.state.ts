import { AuthStoreState } from './auth/auth.state';
import { CorporateCustomerState } from './customerToRegister/customer.state';

export interface AppStoreState {
  auth: AuthStoreState;
  corporateCustomer: CorporateCustomerState;
  // customerToRegister: CustomerToRegister;
}
