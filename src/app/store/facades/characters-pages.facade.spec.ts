import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CharacterFilter } from 'rickmortyapi';
import { CharactersPagesFacade } from './characters-pages.facade';
import * as CharactersPagesActions from '../actions/characters-pages.actions';
import { Character } from '../models/character.model';

describe('CharactersPagesFacade', () => {
  let facade: CharactersPagesFacade;
  let mockStore: jasmine.SpyObj<Store>;

  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
    },
  ];

  const mockFilter: CharacterFilter = { name: 'Rick' };
  const mockTotalPagesAndItems = { totalPages: 5, totalItems: 100 };

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      providers: [CharactersPagesFacade, { provide: Store, useValue: storeSpy }],
    });

    facade = TestBed.inject(CharactersPagesFacade);
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch load action when page is not loaded', () => {
    mockStore.select.and.returnValues(of(false), of(mockCharacters));

    facade.getPage(1, mockFilter);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CharactersPagesActions.loadCharactersPages({ page: 1, filter: mockFilter }),
    );
  });

  it('should not dispatch load action when page is already loaded', () => {
    mockStore.select.and.returnValues(of(true), of(mockCharacters));

    facade.getPage(1, mockFilter);

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should return characters page from store', () => {
    mockStore.select.and.returnValues(of(true), of(mockCharacters));

    const result = facade.getPage(1, mockFilter);

    expect(result).toBeDefined();
    result.subscribe((characters) => {
      expect(characters).toEqual(mockCharacters);
    });
  });

  it('should return total pages and items', () => {
    mockStore.select.and.returnValue(of(mockTotalPagesAndItems));

    const result = facade.getTotalPagesAndItems();

    expect(result).toBeDefined();
    result.subscribe((total) => {
      expect(total).toEqual(mockTotalPagesAndItems);
    });
  });

  it('should handle empty filter', () => {
    const emptyFilter: CharacterFilter = {};
    mockStore.select.and.returnValues(of(false), of(mockCharacters));

    facade.getPage(1, emptyFilter);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CharactersPagesActions.loadCharactersPages({ page: 1, filter: emptyFilter }),
    );
  });

  it('should handle different page numbers', () => {
    mockStore.select.and.returnValues(of(false), of(mockCharacters));

    facade.getPage(3, mockFilter);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CharactersPagesActions.loadCharactersPages({ page: 3, filter: mockFilter }),
    );
  });
});
