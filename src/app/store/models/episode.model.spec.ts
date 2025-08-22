import { Episode } from './episode.model';

describe('Episode Model', () => {
  let episode: Episode;

  beforeEach(() => {
    episode = {
      id: 1,
      name: 'Pilot',
      dimension: 'Dimension C-137',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
    };
  });

  it('should create an episode with all required properties', () => {
    expect(episode.id).toBe(1);
    expect(episode.name).toBe('Pilot');
    expect(episode.air_date).toBe('December 2, 2013');
    expect(episode.episode).toBe('S01E01');
  });

  it('should have characters as string array', () => {
    expect(Array.isArray(episode.characters)).toBe(true);
    expect(episode.characters.length).toBeGreaterThan(0);
    expect(typeof episode.characters[0]).toBe('string');
  });

  it('should accept empty characters array', () => {
    episode.characters = [];
    expect(episode.characters.length).toBe(0);
  });

  it('should accept valid episode codes', () => {
    episode.episode = 'S02E05';
    expect(episode.episode).toBe('S02E05');

    episode.episode = 'S01E11';
    expect(episode.episode).toBe('S01E11');
  });

  it('should handle dimension as optional property', () => {
    const episodeWithoutDimension: Episode = {
      id: 2,
      name: 'Test Episode',
      air_date: 'January 1, 2014',
      episode: 'S01E02',
      characters: [],
    };

    expect(episodeWithoutDimension.dimension).toBeUndefined();
    expect(episodeWithoutDimension.id).toBe(2);
  });

  it('should allow dimension to be set or unset', () => {
    episode.dimension = undefined;
    expect(episode.dimension).toBeUndefined();

    episode.dimension = 'Dimension C-132';
    expect(episode.dimension).toBe('Dimension C-132');
  });

  it('should handle numeric id values', () => {
    episode.id = 999;
    expect(episode.id).toBe(999);
    expect(typeof episode.id).toBe('number');
  });
});
