import { Pipe, PipeTransform } from '@angular/core';

const ITEMS_PER_PAGE = 6;

@Pipe({
  name: 'paginate',
  standalone: true,
})
export class PaginatePipe implements PipeTransform {
  transform<T>(list: T[]): T[][] {
    if (!list || !Array.isArray(list)) {
      return [];
    }
    return list.reduce((acc: T[][], value: T, i: number) => {
      acc[Math.floor(i / ITEMS_PER_PAGE)] = acc[Math.floor(i / ITEMS_PER_PAGE)] || [];
      acc[Math.floor(i / ITEMS_PER_PAGE)].push(value);
      return acc;
    }, []);
  }
}
