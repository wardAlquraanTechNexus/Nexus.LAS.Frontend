import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSnackbar } from './info-snackbar';

describe('InfoSnackbar', () => {
  let component: InfoSnackbar;
  let fixture: ComponentFixture<InfoSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
