import { ExtractIdPipe } from './extract-id';

describe('ExtractIdPipe', () => {
  let pipe: ExtractIdPipe;

  beforeEach(() => {
    pipe = new ExtractIdPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should extract id from valid URL', () => {
    const url = 'https://rickandmortyapi.com/api/character/1';
    const result = pipe.transform(url);
    expect(result).toBe(1);
  });

  it('should return 0 for empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe(0);
  });

  it('should return 0 for null/undefined', () => {
    expect(pipe.transform(null as never)).toBe(0);
    expect(pipe.transform(undefined as never)).toBe(0);
  });

  it('should return 0 for URL without numeric id', () => {
    const url = 'https://rickandmortyapi.com/api/character/invalid';
    const result = pipe.transform(url);
    expect(result).toBe(0);
  });

  it('should extract large id numbers', () => {
    const url = 'https://rickandmortyapi.com/api/character/999999';
    const result = pipe.transform(url);
    expect(result).toBe(999999);
  });
});
