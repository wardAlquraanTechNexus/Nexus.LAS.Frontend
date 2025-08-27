import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmailFormComponent } from './company-email-form-component';

describe('CompanyEmailFormComponent', () => {
  let component: CompanyEmailFormComponent;
  let fixture: ComponentFixture<CompanyEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEmailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
