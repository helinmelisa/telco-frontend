import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customer.service';

@Component({
  selector: 'corporateCustomers',
  templateUrl: './corporate-customers.component.html',
  styleUrls: ['./corporate-customers.component.css']
})
export class CorporateCustomersComponent implements OnInit {

  corporateCustomers!: CorporateCustomers[];
  customerId: any;
  searchText: string = "";

  constructor(
    private corporateCustomersService: CorporateCustomersService,
    private router: Router
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

  showDetails(id: number){
    this.router.navigate(['/corporateCustomers/details',  id])
  }

  goToCreateCustomerPage() {
    this.router.navigateByUrl('/create-customer')
  }

}
