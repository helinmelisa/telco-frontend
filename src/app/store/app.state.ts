import { AuthStoreState } from './auth/auth.state';
import { CorporateCustomerState } from './customerToRegister/customer.state';
import { IndividualCustomerState } from './individualCustomerStore/individualCustomer.state';
import { ServiceState } from './service-store/service.state';

export interface AppStoreState {
  auth: AuthStoreState;
  corporateCustomer: CorporateCustomerState;
  individualCustomer: IndividualCustomerState
  //service: ServiceState;
  // customerToRegister: CustomerToRegister;
}
