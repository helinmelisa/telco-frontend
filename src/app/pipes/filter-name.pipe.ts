import { Pipe, PipeTransform } from '@angular/core';
import { IndividualCustomersComponent } from '../components/customers/individualCustomers/individualCustomers.component';
import { IndividualCustomers } from '../models/individualCustomers';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText: string): any[] {
    // searchTerm boş ise bunu gönder
    if(!searchText){
      return value;
    }

    return value.filter(p=>{
      const name = p.name.toLowerCase().includes(searchText);
      const lastName = p.lastName.toLowerCase().includes(searchText);
      return (name + lastName)
    })
  }
}
