import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'extractIds',
  standalone: true
})
export class ExtractIdsPipe implements PipeTransform {

  transform(urls: string[]): number[] {
    if (!urls || !Array.isArray(urls)) {
      return [];
    }

    return urls.map(url => {
      const segments = url.split('/');
      const lastSegment = segments[segments.length - 1];      
      const id = parseInt(lastSegment, 10);
      return isNaN(id) ? 0 : id;
    });
  }
}
