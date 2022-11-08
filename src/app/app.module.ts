import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListviewComponent } from './components/listview/listview.component';
import { NgModule } from '@angular/core';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterServicePipe } from './pipes/filter-service.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CardsComponent } from './components/cards/cards.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { IndividualCustomersComponent } from './components/customers/individualCustomers/individualCustomers.component';
import { CorporateCustomersComponent } from './components/customers/corporate-customers/corporate-customers.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail/customer-detail.component';
import { CorporateCustomersDetailComponent } from './pages/corporate-customer-detail/corporate-customers-detail/corporate-customers-detail.component';
import { OverlayTitleComponent } from './components/overlay-title/overlay-title.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { AppStoreState } from './store/app.state';
import { CreateCustomerComponent } from './pages/createcustomer/createcustomer.component';


@NgModule({
  declarations: 
  [AppComponent, 
    FilterServicePipe, 
    ListviewComponent, 
    CreateFakeArrayPipe, 
    SplitPipe, 
    LoginComponent, 
    HomeComponent, 
    NavbarComponent, 
    FooterComponent, 
    CardsComponent,
    LoginComponent,
    LoadingComponent,
    IndividualCustomersComponent,
    CorporateCustomersComponent,
    CustomerDetailComponent,
    CorporateCustomersDetailComponent,
    OverlayTitleComponent,
    CreateCustomerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers),
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
