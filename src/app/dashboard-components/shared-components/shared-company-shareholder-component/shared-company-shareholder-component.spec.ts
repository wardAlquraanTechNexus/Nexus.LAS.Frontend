import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCompanyShareholderComponent } from './shared-company-shareholder-component';

describe('SharedCompanyShareholderComponent', () => {
  let component: SharedCompanyShareholderComponent;
  let fixture: ComponentFixture<SharedCompanyShareholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCompanyShareholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCompanyShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
