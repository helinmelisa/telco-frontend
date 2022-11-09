import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/models/catolog';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';
import { IndividualCustomerInfoModel } from 'src/app/models/individualCustomerInfoModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
     private router: Router
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
     
     console.log(this.customerType);
     if (this.customerType == 'individual') {
        console.log(this.individualCustomerInfo);
     }else{
        console.log(this.corporateCustomerInfo);
     }
     console.log(this.selectedCatalogs);
  }

   back() {
      this.router.navigateByUrl('/selected-catalogs');
   }
}
