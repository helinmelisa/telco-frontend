import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';
import { DatePipe } from '@angular/common';
import { IndividualCustomerInfoModel } from 'src/app/models/individualCustomerInfoModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCorporateCustomerInfoModel } from 'src/app/store/customerToRegister/customer.actions';
import { setCustomerType } from 'src/app/store/customer-type/customer-type.actions';
import { setIndividualCustomerInfoModel } from 'src/app/store/individualCustomerStore/individualCustomer.action';

@Component({
   selector: 'app-createcustomer',
   templateUrl: './createcustomer.component.html',
   styleUrls: ['./createcustomer.component.css']
})
export class CreateCustomerComponent implements OnInit {
   selected = 'individual';
   isCorporate = false;
   corporateCustomerForm!: FormGroup;
   individualCustomerForm!: FormGroup;
   individualCustomerInfoModel$!: Observable<IndividualCustomerInfoModel | null>;
   corporateCustomerInfoModel$!: Observable<CorporateCustomerInfoModel | null>;
   corporateCustomerInfo!: CorporateCustomerInfoModel;
   individualCustomerInfo!: IndividualCustomerInfoModel;
   birthDate: Date = new Date();
   
   constructor(
      private store: Store<AppStoreState>,
      private formBuilder: FormBuilder,
      // private datePipe: DatePipe,
      ) {
      // const dateFormat = 'yyyy-MM-dd';
      // this.birthDate = new Date();
      // this.birthDate = datePipe.transform(
      //    new Date().setDate(new Date().getDate() - 1),
      //    dateFormat
      // );
      this.corporateCustomerInfoModel$ = this.store.select((s) => s.corporateCustomer.corporateCustomerInfo);
      this.individualCustomerInfoModel$ = this.store.select((s) => s.individualCustomer.individualCustomerInfo);
   }

   ngOnInit(): void {
      this.corporateCustomerInfoModel$.subscribe((response) => {
         if (response != null) this.corporateCustomerInfo = response;
         this.createCorporateCustomerForm();
      });
      this.individualCustomerInfoModel$.subscribe((response) => {
         if (response != null) this.individualCustomerInfo = response;
         this.createIndividualCustomerForm();
      });
      this.store.dispatch(setCustomerType({ customerType: this.selected }));
   }

   changeValue(event: any) {
      this.isCorporate = this.selected == 'corporate' ? false : true;
      this.store.dispatch(setCustomerType({ customerType: event }));
   }

   createCorporateCustomerForm() {
      this.corporateCustomerForm = this.formBuilder.group({
         companyName: [this.corporateCustomerInfo?.companyName ?? '', Validators.required],
         taxNumber: [this.corporateCustomerInfo?.taxNumber ?? '', Validators.required],
      });
   }

   createIndividualCustomerForm() {
      this.individualCustomerForm = this.formBuilder.group({
         firstName: [this.individualCustomerInfo?.firstName ?? '', [Validators.required]],
         lastName: [this.individualCustomerInfo?.lastName ?? '', [Validators.required]],
         birthDate: [this.individualCustomerInfo?.birthDate ?? 'yyyy-MM-dd', [Validators.required]],
      });
   }

   saveState() {

      if (!this.corporateCustomerForm.valid && !this.individualCustomerForm.valid) return;      

      if (this.selected == 'corporate') {       
         this.store.dispatch(
            setCorporateCustomerInfoModel({ corporateCustomerInfoModel: this.corporateCustomerForm.value })
            );
         }
         else {
         this.store.dispatch(
            setIndividualCustomerInfoModel({ individualCustomerInfoModel: this.individualCustomerForm.value })
         );
      }
   }
} 