import { PaginatePipe } from './paginate';

describe('PaginatePipe', () => {
  let pipe: PaginatePipe;

  beforeEach(() => {
    pipe = new PaginatePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should paginate array with 6 items per page', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const result = pipe.transform(items);

    expect(result).toEqual([[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13]]);
  });

  it('should handle array with exactly 6 items', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const result = pipe.transform(items);

    expect(result).toEqual([[1, 2, 3, 4, 5, 6]]);
  });

  it('should handle array with fewer than 6 items', () => {
    const items = [1, 2, 3];
    const result = pipe.transform(items);

    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle empty array', () => {
    const result = pipe.transform([]);
    expect(result).toEqual([]);
  });

  it('should return empty array for null/undefined', () => {
    expect(pipe.transform(null as never)).toEqual([]);
    expect(pipe.transform(undefined as never)).toEqual([]);
  });

  it('should return empty array for non-array input', () => {
    expect(pipe.transform('not an array' as never)).toEqual([]);
    expect(pipe.transform(123 as never)).toEqual([]);
    expect(pipe.transform({} as never)).toEqual([]);
  });

  it('should handle array with single item', () => {
    const items = ['single item'];
    const result = pipe.transform(items);

    expect(result).toEqual([['single item']]);
  });

  it('should paginate array of objects', () => {
    const items = [
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morty' },
      { id: 3, name: 'Beth' },
      { id: 4, name: 'Jerry' },
      { id: 5, name: 'Summer' },
      { id: 6, name: 'Birdperson' },
      { id: 7, name: 'Squanch' },
    ];
    const result = pipe.transform(items);

    expect(result).toEqual([
      [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
        { id: 3, name: 'Beth' },
        { id: 4, name: 'Jerry' },
        { id: 5, name: 'Summer' },
        { id: 6, name: 'Birdperson' },
      ],
      [{ id: 7, name: 'Squanch' }],
    ]);
  });

  it('should handle exactly 12 items (2 full pages)', () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    const result = pipe.transform(items);

    expect(result).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);
  });
});
