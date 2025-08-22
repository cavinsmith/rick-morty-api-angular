import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Character } from '../../store/models/character.model';
import { CharacterCard } from './character-card';

describe('CharacterCard', () => {
  let component: CharacterCard;
  let fixture: ComponentFixture<CharacterCard>;

  const mockCharacter: Character = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCard);
    component = fixture.componentInstance;
    component.character = mockCharacter;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have character properties', () => {
    expect(component.character.name).toBe('Rick Sanchez');
    expect(component.character.status).toBe('Alive');
    expect(component.character.species).toBe('Human');
  });

  it('should have character image property', () => {
    expect(component.character.image).toBe(mockCharacter.image);
  });

  it('should have location router link constant', () => {
    expect(component.locationRouterLink).toBeDefined();
    expect(typeof component.locationRouterLink).toBe('string');
  });

  it('should render character card', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should handle character with different status', () => {
    const deadCharacter: Character = {
      ...mockCharacter,
      id: 2,
      name: 'Dead Character',
      status: 'Dead',
    };

    component.character = deadCharacter;
    expect(component.character.name).toBe('Dead Character');
    expect(component.character.status).toBe('Dead');
  });

  it('should handle character with unknown status', () => {
    const unknownCharacter: Character = {
      ...mockCharacter,
      id: 3,
      name: 'Unknown Character',
      status: 'unknown',
    };

    component.character = unknownCharacter;
    expect(component.character.name).toBe('Unknown Character');
    expect(component.character.status).toBe('unknown');
  });

  it('should handle character with empty type', () => {
    const characterWithEmptyType: Character = {
      ...mockCharacter,
      type: '',
    };

    component.character = characterWithEmptyType;
    fixture.detectChanges();

    expect(component.character.type).toBe('');
  });

  it('should have character location information', () => {
    expect(component.character.location.name).toBe('Citadel of Ricks');
  });

  it('should have character origin information', () => {
    expect(component.character.origin.name).toBe('Earth (C-137)');
  });
});
