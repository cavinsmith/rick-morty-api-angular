import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation links', () => {
    expect(component.links).toBeDefined();
    expect(component.links.length).toBeGreaterThan(0);
  });

  it('should contain expected route links', () => {
    const expectedLabels = ['Search', 'Dimensions', 'Locations', 'Episodes', 'Characters'];
    const actualLabels = component.links.map((link) => link.label);

    expectedLabels.forEach((label) => {
      expect(actualLabels).toContain(label);
    });
  });

  it('should have valid path properties for all links', () => {
    component.links.forEach((link) => {
      expect(link.path).toBeDefined();
      expect(typeof link.path).toBe('string');
      expect(link.path.length).toBeGreaterThan(0);
    });
  });

  it('should have navigation links defined', () => {
    expect(component.links).toBeDefined();
    expect(component.links.length).toBeGreaterThan(0);
  });

  it('should have all expected link labels', () => {
    const expectedLabels = ['Search', 'Dimensions', 'Locations', 'Episodes', 'Characters'];
    const actualLabels = component.links.map((link) => link.label);

    expectedLabels.forEach((label) => {
      expect(actualLabels).toContain(label);
    });
  });

  it('should render toolbar', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have correct number of links', () => {
    expect(component.links.length).toBe(5);
  });

  it('should have Search as first link', () => {
    expect(component.links[0].label).toBe('Search');
  });

  it('should have Characters as last link', () => {
    expect(component.links[component.links.length - 1].label).toBe('Characters');
  });
});
