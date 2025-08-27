import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmailDialogFormComponent } from './company-email-dialog-form-component';

describe('CompanyEmailDialogFormComponent', () => {
  let component: CompanyEmailDialogFormComponent;
  let fixture: ComponentFixture<CompanyEmailDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEmailDialogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEmailDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
