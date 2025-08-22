import { Character } from './character.model';

describe('Character Model', () => {
  let character: Character;

  beforeEach(() => {
    character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
    };
  });

  it('should create a character with all required properties', () => {
    expect(character.id).toBe(1);
    expect(character.name).toBe('Rick Sanchez');
    expect(character.status).toBe('Alive');
    expect(character.species).toBe('Human');
    expect(character.gender).toBe('Male');
  });

  it('should have origin and location objects', () => {
    expect(character.origin).toBeDefined();
    expect(character.origin.name).toBe('Earth (C-137)');
    expect(character.origin.url).toBeDefined();

    expect(character.location).toBeDefined();
    expect(character.location.name).toBe('Citadel of Ricks');
    expect(character.location.url).toBeDefined();
  });

  it('should have episode array', () => {
    expect(Array.isArray(character.episode)).toBe(true);
    expect(character.episode.length).toBeGreaterThan(0);
  });

  it('should accept valid status values', () => {
    character.status = 'Dead';
    expect(character.status).toBe('Dead');

    character.status = 'unknown';
    expect(character.status).toBe('unknown');
  });

  it('should accept valid gender values', () => {
    character.gender = 'Female';
    expect(character.gender).toBe('Female');

    character.gender = 'Genderless';
    expect(character.gender).toBe('Genderless');

    character.gender = 'unknown';
    expect(character.gender).toBe('unknown');
  });

  it('should allow additional properties via index signature', () => {
    character['customProperty'] = 'test value';
    expect(character['customProperty']).toBe('test value');
  });
});
