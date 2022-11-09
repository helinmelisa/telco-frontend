import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompany'
})
export class FilterCompanyPipe implements PipeTransform {
  transform(value: any[], searchText: string): any[] {
    // searchTerm boş ise bunu gönder
    if(!searchText){
      return value;
    }

    return value.filter(p=>{
      const companyName = p.companyName.toLowerCase().includes(searchText);
      return (companyName)
    })
  }
}