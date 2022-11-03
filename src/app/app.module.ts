import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListviewComponent } from './components/listview/listview.component';
import { NgModule } from '@angular/core';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, ListviewComponent, CreateFakeArrayPipe, SplitPipe, LoginComponent, HomeComponent, NavbarComponent, FooterComponent, CardsComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
