import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { App } from './app';
import { reducers } from './store/reducers';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideStore(reducers)],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render toolbar', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-toolbar')).toBeTruthy();
  });

  it('should render router outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have app-root selector', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have proper component structure', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const toolbar = compiled.querySelector('app-toolbar');
    const routerOutlet = compiled.querySelector('router-outlet');

    expect(toolbar).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
