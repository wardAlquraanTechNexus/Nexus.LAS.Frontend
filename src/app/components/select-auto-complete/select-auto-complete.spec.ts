import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutoComplete } from './select-auto-complete';

describe('SelectAutoComplete', () => {
  let component: SelectAutoComplete;
  let fixture: ComponentFixture<SelectAutoComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAutoComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAutoComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
