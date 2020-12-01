import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verification'
})
export class VerificationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
