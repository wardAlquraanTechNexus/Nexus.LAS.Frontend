import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListForm } from './dynamic-list-form';

describe('DynamicListForm', () => {
  let component: DynamicListForm;
  let fixture: ComponentFixture<DynamicListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicListForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicListForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
