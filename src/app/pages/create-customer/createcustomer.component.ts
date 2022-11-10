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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
      private toastrService: ToastrService,
      private router: Router
      // private datePipe: DatePipe,
      ) {
      // const dateFormat = 'yyyy-MM-dd';
      // this.birthDate = new Date();
      // this.birthDate = datePipe.transform(
      //    new Date().setDate(new Date().getDate() - 1),
      //    dateFormat
      // );
      this.store.select((s) => s.customerType.customerType).subscribe(res => this.selected = res ? res : 'individual');
      this.corporateCustomerInfoModel$ = this.store.select((s) => s.corporateCustomer.corporateCustomerInfo);
      this.individualCustomerInfoModel$ = this.store.select((s) => s.individualCustomer.individualCustomerInfo);
   }

   ngOnInit(): void {
      this.setIsCorporate();
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
      this.selected = event;
      this.setIsCorporate();
      this.store.dispatch(setCustomerType({ customerType: event }));
   }
   
   setIsCorporate(){
      this.isCorporate = this.selected == 'corporate';
   }

   createCorporateCustomerForm() {
      this.corporateCustomerForm = this.formBuilder.group({
         companyName: [this.corporateCustomerInfo?.companyName ?? '', Validators.required],
         taxNumber: [this.corporateCustomerInfo?.taxNumber ?? '', Validators.required]
      });
   }

   createIndividualCustomerForm() {
      this.individualCustomerForm = this.formBuilder.group({
         firstName: [this.individualCustomerInfo?.firstName ?? '', Validators.required],
         lastName: [this.individualCustomerInfo?.lastName ?? '', Validators.required],
         birthDate: [this.individualCustomerInfo?.birthDate ?? '', [Validators.required]],
      });
   }

   saveState() {

      if (this.corporateCustomerForm.invalid && this.individualCustomerForm.invalid) {
         this.toastrService.error("Lütfen gerekli alanları doldurduğunuzdan emin olun!"); 
      }       

      else if (this.selected == 'corporate') {       
         this.store.dispatch(
            setCorporateCustomerInfoModel({ corporateCustomerInfoModel: this.corporateCustomerForm.value })
            );
         this.router.navigateByUrl('/selected-catalogs')
         }
      
      else {
         this.store.dispatch(
            setIndividualCustomerInfoModel({ individualCustomerInfoModel: this.individualCustomerForm.value })
         );
         this.router.navigateByUrl('/selected-catalogs')
      }
   }
} 