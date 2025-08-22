import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { Loader } from './loader';

describe('Loader', () => {
  let component: Loader;
  let fixture: ComponentFixture<Loader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loader],
    }).compileComponents();

    fixture = TestBed.createComponent(Loader);
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

  it('should accept waitfor observable', () => {
    const testObservable = of('test data');
    component.waitfor = testObservable;
    expect(component.waitfor).toBe(testObservable);
  });

  it('should handle observable with data', () => {
    component.waitfor = of('some data');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle observable with null data', () => {
    component.waitfor = of(null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle observable with undefined data', () => {
    component.waitfor = of(undefined);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle BehaviorSubject', () => {
    const subject = new BehaviorSubject('initial value');
    component.waitfor = subject;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    subject.next('updated value');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle empty observable', () => {
    component.waitfor = of();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
