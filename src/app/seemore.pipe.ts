import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore'
})
export class SeemorePipe implements PipeTransform {

  transform(overview: string, count: number): string {
    return overview.split(" ").splice(0,count).join(" ")
  }

}
