import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'registration'
})
export class RegistrationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
