import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './components/guards/login.guard';
import { IndividualCustomersComponent } from './components/customers/individualCustomers/individualCustomers.component';
import { CorporateCustomersComponent } from './components/customers/corporate-customers/corporate-customers.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail/customer-detail.component';
import { CorporateCustomersDetailComponent } from './pages/corporate-customer-detail/corporate-customers-detail/corporate-customers-detail.component';
import { CreateCustomerComponent } from './pages/create-customer/createcustomer.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path:'individualCustomers', component:IndividualCustomersComponent, canActivate: [LoginGuard]},
  {path:'corporateCustomers', component:CorporateCustomersComponent, canActivate: [LoginGuard]},
  {path:'individualCustomers/details/:id', component:CustomerDetailComponent},
  {path:'corporateCustomers/details/:id', component:CorporateCustomersDetailComponent},
  {path:'create-customer', component:CreateCustomerComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
