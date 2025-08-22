import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LocationsFacade } from '../../store/facades/locations.facade';
import { Location as LocationModel } from '../../store/models/location.model';
import { Location } from './location';

describe('Location', () => {
  let component: Location;
  let fixture: ComponentFixture<Location>;
  let mockLocationsFacade: jasmine.SpyObj<LocationsFacade>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockLocation: LocationModel = {
    id: 1,
    name: 'Earth (C-137)',
    type: 'Planet',
    dimension: 'Dimension C-137',
    residents: ['https://rickandmortyapi.com/api/character/1'],
  };

  beforeEach(async () => {
    const locationsFacadeSpy = jasmine.createSpyObj('LocationsFacade', ['getRecord']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' }),
    });

    await TestBed.configureTestingModule({
      imports: [Location],
      providers: [
        { provide: LocationsFacade, useValue: locationsFacadeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Location);
    component = fixture.componentInstance;
    mockLocationsFacade = TestBed.inject(LocationsFacade) as jasmine.SpyObj<LocationsFacade>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    mockLocationsFacade.getRecord.and.returnValue(of(mockLocation));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject LocationsFacade', () => {
    expect(component.locationsFacade).toBeTruthy();
    expect(component.locationsFacade).toBe(mockLocationsFacade);
  });

  it('should inject ActivatedRoute', () => {
    expect(component.route).toBeTruthy();
    expect(component.route).toBe(mockActivatedRoute);
  });

  it('should have default currentLocation', () => {
    expect(component.currentLocation).toBe(55);
  });

  it('should initialize component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should update location on currentLocation input change', () => {
    spyOn(component, 'updateLocation');

    const changes = {
      currentLocation: {
        currentValue: 42,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateLocation).toHaveBeenCalled();
  });

  it('should not update location when other inputs change', () => {
    spyOn(component, 'updateLocation');

    const changes = {
      id: {
        currentValue: 'new-id',
        previousValue: 'old-id',
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.updateLocation).not.toHaveBeenCalled();
  });

  it('should call facade getRecord when updateLocation is called', () => {
    component.currentLocation = 42;

    component.updateLocation();

    expect(mockLocationsFacade.getRecord).toHaveBeenCalledWith(42);
    expect(component.location$).toBeDefined();
  });

  it('should handle custom currentLocation input', () => {
    component.currentLocation = 999;

    component.updateLocation();

    expect(mockLocationsFacade.getRecord).toHaveBeenCalledWith(999);
  });

  it('should handle route params without id', () => {
    spyOn(component, 'updateLocation');
    mockActivatedRoute.params = of({});

    component.ngOnInit();

    expect(component.updateLocation).not.toHaveBeenCalled();
    expect(component.currentLocation).toBe(55); // Should remain default
  });

  it('should convert string id to number from route params', () => {
    mockActivatedRoute.params = of({ id: '123' });

    component.ngOnInit();

    expect(component.currentLocation).toBe(123);
  });
});
