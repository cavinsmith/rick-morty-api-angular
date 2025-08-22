import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { ListLocations } from './locations';

describe('ListLocations', () => {
  let component: ListLocations;
  let fixture: ComponentFixture<ListLocations>;
  let mockLocationsFacade: jasmine.SpyObj<LocationsPagesFacade>;

  beforeEach(async () => {
    const locationsFacadeSpy = jasmine.createSpyObj('LocationsPagesFacade', [
      'getPage',
      'loadPage',
      'getTotalPages',
      'getCurrentPage',
      'getTotalPagesAndItems',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListLocations],
      providers: [
        { provide: LocationsPagesFacade, useValue: locationsFacadeSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListLocations);
    component = fixture.componentInstance;
    mockLocationsFacade = TestBed.inject(
      LocationsPagesFacade,
    ) as jasmine.SpyObj<LocationsPagesFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject LocationsPagesFacade', () => {
    expect(component.locationsFacade).toBeTruthy();
    expect(component.locationsFacade).toBe(mockLocationsFacade);
  });

  it('should have location router link constant', () => {
    expect(component.locationRouterLink).toBeDefined();
    expect(typeof component.locationRouterLink).toBe('string');
  });

  it('should render locations page', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
