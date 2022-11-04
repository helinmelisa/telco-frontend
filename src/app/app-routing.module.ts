import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './components/guards/login.guard';
import { ServicesService } from './services/service.service';
import { IndividualCustomersComponent } from './components/customers/individualCustomers/individualCustomers.component';
import { CorporateCustomersComponent } from './components/customers/corporate-customers/corporate-customers.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'services',
        component: CardsComponent
      },
      {
        path: 'individualCustomers',
        component: IndividualCustomersComponent
      },
      {
        path: 'corporateCustomers',
        component: CorporateCustomersComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
