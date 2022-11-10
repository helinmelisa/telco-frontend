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
     private corpateCustomerService: CorporateCustomersService,
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

   save(){
      const newCustomer: Customer = {
         customerNumber: Math.floor(10000000 + Math.random() * 90000000),
         id: Math.floor(10000000 + Math.random() * 90000000)
      };
      this.customerService.add(newCustomer).subscribe({  //customer json'a post edildi..
         next: (res) => {
            if (this.customerType == 'individual') {//individiual customer seçilmiş ise...
               const addToIndividual = {
                  id: res.id,
                  customerId: res.id,
                  ...this.individualCustomerInfo,
                  nationalIdentity: Math.floor(10000000000 + Math.random() * 9000000000),
               };
               console.log(addToIndividual);

               this.individualCustomerService.add(addToIndividual).subscribe({//individualCustomer json'a post edildi..
                  next: (res) => {
                    // this.addServiceSubscriptionAndInvoice(res);//seçilen servislerin,subscription'ların ve invoice'lerin eklenme işlemlerinin yapıldığı metot...
                  }
               });
   }
}
})
      // const customer: Customer = {
      //    customerNumber: 1515
      // };
      // this.customerService.add(customer)


      // console.log(this.customerType);


       if (this.customerType == 'individual') {
      
      
         // const customer: IndividualCustomerInfoModel = {
         //    ... this.individualCustomerInfo
         // };
         // this.individualCustomerService.add(customer).subscribe({
         //    next: res => console.log(res),
         //    error: error => {
         //       console.log(error);
         //       this.toastr.error('İşlem başarısız');
         //    },
         //    complete: () => this.toastr.success('İşlem başarılı'),
         // })         
         console.log(this.individualCustomerInfo);
      } else {
         console.log(this.corporateCustomerInfo);
      }
      console.log(this.selectedCatalogs);
   }
}
