import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSnackbar } from './error-snackbar';

describe('ErrorSnackbar', () => {
  let component: ErrorSnackbar;
  let fixture: ComponentFixture<ErrorSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
