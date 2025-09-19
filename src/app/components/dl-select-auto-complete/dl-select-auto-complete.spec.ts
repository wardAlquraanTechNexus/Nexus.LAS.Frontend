import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlSelectAutoComplete } from './dl-select-auto-complete';

describe('DlSelectAutoComplete', () => {
  let component: DlSelectAutoComplete;
  let fixture: ComponentFixture<DlSelectAutoComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlSelectAutoComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlSelectAutoComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
