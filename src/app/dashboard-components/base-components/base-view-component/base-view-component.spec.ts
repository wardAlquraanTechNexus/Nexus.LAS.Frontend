import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseViewComponent } from './base-view-component';

describe('BaseViewComponent', () => {
  let component: BaseViewComponent;
  let fixture: ComponentFixture<BaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
