import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Portal } from './portal';

describe('Portal', () => {
  let component: Portal;
  let fixture: ComponentFixture<Portal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portal],
    }).compileComponents();

    fixture = TestBed.createComponent(Portal);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size property', () => {
    expect(component.size).toBe(300);
  });

  it('should accept custom size property', () => {
    component.size = 150;
    expect(component.size).toBe(150);
  });

  it('should accept large size values', () => {
    component.size = 1000;
    expect(component.size).toBe(1000);
  });

  it('should accept small size values', () => {
    component.size = 50;
    expect(component.size).toBe(50);
  });

  it('should render portal component', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should handle zero size', () => {
    component.size = 0;
    expect(component.size).toBe(0);
  });

  it('should handle negative size', () => {
    component.size = -100;
    expect(component.size).toBe(-100);
  });
});
