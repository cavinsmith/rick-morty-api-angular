import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade';
import { ListEpisodes } from './episodes';

describe('ListEpisodes', () => {
  let component: ListEpisodes;
  let fixture: ComponentFixture<ListEpisodes>;
  let mockEpisodesFacade: jasmine.SpyObj<EpisodesPagesFacade>;

  beforeEach(async () => {
    const episodesFacadeSpy = jasmine.createSpyObj('EpisodesPagesFacade', [
      'getPage',
      'loadPage',
      'getTotalPages',
      'getCurrentPage',
      'getTotalPagesAndItems',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListEpisodes],
      providers: [{ provide: EpisodesPagesFacade, useValue: episodesFacadeSpy }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListEpisodes);
    component = fixture.componentInstance;
    mockEpisodesFacade = TestBed.inject(EpisodesPagesFacade) as jasmine.SpyObj<EpisodesPagesFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject EpisodesPagesFacade', () => {
    expect(component.episodesFacade).toBeTruthy();
    expect(component.episodesFacade).toBe(mockEpisodesFacade);
  });

  it('should have episode router link constant', () => {
    expect(component.episodeRouterLink).toBeDefined();
    expect(typeof component.episodeRouterLink).toBe('string');
  });

  it('should render episodes page', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
