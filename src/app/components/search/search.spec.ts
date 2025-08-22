/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { GenericPagesFacade } from '../../store/facades/generic-pages.facade';
import { Search } from './search';

describe('Search Component', () => {
  let component: Search<any, any>;
  let fixture: ComponentFixture<Search<any, any>>;
  let mockGenericPagesFacade: jasmine.SpyObj<GenericPagesFacade<any[], any>>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockData = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ];

  beforeEach(async () => {
    const genericPagesFacadeSpy = jasmine.createSpyObj('GenericPagesFacade', ['getPage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        { provide: GenericPagesFacade, useValue: genericPagesFacadeSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    mockGenericPagesFacade = TestBed.inject(GenericPagesFacade) as jasmine.SpyObj<
      GenericPagesFacade<any[], any>
    >;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    component.pagesFacade = mockGenericPagesFacade;
    component.routeLink = 'characters';

    mockGenericPagesFacade.getPage.and.returnValue(of(mockData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchParameter).toBe('name');
    expect(component.searchName).toBe('unknown');
    expect(component.searchControl).toBeInstanceOf(FormControl);
  });

  it('should call updatePage on ngOnInit', () => {
    spyOn(component as any, 'updatePage');

    component.ngOnInit();

    expect((component as any).updatePage).toHaveBeenCalled();
  });

  it('should handle empty search input', () => {
    component.ngOnInit();

    component.searchControl.setValue('');

    expect(component.searchFilter).toEqual({});
  });

  it('should update search filter on input change', fakeAsync(() => {
    component.ngOnInit();

    component.searchControl.setValue('Rick');
    tick(300);

    expect(component.searchFilter).toEqual({ name: 'Rick' });
  }));

  it('should navigate on option select', () => {
    const option = { id: 1, value: 'Rick Sanchez' };

    component.onSelect(option);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'characters', 1]);
  });

  it('should handle custom search parameter', fakeAsync(() => {
    component.searchParameter = 'dimension';
    component.ngOnInit();

    component.searchControl.setValue('C-137');
    tick(300);

    expect(component.searchFilter).toEqual({ dimension: 'C-137' });
  }));

  it('should filter out invalid values', () => {
    const dataWithNulls = [
      { id: 1, name: 'Rick' },
      { id: 2, name: null },
      { id: 3, name: '' },
      { id: 4, name: 'Morty' },
    ];

    mockGenericPagesFacade.getPage.and.returnValue(of(dataWithNulls));
    component.ngOnInit();

    component.items$.subscribe((items) => {
      expect(items?.length).toBe(2);
      expect(items?.map((i) => i.value)).toEqual(['Rick', 'Morty']);
    });
  });

  it('should remove duplicate values', () => {
    const dataWithDuplicates = [
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Rick' },
      { id: 3, name: 'Morty' },
    ];

    mockGenericPagesFacade.getPage.and.returnValue(of(dataWithDuplicates));
    component.ngOnInit();

    component.items$.subscribe((items) => {
      expect(items?.length).toBe(2);
      expect(items?.map((i) => i.value)).toEqual(['Rick', 'Morty']);
    });
  });

  it('should handle empty data', () => {
    mockGenericPagesFacade.getPage.and.returnValue(of([]));
    component.ngOnInit();

    component.items$.subscribe((items) => {
      expect(items).toEqual([]);
    });
  });

  it('should handle null data', () => {
    mockGenericPagesFacade.getPage.and.returnValue(of(undefined));
    component.ngOnInit();

    component.items$.subscribe((items) => {
      expect(items).toEqual([]);
    });
  });
});
