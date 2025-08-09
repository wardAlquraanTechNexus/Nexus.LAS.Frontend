import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTreeComponent } from './shared-tree-component';

describe('SharedTreeComponent', () => {
  let component: SharedTreeComponent;
  let fixture: ComponentFixture<SharedTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
