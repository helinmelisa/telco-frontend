import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/models/services'

import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'services',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  services!: Services[];


  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.serviceService.getServices().subscribe((response) => {
      // Observer Design Pattern
      this.services = response;
    });
  }

}
