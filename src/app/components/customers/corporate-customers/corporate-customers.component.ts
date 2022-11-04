import { Component, OnInit } from '@angular/core';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customer.service';

@Component({
  selector: 'corporateCustomers',
  templateUrl: './corporate-customers.component.html',
  styleUrls: ['./corporate-customers.component.css']
})
export class CorporateCustomersComponent implements OnInit {

  corporateCustomers!: CorporateCustomers[];

  constructor(
    private corporateCustomersService: CorporateCustomersService
  ) { }

  ngOnInit(): void {
    this.getCorporateCustomers();
  }
 
  getCorporateCustomers(): void {
    this.corporateCustomersService.getCorporateCustomers()
    .subscribe((response: CorporateCustomers[]) => {
      this.corporateCustomers = response;
    } )
  }


}
