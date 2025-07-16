import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTracking } from './add-document-tracking';

describe('AddDocumentTracking', () => {
  let component: AddDocumentTracking;
  let fixture: ComponentFixture<AddDocumentTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocumentTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDocumentTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
