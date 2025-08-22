import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ShowcaseCharacters } from './showcase-characters';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Character } from '../../store/models/character.model';

describe('ShowcaseCharacters', () => {
  let component: ShowcaseCharacters;
  let fixture: ComponentFixture<ShowcaseCharacters>;
  let mockCharactersFacade: jasmine.SpyObj<CharactersFacade>;

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

  beforeEach(async () => {
    const charactersFacadeSpy = jasmine.createSpyObj('CharactersFacade', ['getRecords']);

    await TestBed.configureTestingModule({
      imports: [ShowcaseCharacters],
      providers: [{ provide: CharactersFacade, useValue: charactersFacadeSpy }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCharacters);
    component = fixture.componentInstance;
    mockCharactersFacade = TestBed.inject(CharactersFacade) as jasmine.SpyObj<CharactersFacade>;

    mockCharactersFacade.getRecords.and.returnValue(of(mockCharacters));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CharactersFacade', () => {
    expect(component.charactersFacade).toBeTruthy();
    expect(component.charactersFacade).toBe(mockCharactersFacade);
  });

  it('should have initial properties', () => {
    expect(component.currentPage).toBe(1);
    expect(component.characterIds).toEqual([]);
  });

  it('should update total elements on characterIds change', () => {
    const testCharacterIds = [
      ['url1', 'url2', 'url3'],
      ['url4', 'url5'],
    ];

    component.characterIds = testCharacterIds;
    component.ngOnChanges({
      characterIds: {
        currentValue: testCharacterIds,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.totalElements).toBe(5);
    expect(component.currentPage).toBe(1);
  });

  it('should handle page change', () => {
    component.characterIds = [
      ['https://rickandmortyapi.com/api/character/1'],
      ['https://rickandmortyapi.com/api/character/2'],
    ];

    spyOn(component, 'updateCharacters');

    component.onPageChange({ pageIndex: 1 });

    expect(component.currentPage).toBe(2);
    expect(component.updateCharacters).toHaveBeenCalled();
  });

  it('should extract IDs and call facade', () => {
    component.characterIds = [['https://rickandmortyapi.com/api/character/1']];
    component.currentPage = 1;

    component.updateCharacters();

    expect(mockCharactersFacade.getRecords).toHaveBeenCalledWith([1]);
    expect(component.characters$).toBeDefined();
  });

  it('should track by function return correct values', () => {
    const character = mockCharacters[0];

    expect(component.trackByFn(0, character)).toBe(1);

    const characterWithoutId = { ...character, id: 0 };
    expect(component.trackByFn(0, characterWithoutId)).toBe('Rick Sanchez');

    const characterWithoutIdOrName = { ...character, id: 0, name: '' };
    expect(component.trackByFn(5, characterWithoutIdOrName)).toBe(5);
  });

  it('should handle empty characterIds', () => {
    component.characterIds = [];
    component.ngOnChanges({
      characterIds: {
        currentValue: [],
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.totalElements).toBe(0);
  });

  it('should handle multiple character ID arrays', () => {
    const testCharacterIds = [
      [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
      ['https://rickandmortyapi.com/api/character/3'],
      [
        'https://rickandmortyapi.com/api/character/4',
        'https://rickandmortyapi.com/api/character/5',
        'https://rickandmortyapi.com/api/character/6',
      ],
    ];

    component.characterIds = testCharacterIds;
    component.ngOnChanges({
      characterIds: {
        currentValue: testCharacterIds,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.totalElements).toBe(6);
  });

  it('should call updateCharacters on ngOnInit', () => {
    spyOn(component, 'updateCharacters');
    component.ngOnInit();
    expect(component.updateCharacters).toHaveBeenCalled();
  });
});
