import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackbar } from './success-snackbar';

describe('SuccessSnackbar', () => {
  let component: SuccessSnackbar;
  let fixture: ComponentFixture<SuccessSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
