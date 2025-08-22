import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Character } from './character';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Character as CharacterModel } from '../../store/models/character.model';

describe('Character', () => {
  let component: Character;
  let fixture: ComponentFixture<Character>;
  let mockCharactersFacade: jasmine.SpyObj<CharactersFacade>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockCharacter: CharacterModel = {
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

  beforeEach(async () => {
    const charactersFacadeSpy = jasmine.createSpyObj('CharactersFacade', ['getRecord']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' }),
    });

    await TestBed.configureTestingModule({
      imports: [Character],
      providers: [
        { provide: CharactersFacade, useValue: charactersFacadeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Character);
    component = fixture.componentInstance;
    mockCharactersFacade = TestBed.inject(CharactersFacade) as jasmine.SpyObj<CharactersFacade>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    mockCharactersFacade.getRecord.and.returnValue(of(mockCharacter));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CharactersFacade', () => {
    expect(component.charactersFacade).toBeTruthy();
    expect(component.charactersFacade).toBe(mockCharactersFacade);
  });

  it('should inject ActivatedRoute', () => {
    expect(component.route).toBeTruthy();
    expect(component.route).toBe(mockActivatedRoute);
  });

  it('should have default currentCharacter', () => {
    expect(component.currentCharacter).toBe(55);
  });

  it('should initialize component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should update character on currentCharacter input change', () => {
    spyOn(component, 'updateCharacter');

    const changes = {
      currentCharacter: {
        currentValue: 42,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateCharacter).toHaveBeenCalled();
  });

  it('should not update character when other inputs change', () => {
    spyOn(component, 'updateCharacter');

    const changes = {
      id: {
        currentValue: 'new-id',
        previousValue: 'old-id',
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateCharacter).not.toHaveBeenCalled();
  });

  it('should call facade getRecord when updateCharacter is called', () => {
    component.currentCharacter = 42;

    component.updateCharacter();

    expect(mockCharactersFacade.getRecord).toHaveBeenCalledWith(42);
    expect(component.character$).toBeDefined();
  });

  it('should handle custom currentCharacter input', () => {
    component.currentCharacter = 999;

    component.updateCharacter();

    expect(mockCharactersFacade.getRecord).toHaveBeenCalledWith(999);
  });

  it('should handle route params without id', () => {
    spyOn(component, 'updateCharacter');
    mockActivatedRoute.params = of({});

    component.ngOnInit();

    expect(component.updateCharacter).not.toHaveBeenCalled();
    expect(component.currentCharacter).toBe(55); // Should remain default
  });

  it('should convert string id to number from route params', () => {
    mockActivatedRoute.params = of({ id: '123' });

    component.ngOnInit();

    expect(component.currentCharacter).toBe(123);
  });
});
