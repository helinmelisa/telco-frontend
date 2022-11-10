import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/models/catolog';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';
import { CorporateCustomersService } from 'src/app/services/corporate-customer.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { IndividualCustomerInfoModel } from 'src/app/models/individualCustomerInfoModel';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individualCustomers.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { resetCatalogs } from 'src/app/store/catalog-store/selectedCatalogs.action';
import { resetCorporateCustomer } from 'src/app/store/customerToRegister/customer.actions';
import { resetIndividualCustomer } from 'src/app/store/individualCustomerStore/individualCustomer.action';

@Component({
   selector: 'app-new-customer',
   templateUrl: './new-customer.component.html',
   styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
   customerType$!: Observable<string | null>;
   customerType!: string;
   individualCustomerInfoModel$!: Observable<IndividualCustomerInfoModel | null>;
   individualCustomerInfo!: IndividualCustomerInfoModel;
   corporateCustomerInfoModel$!: Observable<CorporateCustomerInfoModel | null>;
   corporateCustomerInfo!: CorporateCustomerInfoModel;
   selectedCatalogs$!: Observable<Catalog[] | null>;
   selectedCatalogs!: Catalog[];

   constructor(
      private store: Store<AppStoreState>,
      private router: Router,
      private toastr: ToastrService,
      private customerService: CustomerService,
      private individualCustomerService: IndividualCustomersService,
      private corporateCustomerService: CorporateCustomersService,
   ) {
      this.customerType$ = this.store.select(s => s.customerType.customerType);
      this.corporateCustomerInfoModel$ = this.store.select(s => s.corporateCustomer.corporateCustomerInfo);
      this.individualCustomerInfoModel$ = this.store.select(s => s.individualCustomer.individualCustomerInfo);
      this.selectedCatalogs$ = this.store.select(s => s.selectedCatalogs.selectedCatalogs);
   }

   ngOnInit(): void {
      this.customerType$.subscribe(response => this.customerType = response);
      this.corporateCustomerInfoModel$.subscribe(response => this.corporateCustomerInfo = response);
      this.individualCustomerInfoModel$.subscribe(response => this.individualCustomerInfo = response);
      this.selectedCatalogs$.subscribe(response => this.selectedCatalogs = response);
   }

   back() {
      this.router.navigateByUrl('/selected-catalogs');
   }

   save() {
      const newCustomer: Customer = {
         id: Math.floor(100 + Math.random() * 9000000000),
         customerNumber: Math.floor(10000000 + Math.random() * 90000000),
      };

      this.customerService.add(newCustomer).subscribe({
         next: (res) => {
            if (this.customerType == 'individual') {
               const individiual = {
                  id: res.id,
                  customerId: res.id,
                  ...this.individualCustomerInfo,
                  nationalIdentity: Math.floor(10000000000 + Math.random() * 9000000000),
               };

               this.individualCustomerService.add(individiual).subscribe({
                  next: (res) => {
                     // this.addServiceSubscriptionAndInvoice(res);//seçilen servislerin,subscription'ların ve invoice'lerin eklenme işlemlerinin yapıldığı metot...
                  },
                  error: error => {
                     console.log(error);
                     this.toastr.error('İşlem başarısız');
                  },
                  complete: () => {
                     this.toastr.success('İşlem başarılı');
                     this.store.dispatch(resetCatalogs());
                     this.store.dispatch(resetCorporateCustomer());
                     this.store.dispatch(resetIndividualCustomer());
                     this.router.navigateByUrl('/individualCustomers');
                  },
               });
            } else {
               const corporate = {
                  id: res.id,
                  customerId: res.id,
                  ...this.corporateCustomerInfo,
               };
               
               this.corporateCustomerService.add(corporate).subscribe({
                  next: (res) => {
                     // this.addServiceSubscriptionAndInvoice(res);//seçilen servislerin,subscription'ların ve invoice'lerin eklenme işlemlerinin yapıldığı metot...
                  },
                  error: error => {
                     console.log(error);
                     this.toastr.error('İşlem başarısız');
                  },
                  complete: () => {
                     this.toastr.success('İşlem başarılı');
                     this.store.dispatch(resetCatalogs());
                     this.store.dispatch(resetCorporateCustomer());
                     this.store.dispatch(resetIndividualCustomer());
                     this.router.navigateByUrl('/corporateCustomers');
                  },
               });
            }
         }
      });
   }

}