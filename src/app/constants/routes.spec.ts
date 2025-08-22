import {
  ROUTE_CHARACTER,
  ROUTE_CHARACTER_ROUTER,
  ROUTE_CHARACTERS,
  ROUTE_DIMENSION,
  ROUTE_DIMENSION_ROUTER,
  ROUTE_DIMENSIONS,
  ROUTE_EPISODE,
  ROUTE_EPISODE_ROUTER,
  ROUTE_EPISODES,
  ROUTE_LOCATION,
  ROUTE_LOCATION_ROUTER,
  ROUTE_LOCATIONS,
  ROUTE_SEARCH,
} from './routes';

describe('Routes Constants', () => {
  it('should export correct route constants for pages', () => {
    expect(ROUTE_LOCATIONS).toBe('locations');
    expect(ROUTE_EPISODES).toBe('episodes');
    expect(ROUTE_SEARCH).toBe('search');
    expect(ROUTE_CHARACTERS).toBe('characters');
    expect(ROUTE_DIMENSIONS).toBe('dimensions');
  });

  it('should export correct route constants for detail pages', () => {
    expect(ROUTE_CHARACTER).toBe('character');
    expect(ROUTE_LOCATION).toBe('location');
    expect(ROUTE_EPISODE).toBe('episode');
    expect(ROUTE_DIMENSION).toBe('dimension');
  });

  it('should export correct router route constants with parameters', () => {
    expect(ROUTE_CHARACTER_ROUTER).toBe('character/:id');
    expect(ROUTE_LOCATION_ROUTER).toBe('location/:id');
    expect(ROUTE_EPISODE_ROUTER).toBe('episode/:id');
    expect(ROUTE_DIMENSION_ROUTER).toBe('dimension/:id');
  });

  it('should have all constants as strings', () => {
    expect(typeof ROUTE_LOCATIONS).toBe('string');
    expect(typeof ROUTE_EPISODES).toBe('string');
    expect(typeof ROUTE_SEARCH).toBe('string');
    expect(typeof ROUTE_CHARACTERS).toBe('string');
    expect(typeof ROUTE_CHARACTER).toBe('string');
    expect(typeof ROUTE_LOCATION).toBe('string');
    expect(typeof ROUTE_EPISODE).toBe('string');
    expect(typeof ROUTE_DIMENSIONS).toBe('string');
    expect(typeof ROUTE_DIMENSION).toBe('string');
  });

  it('should have router constants contain parameter syntax', () => {
    expect(ROUTE_CHARACTER_ROUTER).toContain(':id');
    expect(ROUTE_LOCATION_ROUTER).toContain(':id');
    expect(ROUTE_EPISODE_ROUTER).toContain(':id');
    expect(ROUTE_DIMENSION_ROUTER).toContain(':id');
  });
});
