import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'services',
   templateUrl: './cards.component.html',
   styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

   services!: Services[];
   searchText: string = '';
   error: string = '';
   addForm!: FormGroup;
   addError: string = '';
   editForm!: FormGroup;
   editError: string = '';
   isEditing: boolean = false;
   editId!: number;
   clonedServices: { [s: string]: Services; } = {};
   service2: Services[];

   constructor(
      private serviceService: ServicesService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
   ) { }

   ngOnInit(): void {
      this.getServices();
      this.createForms();
   }

   createForms() {
      this.addForm = this.formBuilder.group({
         name: ['', Validators.required],
      });
      this.editForm = this.formBuilder.group({
         name: ['', Validators.required],
      });
   }

   getServices(): void {
      this.serviceService.getServices().subscribe((response: Services[]) => {
         // Observer Design Pattern
         this.services = response;
      });
   }

   add(): void {
      if (this.addForm.invalid) {
         this.toastr.warning('Lütfen bir servis ismi giriniz');
         this.addError = 'Form is invalid';
         return;
      }
      if (this.addError) this.addError = '';

      const service: Services = {
         ...this.addForm.value,
      };

      this.serviceService.add(service).subscribe({
         next: () => {
            this.toastr.success(`${service.name} has been added.`);
         },
         error: (err) => {
            console.log(err);
            this.addError = err.statusText;
            this.toastr.error(this.addError);
            this.toastr.error(err.statusText);
         },
         complete: () => {
            if (this.addError) this.addError = '';
            this.addForm.reset();
            this.getServices();
         },
      });
   }

   edit(id: number) {
      this.isEditing = true;
      this.editId = id;
      this.editForm.get('name')?.setValue(this.services.find(service => service.id === id)?.name);
   }

   update(): void {
      if (this.editForm.invalid || !this.editId) {
         this.editError = 'Form is invalid';
         return;
      }
      if (this.editError) this.editError = '';

      const service: Services = {
         id: this.editId,
         ...this.editForm.value,
      };

      this.serviceService.update(service).subscribe({
         next: () => {
            this.toastr.success('İşlem başarılı');
         },
         error: (err) => {
            console.log(err);
            this.editError = err.statusText;
            this.toastr.error(this.editError);
            this.toastr.error(err.statusText);
         },
         complete: () => {
            if (this.editError) this.editError = '';
            this.editForm.reset();
            this.getServices();
         },
      });

      this.isEditing = false;
   }

   delete(id: number) {
      this.serviceService.delete(id).subscribe(() => {
         this.getServices();
      });
   }

   onRowEditInit(service: Services) {
      this.clonedServices[service.id] = { ...service };
      console.log('editinit');
      console.log(service);
   }

   onRowEditSave(service: Services) {
      console.log('save');
      console.log(service);

      if (service.name) {
         delete this.clonedServices[service.id];
      }
      else {
      }
   }

   onRowEditCancel(service: Services, index: number) {
      console.log('editcancel');
      console.log(service, index);
      this.service2[index] = this.clonedServices[service.id];
      delete this.clonedServices[service.id];
   }


}

// current

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Services } from 'src/app/models/services';
// import { ServicesService } from 'src/app/services/service.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'services',
//   templateUrl: './cards.component.html',
//   styleUrls: ['./cards.component.css']
// })
// export class CardsComponent implements OnInit {

//   services!: Services[];
//   searchText: string = '';
//   error: string = '';
//   addForm!: FormGroup;
//   addError: string = '';
//   editForm!: FormGroup;
//   editError: string = '';
//   isEditing: boolean = false;
//   editId!: number;


//   constructor(
//     private serviceService: ServicesService,
//     private formBuilder: FormBuilder,
//     private toastr: ToastrService
//   ) { }

//   ngOnInit(): void {
//     this.getServices();
//     this.createForms();
//   }

//   createForms() {
//     this.addForm = this.formBuilder.group({
//        name: ['', Validators.required],
//     });
//     this.editForm = this.formBuilder.group({
//        name: ['', Validators.required],
//     });
//  }

//   getServices(): void {
//     this.serviceService.getServices().subscribe((response: Services[]) => {
//       // Observer Design Pattern
//       this.services = response;
//     });
//   }

//   add(): void {
//     if (this.addForm.invalid) {
//        this.toastr.warning('Lütfen bir servis ismi giriniz');
//        this.addError = 'Form is invalid';
//        return;
//     }
//     if (this.addError) this.addError = '';

//     const service: Services = {
//        ...this.addForm.value,
//     };

//     this.serviceService.add(service).subscribe({
//        next: () => {
//           this.toastr.success(`${service.name} has been added.`);
//        },
//        error: (err) => {
//           console.log(err);
//           this.addError = err.statusText;
//           this.toastr.error(this.addError);
//           this.toastr.error(err.statusText);
//        },
//        complete: () => {
//           if (this.addError) this.addError = '';
//           this.addForm.reset();
//           this.getServices();
//        },
//     });
//  }

//  edit(id: number) {
//   this.isEditing = true;
//   this.editId = id;
//   this.editForm.get('name')?.setValue(this.services.find(service => service.id === id)?.name);
// }


// update(): void {
//   if (this.editForm.invalid || !this.editId) {
//      this.editError = 'Form is invalid';
//      return;
//   }
//   if (this.editError) this.editError = '';

//   const service: Services = {
//      id: this.editId,
//      ...this.editForm.value,
//   };

//   this.serviceService.update(service).subscribe({
//      next: () => {
//         this.toastr.success('İşlem başarılı');
//      },
//      error: (err) => {
//         console.log(err);
//         this.editError = err.statusText;
//         this.toastr.error(this.editError);
//         this.toastr.error(err.statusText);
//      },
//      complete: () => {
//         if (this.editError) this.editError = '';
//         this.editForm.reset();
//         this.getServices();
//      },
//   });

//   this.isEditing = false;
// }

// delete(id: number) {
//   this.serviceService.delete(id).subscribe(() => {
//      this.getServices();
//   });
//  }
// }
