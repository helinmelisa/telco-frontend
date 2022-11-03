import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/models/services'

import { ServicesService } from 'src/app/services/service.service';

@Component({
  selector: 'services',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  services!: Services[];
  searchText: string = '';
  error: string = '';


  constructor(
    private serviceService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.serviceService.getServices().subscribe((response: Services[]) => {
      // Observer Design Pattern
      this.services = response;
    });
  }

}
