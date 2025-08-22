import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { EpisodesFacade } from '../../store/facades/episodes.facade';
import { Episode as EpisodeModel } from '../../store/models/episode.model';
import { Episode } from './episode';

describe('Episode', () => {
  let component: Episode;
  let fixture: ComponentFixture<Episode>;
  let mockEpisodesFacade: jasmine.SpyObj<EpisodesFacade>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockEpisode: EpisodeModel = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: ['https://rickandmortyapi.com/api/character/1'],
  };

  beforeEach(async () => {
    const episodesFacadeSpy = jasmine.createSpyObj('EpisodesFacade', ['getRecord']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' }),
    });

    await TestBed.configureTestingModule({
      imports: [Episode],
      providers: [
        { provide: EpisodesFacade, useValue: episodesFacadeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Episode);
    component = fixture.componentInstance;
    mockEpisodesFacade = TestBed.inject(EpisodesFacade) as jasmine.SpyObj<EpisodesFacade>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    mockEpisodesFacade.getRecord.and.returnValue(of(mockEpisode));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject EpisodesFacade', () => {
    expect(component.episodesFacade).toBeTruthy();
    expect(component.episodesFacade).toBe(mockEpisodesFacade);
  });

  it('should inject ActivatedRoute', () => {
    expect(component.route).toBeTruthy();
    expect(component.route).toBe(mockActivatedRoute);
  });

  it('should have default currentEpisode', () => {
    expect(component.currentEpisode).toBe(55);
  });

  it('should initialize component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should update episode on currentEpisode input change', () => {
    spyOn(component, 'updateEpisode');

    const changes = {
      currentEpisode: {
        currentValue: 42,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateEpisode).toHaveBeenCalled();
  });

  it('should not update episode when other inputs change', () => {
    spyOn(component, 'updateEpisode');

    const changes = {
      id: {
        currentValue: 'new-id',
        previousValue: 'old-id',
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateEpisode).not.toHaveBeenCalled();
  });

  it('should call facade getRecord when updateEpisode is called', () => {
    component.currentEpisode = 42;

    component.updateEpisode();

    expect(mockEpisodesFacade.getRecord).toHaveBeenCalledWith(42);
    expect(component.episode$).toBeDefined();
  });

  it('should handle custom currentEpisode input', () => {
    component.currentEpisode = 999;

    component.updateEpisode();

    expect(mockEpisodesFacade.getRecord).toHaveBeenCalledWith(999);
  });

  it('should handle route params without id', () => {
    spyOn(component, 'updateEpisode');
    mockActivatedRoute.params = of({});

    component.ngOnInit();

    expect(component.updateEpisode).not.toHaveBeenCalled();
    expect(component.currentEpisode).toBe(55); // Should remain default
  });

  it('should convert string id to number from route params', () => {
    mockActivatedRoute.params = of({ id: '123' });

    component.ngOnInit();

    expect(component.currentEpisode).toBe(123);
  });
});
