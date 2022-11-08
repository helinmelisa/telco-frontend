import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';

@Component({
  selector: 'app-create-customer-service',
  templateUrl: './create-customer-service.component.html',
  styleUrls: ['./create-customer-service.component.css']
})
export class CreateCustomerServiceComponent implements OnInit {

  constructor(
    private store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
  }

}
