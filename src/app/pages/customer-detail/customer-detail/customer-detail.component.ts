import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individualCustomers.service';
import { Services } from 'src/app/models/services';
import { Subscriber } from 'rxjs';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  individualCustomers!: IndividualCustomers[];
  subscription: Subscription[] =[];
  customerId !: number ;
  details !: IndividualCustomers;
  
  constructor(
    private router: Router,
    private individualCustomersService: IndividualCustomersService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.individualCustomersService.getIndividualCustomerDetail(params['id'])
      .subscribe(response =>
        {console.log(response);
          console.log('deneme');
           this.details = response[0]
           console.log(this.details);
           
           this.customerId=this.details.customerId;
           this.getSubscriptions();
        }
        )
    });
     
  }

   getSubscriptions() {
     this.subscriptionService.getToSubscriptions(this.customerId).subscribe((res) => {
      this.subscription = res;
      console.log(res);
      console.log(this.customerId);
      console.log('subscribe');
    })
   }
}
