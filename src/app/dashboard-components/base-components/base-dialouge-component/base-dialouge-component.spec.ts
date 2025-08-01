import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialougeComponent } from './base-dialouge-component';

describe('BaseDialougeComponent', () => {
  let component: BaseDialougeComponent;
  let fixture: ComponentFixture<BaseDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialougeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
