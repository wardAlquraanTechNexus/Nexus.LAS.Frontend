import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialogFormComponent } from './base-dialog-form-component';

describe('BaseDialogFormComponent', () => {
  let component: BaseDialogFormComponent;
  let fixture: ComponentFixture<BaseDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
