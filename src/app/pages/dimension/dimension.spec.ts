import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { LocationsFacade } from '../../store/facades/locations.facade';
import { Dimension } from './dimension';

describe('Dimension', () => {
  let component: Dimension;
  let fixture: ComponentFixture<Dimension>;
  let mockLocationsFacade: jasmine.SpyObj<LocationsFacade>;
  let mockDimensionsFacade: jasmine.SpyObj<DimensionsFacade>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockLocation = {
    id: 1,
    name: 'Earth (C-137)',
    type: 'Planet',
    dimension: 'Dimension C-137',
    residents: ['https://rickandmortyapi.com/api/character/1'],
  };

  const mockDimension = {
    name: 'Dimension C-137',
    residents: [['https://rickandmortyapi.com/api/character/1']],
  };

  beforeEach(async () => {
    const locationsFacadeSpy = jasmine.createSpyObj('LocationsFacade', ['getRecord']);
    const locationsPagesFacadeSpy = jasmine.createSpyObj('LocationsPagesFacade', ['getPage']);
    const dimensionsFacadeSpy = jasmine.createSpyObj('DimensionsFacade', [
      'getAllCharactersInDimension',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' }),
    });

    await TestBed.configureTestingModule({
      imports: [Dimension],
      providers: [
        { provide: LocationsFacade, useValue: locationsFacadeSpy },
        { provide: LocationsPagesFacade, useValue: locationsPagesFacadeSpy },
        { provide: DimensionsFacade, useValue: dimensionsFacadeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dimension);
    component = fixture.componentInstance;
    mockLocationsFacade = TestBed.inject(LocationsFacade) as jasmine.SpyObj<LocationsFacade>;
    mockDimensionsFacade = TestBed.inject(DimensionsFacade) as jasmine.SpyObj<DimensionsFacade>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    mockLocationsFacade.getRecord.and.returnValue(of(mockLocation));
    mockDimensionsFacade.getAllCharactersInDimension.and.returnValue(of(mockDimension));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject all facades', () => {
    expect(component.locationsFacade).toBeTruthy();
    expect(component.locationsPagesFacade).toBeTruthy();
    expect(component.dimensionsFacade).toBeTruthy();
    expect(component.route).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.initialPage).toBe(1);
    expect(component.itemsPerPage).toBe(20);
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

  it('should call facades when updateLocation is called', () => {
    component.currentLocation = 42;

    component.updateLocation();

    expect(mockLocationsFacade.getRecord).toHaveBeenCalledWith(42);
    expect(component.location$).toBeDefined();
    expect(component.dimension$).toBeDefined();
  });

  it('should handle route params without id', () => {
    spyOn(component, 'updateLocation');
    mockActivatedRoute.params = of({});

    component.ngOnInit();

    expect(component.updateLocation).not.toHaveBeenCalled();
  });

  it('should convert string id to number from route params', () => {
    mockActivatedRoute.params = of({ id: '123' });

    component.ngOnInit();

    expect(component.currentLocation).toBe(123);
  });

  it('should handle locations without dimension', () => {
    const locationWithoutDimension = { ...mockLocation, dimension: '' };
    mockLocationsFacade.getRecord.and.returnValue(of(locationWithoutDimension));

    component.updateLocation();

    expect(component.location$).toBeDefined();
    expect(component.dimension$).toBeDefined();
  });
});
