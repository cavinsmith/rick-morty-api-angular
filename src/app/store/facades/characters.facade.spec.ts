import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CharactersFacade } from './characters.facade';
import * as CharactersActions from '../actions/characters.actions';
import { Character } from '../models/character.model';

describe('CharactersFacade', () => {
  let facade: CharactersFacade;
  let mockStore: jasmine.SpyObj<Store>;

  const mockCharacter: Character = {
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
  };

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      providers: [CharactersFacade, { provide: Store, useValue: storeSpy }],
    });

    facade = TestBed.inject(CharactersFacade);
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should return character record when it exists in store', () => {
    mockStore.select.and.returnValue(of(mockCharacter));

    const result = facade.getRecord(1);

    expect(result).toBeDefined();
    result.subscribe((character) => {
      expect(character).toEqual(mockCharacter);
    });
  });

  it('should dispatch load action when character does not exist', () => {
    mockStore.select.and.returnValues(of(undefined), of(mockCharacter));

    facade.getRecord(1).subscribe();

    expect(mockStore.dispatch).toHaveBeenCalledWith(CharactersActions.loadCharacter({ id: 1 }));
  });

  it('should get multiple character records', () => {
    const mockCharacters = [mockCharacter, { ...mockCharacter, id: 2, name: 'Morty Smith' }];
    mockStore.select.and.returnValue(of(mockCharacters));

    const result = facade.getRecords([1, 2]);

    expect(result).toBeDefined();
    result.subscribe((characters) => {
      expect(characters).toEqual(mockCharacters);
    });
  });

  it('should dispatch load action for missing characters', () => {
    const existingCharacters = [mockCharacter]; // Only character 1 exists
    mockStore.select.and.returnValues(
      of(existingCharacters),
      of([mockCharacter, { ...mockCharacter, id: 2 }]),
    );

    facade.getRecords([1, 2]).subscribe();

    expect(mockStore.dispatch).toHaveBeenCalledWith(CharactersActions.loadCharacters({ ids: [2] }));
  });

  it('should handle empty character list', () => {
    mockStore.select.and.returnValue(of([]));

    const result = facade.getRecords([1, 2]);

    expect(result).toBeDefined();
    result.subscribe();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CharactersActions.loadCharacters({ ids: [1, 2] }),
    );
  });
});
