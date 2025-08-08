import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCompaniesComponent } from './base-companies-component';

describe('BaseCompaniesComponent', () => {
  let component: BaseCompaniesComponent;
  let fixture: ComponentFixture<BaseCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
