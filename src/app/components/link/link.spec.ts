import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Link } from './link';

describe('Link', () => {
  let component: Link;
  let fixture: ComponentFixture<Link>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Link],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Link);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default link property', () => {
    expect(component.link).toEqual(['/']);
  });

  it('should have default text property', () => {
    expect(component.text).toBe('link');
  });

  it('should accept custom link property', () => {
    component.link = ['/characters', 1];
    expect(component.link).toEqual(['/characters', 1]);
  });

  it('should accept custom text property', () => {
    component.text = 'Custom Link Text';
    expect(component.text).toBe('Custom Link Text');
  });

  it('should handle string array links', () => {
    component.link = ['/episodes', 'pilot'];
    expect(component.link).toEqual(['/episodes', 'pilot']);
  });

  it('should handle mixed string and number array links', () => {
    component.link = ['/characters', 42, 'details'];
    expect(component.link).toEqual(['/characters', 42, 'details']);
  });
});
