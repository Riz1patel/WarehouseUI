import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'constantPipe',
})
export class ConstantPipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
