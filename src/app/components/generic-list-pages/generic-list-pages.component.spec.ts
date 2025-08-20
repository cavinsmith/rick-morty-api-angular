import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListPagesComponent } from './generic-list-pages.component';

describe('GenericListPagesComponent', () => {
  let component: GenericListPagesComponent<any, any>;
  let fixture: ComponentFixture<GenericListPagesComponent<any, any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericListPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericListPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
