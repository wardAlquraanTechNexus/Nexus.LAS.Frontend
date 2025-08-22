import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningSnackbar } from './warning-snackbar';

describe('WarningSnackbar', () => {
  let component: WarningSnackbar;
  let fixture: ComponentFixture<WarningSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
