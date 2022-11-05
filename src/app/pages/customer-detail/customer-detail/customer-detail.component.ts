import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { IndividualCustomersService } from 'src/app/services/individualCustomers.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  individualCustomers!: IndividualCustomers[];
  subscription!: Subscription[];
  id !: number ;
  details !: IndividualCustomers;
  
  constructor(
    private router: Router,
    private individualCustomersService: IndividualCustomersService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.individualCustomersService.getIndividualCustomerDetail(+params['id'])
      .subscribe(response => this.details = response[0])
    });
  }

  getSubscription(id:number){
    this.subscriptionService.getSubscription(id).subscribe(
      (response) => {
      this.subscription = response;
    });
  }
}
