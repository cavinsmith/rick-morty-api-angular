import { ExtractIdsPipe } from './extract-ids';

describe('ExtractIdsPipe', () => {
  let pipe: ExtractIdsPipe;

  beforeEach(() => {
    pipe = new ExtractIdsPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should extract ids from array of valid URLs', () => {
    const urls = [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2',
      'https://rickandmortyapi.com/api/character/3',
    ];
    const result = pipe.transform(urls);
    expect(result).toEqual([1, 2, 3]);
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
  });

  it('should handle mix of valid and invalid URLs', () => {
    const urls = [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/invalid',
      'https://rickandmortyapi.com/api/character/3',
    ];
    const result = pipe.transform(urls);
    expect(result).toEqual([1, 0, 3]);
  });

  it('should handle URLs with trailing slashes', () => {
    const urls = [
      'https://rickandmortyapi.com/api/character/10/',
      'https://rickandmortyapi.com/api/character/20/',
    ];
    const result = pipe.transform(urls);
    expect(result).toEqual([0, 0]); // URLs with trailing slashes followed by nothing result in 0
  });

  it('should extract large id numbers', () => {
    const urls = [
      'https://rickandmortyapi.com/api/character/999999',
      'https://rickandmortyapi.com/api/character/888888',
    ];
    const result = pipe.transform(urls);
    expect(result).toEqual([999999, 888888]);
  });

  it('should handle empty strings in array', () => {
    const urls = ['', 'https://rickandmortyapi.com/api/character/5', ''];
    const result = pipe.transform(urls);
    expect(result).toEqual([0, 5, 0]);
  });
});
