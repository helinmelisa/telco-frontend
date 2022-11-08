import { AuthStoreState } from './auth/auth.state';
import { CorporateCustomerState } from './customerToRegister/customer.state';
import { ServiceState } from './service-store/service.state';

export interface AppStoreState {
  auth: AuthStoreState;
  corporateCustomer: CorporateCustomerState;
  //service: ServiceState;
  // customerToRegister: CustomerToRegister;
}
