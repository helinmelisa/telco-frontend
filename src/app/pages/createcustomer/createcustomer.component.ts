import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CorporateCustomerInfoModel } from 'src/app/models/corporateCustomerInfoModel';
import { AppStoreState } from 'src/app/store/app.state';
import { setCorporateCustomerInfoModel } from 'src/app/store/customerToRegister/customer.actions';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  selected = '';
  isCorporate = false;
  corporateCustomerForm!: FormGroup;
  individualCustomerForm!: FormGroup;
  corporateCustomerInfoModel$!: Observable<CorporateCustomerInfoModel | null>;
  corporateCustomerInfo!: CorporateCustomerInfoModel;
  constructor(
    private store: Store<AppStoreState>,
    private formBuilder: FormBuilder
  ) { 
    this.corporateCustomerInfoModel$ = this.store.select((s) => s.corporateCustomer.corporateCustomerInfo);
  }

  ngOnInit(): void {
    this.corporateCustomerInfoModel$.subscribe((response) => {
      if (response != null) this.corporateCustomerInfo = response;
      this.createCorporateCustomerForm();
    });
    this.createIndividualCustomerForm();
  }

  changeValue(event: any) {
    console.log(event);
    this.isCorporate = this.selected =='corporate'? false:true;
    
  }

  createCorporateCustomerForm() {
    this.corporateCustomerForm = this.formBuilder.group({
      companyName: [this.corporateCustomerInfo?.companyName ?? '', Validators.required],
      taxNumber: [this.corporateCustomerInfo?.taxNumber ?? '', [Validators.required]],
    });
  }

  saveState() {
    // STATE değişecek.. dispatch!!
   // if (!this.corporateCustomerForm.valid) return;

    // dispatch
    this.store.dispatch(
      setCorporateCustomerInfoModel({ corporateCustomerInfoModel: this.corporateCustomerForm.value })
    );
    console.log('value',this.corporateCustomerForm.value);
    console.log('save-state',this.corporateCustomerInfo);
    
    
  }
  
  createIndividualCustomerForm() {
    this.individualCustomerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      birthDate: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
}