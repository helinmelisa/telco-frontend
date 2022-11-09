import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Catalog } from 'src/app/models/catolog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { setSelectedCatalogs } from 'src/app/store/catalog-store/selectedCatalogs.action';

@Component({
   selector: 'app-selected-catalogs',
   templateUrl: './selected-catalogs.component.html',
   styleUrls: ['./selected-catalogs.component.css']
})
export class SelectedCatalogsComponent implements OnInit {

   catalogs!: Catalog[];
   catalogForm!: FormGroup;
   selectedCatalogs!: Catalog[];
   selectedCatalogs$!: Observable<Catalog[] | null>;


   constructor(
      private store: Store<AppStoreState>,
      private formBuilder: FormBuilder,
      private catalogService: CatalogService,
      private router: Router,
      private toastr: ToastrService
   ) { 
      this.selectedCatalogs$ = this.store.select(s => s.selectedCatalogs.selectedCatalogs);
   }
   
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
         this.catalogForm = this.formBuilder.group(g);
      }
   }

   getCatalogs() {
      this.catalogService.getCatalogs().subscribe({
         next: response => this.catalogs = response,
         error: res => this.toastr.error(res),
         // complete: () => this.createCatalogForm()
         complete: () => {
            this.selectedCatalogs$.subscribe((response) => {
               if (response != null) this.selectedCatalogs = response;
               this.createCatalogForm();
            });
         }
      });
   }

   back() {
      this.router.navigateByUrl('/create-customer');
   }

   next() {
      let noneHasSelected = true;
      Object.entries(this.catalogForm.value).forEach(selected => {
         if (selected[1]) noneHasSelected = false;
      });
      if (noneHasSelected) {
         this.toastr.error('Lüften en az bir seçim yapınız');
         return;
      }      
     

      this.selectedCatalogs = this.catalogs.filter((c, i) => this.catalogForm.value[`selectedCatalogs[${i}]`]);
      this.store.dispatch(
         setSelectedCatalogs({ selectedCatalogs: this.selectedCatalogs })
      );
      this.router.navigateByUrl('/new-customer');
   }

}
