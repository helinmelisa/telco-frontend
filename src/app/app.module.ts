<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListviewComponent } from './components/listview/listview.component';
import { NgModule } from '@angular/core';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { SplitPipe } from './pipes/split.pipe';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, ListviewComponent, CreateFakeArrayPipe, SplitPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
=======
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ListviewComponent } from './components/listview/listview.component';
import { ProductlistComponent } from './components/productlist/productlist.component';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, ListviewComponent, ProductlistComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
