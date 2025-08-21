import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractId',
  standalone: true,
})
export class ExtractIdPipe implements PipeTransform {
  transform(url: string): number {
    if (!url) {
      return 0;
    }
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    const id = parseInt(lastSegment, 10);
    return isNaN(id) ? 0 : id;
  }
}
