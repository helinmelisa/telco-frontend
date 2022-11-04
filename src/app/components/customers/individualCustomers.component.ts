import { Component, OnInit } from '@angular/core';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individualCustomers.service';


@Component({
  selector: 'individualCustomers',
  templateUrl: './individualCustomers.component.html',
  styleUrls: ['./individualCustomers.component.css']
})
export class IndividualCustomersComponent implements OnInit {
  
  individualCustomers!: IndividualCustomers[];
  searchText: string = '';
  error: string = '';

  constructor(
    private individualCustomersService: IndividualCustomersService
  ) {}

  ngOnInit(): void {
    this.getIndividualCustomersService();
  }

  getIndividualCustomersService(): void {
    this.individualCustomersService.getIndividualCustomersService()
    .subscribe((response: IndividualCustomers[]) => {
      this.individualCustomers = response;
    } )
  }

}

