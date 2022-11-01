<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CategoriesService } from './../../services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  // component içerisinde yer alan properties bizim için state oluyor.
  // ?: null olabilir demek.
  // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
  categories!: Category[];
  language: string = 'en';

  categoryAddForm!: FormGroup;

  categoryIdToDelete: number = 0; // state

  error: string = '';

  //Angular IoC (Inversion of Control) Container kullanır.
  //Dependency Injection (Bağımlılık Enjeksiyonu)
  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  getCategories(): void {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => {
      // Observer Design Pattern
      this.categories = response;
    });

    this.categoriesService.getCategories().subscribe((response) => {
      // Observer Design Pattern
      this.categories = response;
    });
  }

  // changecategoryIdToDelete(event: any) {
  //   this.categoryIdToDelete = event.target.value;
  // }

  add(): void {
    if (this.categoryAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    }
    if (this.error) this.error = '';

    // const {name, description} = this.categoryAddForm.value;
    // // this.categoryAddForm.value
    // const category: Category = {
    //   id: 0,
    //   // name: name,
    //   name,
    //   description,
    // };

    // spread operator ... (ES6)
    const category: Category = {
      ...this.categoryAddForm.value,
    };
    this.categoriesService.add(category).subscribe({
      next: (response) => {
        console.info(`Category(${response.id}) has added.`);
      },
      error: (err) => {
        console.log(err);

        this.error = err.statusText;
      },
      complete: () => {
        if (this.error) this.error = '';
        this.categoryAddForm.reset();
        this.getCategories();
      },
    });
  }

  delete() {
    this.categoriesService.delete(this.categoryIdToDelete).subscribe(() => {
      this.categoryIdToDelete = 0;
      this.getCategories();
    });
  }
}
=======
import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
   FormBuilder,
   FormGroup,
   Validators,
} from '@angular/forms';

import { CategoriesService } from './../../services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
   selector: 'app-listview',
   templateUrl: './listview.component.html',
   styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
   // component içerisinde yer alan properties bizim için state oluyor.
   // ?: null olabilir demek.
   // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
   categories!: Category[];
   language: string = 'en';

   categoryAddForm!: FormGroup;

   categoryIdToDelete: number = 0; // state

   error: string = '';

   categoryIdToUpdate: number = 0; // state
   isEditting: boolean = false;
   operationTitle: string = 'Add';
   formTitle: string = 'Form Add';

   categoryName = '';
   categoryDesc = '';

   //Angular IoC (Inversion of Control) Container kullanır.
   //Dependency Injection (Bağımlılık Enjeksiyonu)
   constructor(
      private categoriesService: CategoriesService,
      private formBuilder: FormBuilder
   ) { }

   ngOnInit(): void {
      this.getCategories();
      this.createCategoryAddForm();
   }

   createCategoryAddForm() {
      this.categoryAddForm = this.formBuilder.group({
         name: ['', Validators.required],
         description: ['', [Validators.required, Validators.minLength(10)]],
      });
   }

   getCategories(): void {
      // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
      this.categoriesService.getCategories().subscribe((response) => {
         // Observer Design Pattern
         this.categories = response;
      });
   }

   // changecategoryIdToDelete(event: any) {
   //   this.categoryIdToDelete = event.target.value;
   // }

   add(): void {
      if (this.categoryAddForm.invalid) {
         this.error = 'Form is invalid';
         return;
      }

      if (this.error) this.error = '';

      // const {name, description} = this.categoryAddForm.value;
      // // this.categoryAddForm.value
      // const category: Category = {
      //   id: 0,
      //   // name: name,
      //   name,
      //   description,
      // };

      // spread operator ... (ES6)
      const category: Category = {
         ...this.categoryAddForm.value,
         id: this.categoryIdToUpdate
      };

      if (this.isEditting) {
         this.categoriesService.update(category).subscribe({
            next: (response) => {
               console.info(response);
            },
            error: (err) => {
               console.log(err);
               this.error = err.statusText;
            },
            complete: () => {
               if (this.error) this.error = '';
               this.categoryAddForm.reset();
               this.getCategories();
            },
         });
         this.isEditting = false;
         this.setFormTitle();
      } else {

         this.categoriesService.add(category).subscribe({
            next: (response) => {
               console.info(`Category(${response.id}) has added.`);
            },
            error: (err) => {
               console.log(err);
               this.error = err.statusText;
            },
            complete: () => {
               if (this.error) this.error = '';
               this.categoryAddForm.reset();
               this.getCategories();
            },
         });
      }
   }

   delete() {
      this.categoriesService.delete(this.categoryIdToDelete).subscribe(() => {
         this.categoryIdToDelete = 0;
         this.getCategories();
      });
   }

   update(id: number) {
      this.isEditting = true;
      this.categoryIdToUpdate = id;
      this.setFormTitle();
      this.categoriesService.getCategories().subscribe({
         next: (response) => {
            const itemToUpdate = response.find(category => category.id === id);
            if (!!itemToUpdate) {
               this.categoryName = itemToUpdate.name;
               this.categoryDesc = itemToUpdate.description;
            }
         },
         error: (err) => {
            console.log(err);
            this.error = err.statusText;
         },
         // complete: () => {
         //    if (this.error) this.error = '';
         //    this.categoryAddForm.reset();
         //    this.getCategories();
         // },
      });
   }

   setFormTitle() {
      this.operationTitle = this.isEditting ? 'Update' : 'Add';
      this.formTitle = this.isEditting ? `Form ${this.operationTitle} ${this.categoryIdToUpdate}` : `Form ${this.operationTitle}`;
   }
}
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
