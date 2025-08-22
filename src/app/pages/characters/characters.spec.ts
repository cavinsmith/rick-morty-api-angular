import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CharactersPagesFacade } from '../../store/facades/characters-pages.facade';
import { ListCharacters } from './characters';

describe('ListCharacters', () => {
  let component: ListCharacters;
  let fixture: ComponentFixture<ListCharacters>;
  let mockCharactersFacade: jasmine.SpyObj<CharactersPagesFacade>;

  beforeEach(async () => {
    const charactersFacadeSpy = jasmine.createSpyObj('CharactersPagesFacade', [
      'getPage',
      'loadPage',
      'getTotalPages',
      'getCurrentPage',
      'getTotalPagesAndItems',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListCharacters],
      providers: [
        { provide: CharactersPagesFacade, useValue: charactersFacadeSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCharacters);
    component = fixture.componentInstance;
    mockCharactersFacade = TestBed.inject(
      CharactersPagesFacade,
    ) as jasmine.SpyObj<CharactersPagesFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CharactersPagesFacade', () => {
    expect(component.charactersFacade).toBeTruthy();
    expect(component.charactersFacade).toBe(mockCharactersFacade);
  });

  it('should have character router link constant', () => {
    expect(component.characterRouterLink).toBeDefined();
    expect(typeof component.characterRouterLink).toBe('string');
  });

  it('should render characters page', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should inject facade properly', () => {
    expect(component.charactersFacade).toBeTruthy();
  });
});
