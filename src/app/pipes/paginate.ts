import { Pipe, PipeTransform } from '@angular/core';

const ITEMS_PER_PAGE = 6;

@Pipe({
  name: 'paginate',
  standalone: true,
})
export class PaginatePipe implements PipeTransform {
  transform(list: any): any[][] {
    if (!list || !Array.isArray(list)) {
      return [];
    }
    return list.reduce((acc: any[][], value: any, i: number) => {
      acc[Math.floor(i / ITEMS_PER_PAGE)] = acc[Math.floor(i / ITEMS_PER_PAGE)] || [];
      acc[Math.floor(i / ITEMS_PER_PAGE)].push(value);
      return acc;
    }, []);
  }
}
