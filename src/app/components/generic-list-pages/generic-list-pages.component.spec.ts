/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenericPagesFacade } from '../../store/facades/generic-pages.facade';
import { GenericListPagesComponent } from './generic-list-pages.component';

describe('GenericListPagesComponent', () => {
  let component: GenericListPagesComponent<any, any>;
  let fixture: ComponentFixture<GenericListPagesComponent<any, any>>;
  let mockPagesFacade: jasmine.SpyObj<GenericPagesFacade<any, any>>;

  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  beforeEach(async () => {
    const pagesFacadeSpy = jasmine.createSpyObj('GenericPagesFacade', [
      'getPage',
      'getTotalPagesAndItems',
    ]);

    await TestBed.configureTestingModule({
      imports: [GenericListPagesComponent],
      providers: [{ provide: GenericPagesFacade, useValue: pagesFacadeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericListPagesComponent);
    component = fixture.componentInstance;
    mockPagesFacade = TestBed.inject(GenericPagesFacade) as jasmine.SpyObj<
      GenericPagesFacade<any, any>
    >;

    component.pagesFacade = mockPagesFacade;

    mockPagesFacade.getTotalPagesAndItems.and.returnValue(of({ totalPages: 5, totalItems: 50 }));
    mockPagesFacade.getPage.and.returnValue(of(mockItems));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.initialPage).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should initialize on ngOnInit', () => {
    spyOn(component as any, 'updatePage');

    component.ngOnInit();

    expect(component.currentPage).toBe(1);
    expect(component.totalPagesAndItems$).toBeDefined();
    expect((component as any).updatePage).toHaveBeenCalled();
    expect(mockPagesFacade.getTotalPagesAndItems).toHaveBeenCalled();
  });

  it('should handle page change', () => {
    spyOn(component as any, 'updatePage');

    component.onPageChange({ pageIndex: 2 });

    expect(component.currentPage).toBe(3); // pageIndex + 1
    expect((component as any).updatePage).toHaveBeenCalled();
  });

  it('should track items by id', () => {
    const item = { id: 1, name: 'Test Item' };
    const result = component.trackByFn(0, item);
    expect(result).toBe(1);
  });

  it('should track items by name when no id', () => {
    const item = { name: 'Test Item' } as { id?: number; name?: string };
    const result = component.trackByFn(0, item);
    expect(result).toBe('Test Item');
  });

  it('should track items by index when no id or name', () => {
    const item = {} as { id?: number; name?: string };
    const result = component.trackByFn(5, item);
    expect(result).toBe(5);
  });

  it('should update page on filter change', () => {
    spyOn(component as any, 'updatePage');

    const changes = {
      filter: {
        currentValue: { name: 'test' },
        previousValue: { name: 'old' },
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.currentPage).toBe(1);
    expect((component as any).updatePage).toHaveBeenCalled();
  });

  it('should not update page when filter has not changed', () => {
    spyOn(component as any, 'updatePage');

    const sameFilter = { name: 'test' };
    const changes = {
      filter: {
        currentValue: sameFilter,
        previousValue: sameFilter,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect((component as any).updatePage).not.toHaveBeenCalled();
  });

  it('should update items observable when updatePage is called', () => {
    component.filter = { name: 'test filter' };
    component.currentPage = 2;

    (component as any).updatePage();

    expect(mockPagesFacade.getPage).toHaveBeenCalledWith(2, { name: 'test filter' });
    expect(component.items$).toBeDefined();
  });

  it('should handle custom initial page', () => {
    component.initialPage = 3;

    component.ngOnInit();

    expect(component.currentPage).toBe(3);
  });

  it('should handle changes to non-filter properties', () => {
    spyOn(component as any, 'updatePage');

    const changes = {
      initialPage: {
        currentValue: 2,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect((component as any).updatePage).not.toHaveBeenCalled();
  });
});
