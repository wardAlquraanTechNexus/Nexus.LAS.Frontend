import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePropertiesComponent } from './base-properties-component';

describe('BasePropertiesComponent', () => {
  let component: BasePropertiesComponent;
  let fixture: ComponentFixture<BasePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
