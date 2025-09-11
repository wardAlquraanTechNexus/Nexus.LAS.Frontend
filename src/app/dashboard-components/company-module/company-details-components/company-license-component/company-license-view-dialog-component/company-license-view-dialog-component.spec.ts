import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLicenseViewDialogComponent } from './company-license-view-dialog-component';

describe('CompanyLicenseViewDialogComponent', () => {
  let component: CompanyLicenseViewDialogComponent;
  let fixture: ComponentFixture<CompanyLicenseViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLicenseViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLicenseViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
