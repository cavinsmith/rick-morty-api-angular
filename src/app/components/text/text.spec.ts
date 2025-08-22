import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Text } from './text';

describe('Text', () => {
  let component: Text;
  let fixture: ComponentFixture<Text>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Text],
    }).compileComponents();

    fixture = TestBed.createComponent(Text);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should render text component', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
