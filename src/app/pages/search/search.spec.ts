import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersPagesFacade } from '../../store/facades/characters-pages.facade';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { Search } from './search';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let mockCharactersPagesFacade: jasmine.SpyObj<CharactersPagesFacade>;
  let mockLocationsPagesFacade: jasmine.SpyObj<LocationsPagesFacade>;
  let mockEpisodesPagesFacade: jasmine.SpyObj<EpisodesPagesFacade>;

  beforeEach(async () => {
    const charactersPagesFacadeSpy = jasmine.createSpyObj('CharactersPagesFacade', ['getPage']);
    const locationsPagesFacadeSpy = jasmine.createSpyObj('LocationsPagesFacade', ['getPage']);
    const episodesPagesFacadeSpy = jasmine.createSpyObj('EpisodesPagesFacade', ['getPage']);

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        { provide: CharactersPagesFacade, useValue: charactersPagesFacadeSpy },
        { provide: LocationsPagesFacade, useValue: locationsPagesFacadeSpy },
        { provide: EpisodesPagesFacade, useValue: episodesPagesFacadeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    mockCharactersPagesFacade = TestBed.inject(
      CharactersPagesFacade,
    ) as jasmine.SpyObj<CharactersPagesFacade>;
    mockLocationsPagesFacade = TestBed.inject(
      LocationsPagesFacade,
    ) as jasmine.SpyObj<LocationsPagesFacade>;
    mockEpisodesPagesFacade = TestBed.inject(
      EpisodesPagesFacade,
    ) as jasmine.SpyObj<EpisodesPagesFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CharactersPagesFacade', () => {
    expect(component.charactersPagesFacade).toBeTruthy();
    expect(component.charactersPagesFacade).toBe(mockCharactersPagesFacade);
  });

  it('should inject LocationsPagesFacade', () => {
    expect(component.locationsPagesFacade).toBeTruthy();
    expect(component.locationsPagesFacade).toBe(mockLocationsPagesFacade);
  });

  it('should inject EpisodesPagesFacade', () => {
    expect(component.episodesPagesFacade).toBeTruthy();
    expect(component.episodesPagesFacade).toBe(mockEpisodesPagesFacade);
  });

  it('should have routesLinks property', () => {
    expect(component.routesLinks).toBeDefined();
    expect(typeof component.routesLinks).toBe('object');
  });

  it('should render search page', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
