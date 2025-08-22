import { Location } from './location.model';

describe('Location Model', () => {
  let location: Location;

  beforeEach(() => {
    location = {
      id: 1,
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
    };
  });

  it('should create a location with all required properties', () => {
    expect(location.id).toBe(1);
    expect(location.name).toBe('Earth (C-137)');
    expect(location.type).toBe('Planet');
    expect(location.dimension).toBe('Dimension C-137');
  });

  it('should have residents as string array', () => {
    expect(Array.isArray(location.residents)).toBe(true);
    expect(location.residents.length).toBeGreaterThan(0);
    expect(typeof location.residents[0]).toBe('string');
  });

  it('should accept empty residents array', () => {
    location.residents = [];
    expect(location.residents.length).toBe(0);
  });

  it('should accept valid location types', () => {
    location.type = 'Space station';
    expect(location.type).toBe('Space station');

    location.type = 'Microverse';
    expect(location.type).toBe('Microverse');
  });

  it('should allow dimension updates', () => {
    location.dimension = 'Dimension C-132';
    expect(location.dimension).toBe('Dimension C-132');
  });

  it('should handle numeric id values', () => {
    location.id = 999;
    expect(location.id).toBe(999);
    expect(typeof location.id).toBe('number');
  });
});
