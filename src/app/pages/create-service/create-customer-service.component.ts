import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/models/catolog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThisReceiver } from '@angular/compiler';
import { addService } from 'src/app/store/service-store/service.action';
import { group } from '@angular/animations';

@Component({
   selector: 'app-create-customer-service',
   templateUrl: './create-customer-service.component.html',
   styleUrls: ['./create-customer-service.component.css']
})
export class CreateCustomerServiceComponent implements OnInit {

   catalogs!: Catalog[];
   catalogForm!: FormGroup;
   selectedCatalogs !: Catalog[];


   constructor(
      private store: Store<AppStoreState>,
      private formBuilder: FormBuilder,
      private catalogService: CatalogService,
      private router: Router
   ) { }
   
   ngOnInit(): void {
      this.getCatalogs();
      // this.createCatalogForm();
   }

   createCatalogForm() {
      if(this.catalogs){
         let g = {};
         this.catalogs.forEach((catalog, index) => {
            g = {
               [`selectedCatalogs[${index}]`]: [false],
               ...g
            };
         });
         console.log(g);
         this.catalogForm = this.formBuilder.group(g);
      }
   }

   getCatalogs() {
      this.catalogService.getCatalogs().subscribe({
         next: response => this.catalogs = response,
         error: res => console.log(res),
         complete: () => this.createCatalogForm()
      });
   }

   back() {
      this.router.navigateByUrl('/create-customer');
   }

   next() {
      console.log('save');
      console.log(this.catalogForm.value);
      this.selectedCatalogs = this.catalogs.filter((c, i) => this.catalogForm.value[`selectedCatalogs[${i}]`]);
      console.log(this.selectedCatalogs);
      
   }

}
