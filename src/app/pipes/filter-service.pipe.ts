import { Pipe, PipeTransform } from '@angular/core';
import { Services } from '../models/services';

@Pipe({
  name: 'filterService',
})
export class FilterServicePipe implements PipeTransform {
  transform(value: Services[], name: string): Services[] {
    return value.filter((services) =>
      services.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
}
