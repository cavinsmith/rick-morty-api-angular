import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getMultipleCharacters method', () => {
    expect(service.getMultipleCharacters).toBeDefined();
    expect(typeof service.getMultipleCharacters).toBe('function');
  });

  it('should have getCharacter method', () => {
    expect(service.getCharacter).toBeDefined();
    expect(typeof service.getCharacter).toBe('function');
  });

  it('should have getEpisode method', () => {
    expect(service.getEpisode).toBeDefined();
    expect(typeof service.getEpisode).toBe('function');
  });

  it('should have getLocation method', () => {
    expect(service.getLocation).toBeDefined();
    expect(typeof service.getLocation).toBe('function');
  });

  it('should have getLocations method', () => {
    expect(service.getLocations).toBeDefined();
    expect(typeof service.getLocations).toBe('function');
  });

  it('should have getCharacters method', () => {
    expect(service.getCharacters).toBeDefined();
    expect(typeof service.getCharacters).toBe('function');
  });

  it('should have getEpisodes method', () => {
    expect(service.getEpisodes).toBeDefined();
    expect(typeof service.getEpisodes).toBe('function');
  });

  it('should have getCharactersInDimension method', () => {
    expect(service.getCharactersInDimension).toBeDefined();
    expect(typeof service.getCharactersInDimension).toBe('function');
  });

  it('should have getAllDimensions method', () => {
    expect(service.getAllDimensions).toBeDefined();
    expect(typeof service.getAllDimensions).toBe('function');
  });

  describe('getCharacter', () => {
    it('should call getMultipleCharacters with single id', async () => {
      spyOn(service, 'getMultipleCharacters').and.returnValue(
        Promise.resolve({ id: 1, name: 'Rick' } as never),
      );

      await service.getCharacter(1);

      expect(service.getMultipleCharacters).toHaveBeenCalledWith([1]);
    });
  });
});
