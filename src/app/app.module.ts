import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ListviewComponent } from './components/listview/listview.component';
import { ProductlistComponent } from './components/productlist/productlist.component';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, ListviewComponent, ProductlistComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
