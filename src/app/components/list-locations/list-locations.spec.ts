import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocations } from './list-locations';

describe('ListLocations', () => {
  let component: ListLocations;
  let fixture: ComponentFixture<ListLocations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLocations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLocations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
