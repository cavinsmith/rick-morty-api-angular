import { Dimension } from './dimension.model';

describe('Dimension Model', () => {
  let dimension: Dimension;

  beforeEach(() => {
    dimension = {
      name: 'Dimension C-137',
      residents: [
        ['https://rickandmortyapi.com/api/character/1'],
        ['https://rickandmortyapi.com/api/character/2'],
      ],
    };
  });

  it('should create a dimension with required properties', () => {
    expect(dimension.name).toBe('Dimension C-137');
    expect(dimension.residents).toBeDefined();
  });

  it('should have residents as array of string arrays', () => {
    expect(Array.isArray(dimension.residents)).toBe(true);
    expect(Array.isArray(dimension.residents[0])).toBe(true);
    expect(typeof dimension.residents[0][0]).toBe('string');
  });

  it('should accept empty residents array', () => {
    dimension.residents = [];
    expect(dimension.residents.length).toBe(0);
  });

  it('should accept nested empty arrays in residents', () => {
    dimension.residents = [[], []];
    expect(dimension.residents.length).toBe(2);
    expect(dimension.residents[0].length).toBe(0);
  });

  it('should allow string name updates', () => {
    dimension.name = 'Dimension C-132';
    expect(dimension.name).toBe('Dimension C-132');
  });
});
