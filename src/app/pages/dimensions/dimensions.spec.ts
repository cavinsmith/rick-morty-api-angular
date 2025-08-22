import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';
import { Dimensions } from './dimensions';

describe('Dimensions', () => {
  let component: Dimensions;
  let fixture: ComponentFixture<Dimensions>;
  let mockDimensionsFacade: jasmine.SpyObj<DimensionsFacade>;

  beforeEach(async () => {
    const dimensionsFacadeSpy = jasmine.createSpyObj('DimensionsFacade', [
      'getAllDimensions',
      'loadAllDimensions',
      'getDimensions',
      'getAllDimensionNames',
    ]);

    await TestBed.configureTestingModule({
      imports: [Dimensions],
      providers: [{ provide: DimensionsFacade, useValue: dimensionsFacadeSpy }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Dimensions);
    component = fixture.componentInstance;
    mockDimensionsFacade = TestBed.inject(DimensionsFacade) as jasmine.SpyObj<DimensionsFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject DimensionsFacade', () => {
    expect(component.dimensionsFacade).toBeTruthy();
    expect(component.dimensionsFacade).toBe(mockDimensionsFacade);
  });

  it('should have dimension router link constant', () => {
    expect(component.dimensionsRoute).toBeDefined();
    expect(typeof component.dimensionsRoute).toBe('string');
  });

  it('should render dimensions page', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
