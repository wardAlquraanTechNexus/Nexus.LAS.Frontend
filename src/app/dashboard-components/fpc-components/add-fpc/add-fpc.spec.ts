import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFpc } from './add-fpc';

describe('AddFpc', () => {
  let component: AddFpc;
  let fixture: ComponentFixture<AddFpc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFpc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFpc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
