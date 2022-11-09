import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/service.service';
import { AppStoreState } from 'src/app/store/app.state';
import { addService } from 'src/app/store/service-store/service.action';

@Component({
  selector: 'app-create-customer-service',
  templateUrl: './create-customer-service.component.html',
  styleUrls: ['./create-customer-service.component.css']
})
export class CreateCustomerServiceComponent implements OnInit {

  services!: Services[];
  serviceForm!: FormGroup;
  selectedServices !: Services ;
  

  constructor(
    private store: Store<AppStoreState>,
    private formBuilder:FormBuilder,
    private servicesService: ServicesService,
  ) { 
    this.serviceForm = formBuilder.group({
      selectedServices:  new FormArray([])
     });
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.servicesService.getServices().subscribe(response => this.services = response)
  }

  
}
