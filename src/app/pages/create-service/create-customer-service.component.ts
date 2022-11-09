import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/service.service';
import { AppStoreState } from 'src/app/store/app.state';

@Component({
  selector: 'app-create-customer-service',
  templateUrl: './create-customer-service.component.html',
  styleUrls: ['./create-customer-service.component.css']
})
export class CreateCustomerServiceComponent implements OnInit {

  services : Services[] = [];
  servicelist : boolean = false;
  selectedService !: Services ;
  serviceSelection !: Observable<Services[]>
  serviceSave  !: Services[];

  constructor(
    private store: Store<AppStoreState>,
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.servicesService.getServices().subscribe(response => this.services = response)
  }

}
